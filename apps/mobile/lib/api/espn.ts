import { espnDate } from '../dates';
import type { Match, MatchStatus, Team } from '../types';

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
