import { espnDate } from '../dates';
import type {
  DualStat,
  LineupPlayer,
  Match,
  MatchDetail,
  MatchStatus,
  StandingRow,
  Team,
  TimelineEvent,
  TimelineKind,
} from '../types';

const ESPN_SITE = 'https://site.api.espn.com';
const ESPN_WEB = 'https://site.web.api.espn.com';

const LEAGUES: Array<{ id: string; slug: string; name: string }> = [
  { id: 'pl', slug: 'eng.1', name: 'Premier League' },
  { id: 'ucl', slug: 'uefa.champions', name: 'Champions League' },
  { id: 'll', slug: 'esp.1', name: 'La Liga' },
  { id: 'sa', slug: 'ita.1', name: 'Serie A' },
  { id: 'bl', slug: 'ger.1', name: 'Bundesliga' },
  { id: 'l1', slug: 'fra.1', name: 'Ligue 1' },
  { id: 'mls', slug: 'usa.1', name: 'MLS' },
  { id: 'ered', slug: 'ned.1', name: 'Eredivisie' },
];

async function espnGet(path: string): Promise<unknown> {
  const urls = [`${ESPN_WEB}${path}`, `${ESPN_SITE}${path}`];
  let last: unknown;
  for (const url of urls) {
    try {
      const response = await fetch(url, {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(5000),
      });
      if (!response.ok) throw new Error(`ESPN ${response.status}`);
      return await response.json();
    } catch (error) {
      last = error;
    }
  }
  throw last instanceof Error ? last : new Error('ESPN fetch failed');
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function asString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function mapStatus(event: Record<string, unknown>): { status: MatchStatus; minute?: number } {
  const status = isRecord(event.status) ? event.status : {};
  const type = isRecord(status.type) ? status.type : {};
  const name = (asString(type.name) ?? '').toUpperCase();
  const state = (asString(type.state) ?? '').toLowerCase();
  const clock = asString(status.displayClock);
  const minute = clock ? Number.parseInt(clock.replace(/\D/g, ''), 10) : undefined;

  if (name.includes('POSTPONE') || name.includes('CANCEL')) return { status: 'pp' };
  if (name.includes('ABANDON')) return { status: 'ab' };
  if (name.includes('HALFTIME')) return { status: 'ht' };
  if (state === 'in' || name.includes('IN_PROGRESS')) {
    return { status: 'live', minute: Number.isFinite(minute) ? minute : undefined };
  }
  if (state === 'post' || name.includes('FINAL') || type.completed === true) return { status: 'ft' };
  return { status: 'ns' };
}

function mapTeam(raw: Record<string, unknown>): Team {
  const nested = isRecord(raw.team) ? raw.team : raw;
  const id = asString(nested.id) ?? '0';
  const name = asString(nested.displayName) ?? asString(nested.name) ?? 'Team';
  const short = asString(nested.abbreviation) ?? name.slice(0, 3).toUpperCase();
  const color = `#${(asString(nested.color) ?? '6B7280').replace('#', '')}`;
  const logo = asString(nested.logo) ?? `https://a.espncdn.com/i/teamlogos/soccer/500/${id}.png`;
  return { id: `espn-${id}`, name, short, color, logo };
}

export async function fetchEspnMatches(day: string): Promise<Match[]> {
  const date = espnDate(day);
  const groups = await Promise.allSettled(
    LEAGUES.map(async (league) => {
      const json = await espnGet(`/apis/site/v2/sports/soccer/${league.slug}/scoreboard?dates=${date}`);
      if (!isRecord(json)) return [] as Match[];
      const events = asArray(json.events).filter(isRecord);
      return events.map((event) => {
        const competitions = asArray(event.competitions).filter(isRecord);
        const first = competitions[0] ?? event;
        const competitors = asArray(first.competitors).filter(isRecord);
        const homeRaw = competitors.find((c) => asString(c.homeAway) === 'home') ?? competitors[0];
        const awayRaw = competitors.find((c) => asString(c.homeAway) === 'away') ?? competitors[1];
        const home = homeRaw ? mapTeam(homeRaw) : { id: 'h', name: 'Home', short: 'HOM', color: '#6B7280' };
        const away = awayRaw ? mapTeam(awayRaw) : { id: 'a', name: 'Away', short: 'AWY', color: '#6B7280' };
        const { status, minute } = mapStatus(event);
        const homeScore = homeRaw ? Number(asString(homeRaw.score) ?? '0') : undefined;
        const awayScore = awayRaw ? Number(asString(awayRaw.score) ?? '0') : undefined;
        const kickoffIso = asString(event.date) ?? new Date().toISOString();
        return {
          id: `espn-${asString(event.id) ?? Math.random().toString(36).slice(2)}`,
          leagueId: league.id,
          leagueName: league.name,
          home,
          away,
          status,
          minute,
          homeScore: status === 'ns' ? undefined : homeScore,
          awayScore: status === 'ns' ? undefined : awayScore,
          kickoffIso,
        } satisfies Match;
      });
    }),
  );

  return groups.flatMap((result) => (result.status === 'fulfilled' ? result.value : []));
}

export function espnLeagueSlug(leagueId: string): string | undefined {
  return LEAGUES.find((l) => l.id === leagueId)?.slug;
}

function asNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const n = Number.parseFloat(value.replace('%', ''));
    return Number.isFinite(n) ? n : undefined;
  }
  return undefined;
}

function mapPlayType(play: Record<string, unknown>): TimelineKind {
  const type = isRecord(play.type) ? play.type : {};
  const text = `${asString(type.text) ?? ''} ${asString(type.id) ?? ''} ${asString(play.text) ?? ''}`.toLowerCase();
  if (play.scoringPlay === true || text.includes('goal')) return 'goal';
  if (text.includes('red card') || text.includes('red-card')) return 'red-card';
  if (text.includes('yellow')) return 'yellow-card';
  if (text.includes('substitut')) return 'substitution';
  if (text.includes('var')) return 'var';
  return 'comment';
}

function mapLineup(rosterBlock: Record<string, unknown>, team: Team): LineupPlayer[] {
  const rows = asArray(rosterBlock.roster).filter(isRecord);
  const starters = rows.filter((row) => row.starter === true);
  const source = starters.length > 0 ? starters : rows.slice(0, 11);
  return source.map((row, index) => {
    const athlete = isRecord(row.athlete) ? row.athlete : {};
    const name = asString(athlete.displayName) ?? asString(athlete.shortName) ?? 'Player';
    const shorts = name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
    const jersey = Number.parseInt(asString(row.jersey) ?? asString(athlete.jersey) ?? `${index + 1}`, 10);
    const col = index % 4;
    const rowIndex = Math.floor(index / 4);
    return {
      id: asString(athlete.id) ?? `${team.id}-${index}`,
      name,
      initials: shorts || name.slice(0, 2).toUpperCase(),
      number: Number.isFinite(jersey) ? jersey : index + 1,
      position: asString(isRecord(row.position) ? row.position.abbreviation : undefined) ?? 'Player',
      starter: row.starter === true || index < 11,
      x: Math.min(0.9, 0.12 + rowIndex * 0.22),
      y: 0.15 + col * 0.23,
    };
  });
}

function mapStats(homeBlock?: Record<string, unknown>, awayBlock?: Record<string, unknown>): DualStat[] {
  const homeStats = asArray(homeBlock?.statistics).filter(isRecord);
  const awayStats = asArray(awayBlock?.statistics).filter(isRecord);
  const labels = new Map<string, DualStat>();
  for (const row of homeStats) {
    const label = asString(row.label) ?? asString(row.name) ?? asString(row.abbreviation);
    const value = asNumber(row.displayValue) ?? asNumber(row.value);
    if (!label || value == null) continue;
    labels.set(label, { label, homeValue: value, awayValue: 0 });
  }
  for (const row of awayStats) {
    const label = asString(row.label) ?? asString(row.name) ?? asString(row.abbreviation);
    const value = asNumber(row.displayValue) ?? asNumber(row.value);
    if (!label || value == null) continue;
    const existing = labels.get(label);
    if (existing) existing.awayValue = value;
    else labels.set(label, { label, homeValue: 0, awayValue: value });
  }
  return Array.from(labels.values()).slice(0, 10);
}

export async function fetchEspnMatchDetail(match: Match): Promise<MatchDetail | null> {
  const eventId = match.id.replace(/^espn-/, '');
  const slug = espnLeagueSlug(match.leagueId) ?? 'eng.1';
  const json = await espnGet(`/apis/site/v2/sports/soccer/${slug}/summary?event=${eventId}`);
  if (!isRecord(json)) return null;

  const header = isRecord(json.header) ? json.header : {};
  const competitions = asArray(header.competitions).filter(isRecord);
  const first = competitions[0] ?? header;
  const venue = isRecord(first) && isRecord(first.venue) ? asString(first.venue.fullName) : match.venue;
  const { status, minute } = mapStatus(isRecord(json.header) ? json.header : first);
  const competitors = asArray(isRecord(first) ? first.competitors : []).filter(isRecord);
  const homeRaw = competitors.find((c) => asString(c.homeAway) === 'home') ?? competitors[0];
  const awayRaw = competitors.find((c) => asString(c.homeAway) === 'away') ?? competitors[1];
  const homeScore = homeRaw ? asNumber(homeRaw.score) : match.homeScore;
  const awayScore = awayRaw ? asNumber(awayRaw.score) : match.awayScore;

  const plays = [...asArray(json.keyEvents), ...asArray(json.plays)].filter(isRecord);
  const events: TimelineEvent[] = plays.slice(0, 40).map((play, index) => {
    const clock = isRecord(play.clock) ? asString(play.clock.displayValue) : asString(play.clock);
    const minuteValue = clock ? Number.parseInt(clock.replace(/\D/g, ''), 10) : 0;
    const type = mapPlayType(play);
    return {
      id: asString(play.id) ?? `play-${index}`,
      minute: Number.isFinite(minuteValue) ? minuteValue : 0,
      type,
      text: asString(play.text) ?? asString(play.shortText) ?? 'Event',
      side: asString(play.homeAway) === 'away' || play.awayTeam === true ? 'away' : 'home',
      key: type === 'goal' || type === 'red-card' || type === 'yellow-card' || play.scoringPlay === true,
    };
  });

  const boxscore = isRecord(json.boxscore) ? json.boxscore : {};
  const boxTeams = asArray(boxscore.teams).filter(isRecord);
  const homeBox = boxTeams.find((t) => asString(isRecord(t.team) ? t.team.id : undefined) === match.home.id.replace(/^espn-/, '')) ?? boxTeams[0];
  const awayBox = boxTeams.find((t) => asString(isRecord(t.team) ? t.team.id : undefined) === match.away.id.replace(/^espn-/, '')) ?? boxTeams[1];

  const rosters = asArray(json.rosters).filter(isRecord);
  const homeRoster = rosters.find((r) => asString(isRecord(r.team) ? r.team.id : undefined) === match.home.id.replace(/^espn-/, '')) ?? rosters[0];
  const awayRoster = rosters.find((r) => asString(isRecord(r.team) ? r.team.id : undefined) === match.away.id.replace(/^espn-/, '')) ?? rosters[1];

  const liveMatch: Match = {
    ...match,
    status: status || match.status,
    minute: minute ?? match.minute,
    homeScore: status === 'ns' ? undefined : (homeScore ?? match.homeScore),
    awayScore: status === 'ns' ? undefined : (awayScore ?? match.awayScore),
    venue: venue ?? match.venue,
  };

  return {
    match: liveMatch,
    events,
    commentary: events.slice(0, 12).map((event) => ({
      id: `c-${event.id}`,
      minute: event.minute,
      text: event.text,
      key: event.key,
    })),
    homeLineup: {
      team: match.home,
      formation: asString(homeRoster?.formation) ?? '',
      players: homeRoster ? mapLineup(homeRoster, match.home) : [],
    },
    awayLineup: {
      team: match.away,
      formation: asString(awayRoster?.formation) ?? '',
      players: awayRoster ? mapLineup(awayRoster, match.away) : [],
    },
    stats: mapStats(homeBox, awayBox),
    table: [],
    h2h: { summary: 'Head-to-head not in this feed.', events: [] },
    ratings: [],
  };
}

export async function fetchEspnStandings(leagueId: string): Promise<StandingRow[]> {
  const slug = espnLeagueSlug(leagueId);
  if (!slug) return [];
  const json = await espnGet(`/apis/v2/sports/soccer/${slug}/standings`);
  if (!isRecord(json)) return [];
  const children = asArray(json.children).filter(isRecord);
  const groups = children.length > 0 ? children : [json];
  const first = groups[0];
  const standings = isRecord(first) && isRecord(first.standings) ? first.standings : first;
  const entries = asArray(isRecord(standings) ? standings.entries : []).filter(isRecord);
  return entries.map((row, index) => {
    const team = isRecord(row.team) ? mapTeam(row.team) : { id: `row-${index}`, name: 'Club', short: 'CLB', color: '#6B7280' };
    const stats = asArray(row.stats).filter(isRecord);
    const read = (name: string) => {
      const hit = stats.find((s) => asString(s.name) === name || asString(s.abbreviation) === name);
      return asNumber(hit?.value) ?? asNumber(hit?.displayValue) ?? 0;
    };
    return {
      position: index + 1,
      team,
      played: read('gamesPlayed'),
      won: read('wins'),
      drawn: read('ties'),
      lost: read('losses'),
      gf: read('pointsFor'),
      ga: read('pointsAgainst'),
      goalDifference: read('pointDifferential') || read('pointsFor') - read('pointsAgainst'),
      points: read('points'),
      form: [],
    } satisfies StandingRow;
  });
}
