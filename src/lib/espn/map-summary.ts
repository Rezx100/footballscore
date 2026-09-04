import { asArray, asNumber, asString, isRecord } from "@/lib/espn/json";
import { headshotFromAthlete } from "@/lib/espn/cdn";
import { mapStandingEntries } from "@/lib/espn/map-standings";
import { mapEvent, mapTeam } from "@/lib/espn/map";
import type {
  DualStat,
  FormGame,
  FormResult,
  FormSide,
  LineupPlayer,
  LineupSide,
  Match,
  NewsItem,
  SeasonSeries,
  StandingTable,
  TimelineItem,
  TimelineKind,
  VenueInfo,
} from "@/lib/types";

const PREFERRED_STATS: { key: string; label: string; pct?: boolean }[] = [
  { key: "possessionPct", label: "Possession", pct: true },
  { key: "totalShots", label: "Shots" },
  { key: "shotsOnTarget", label: "On target" },
  { key: "accuratePasses", label: "Accurate passes" },
  { key: "passPct", label: "Pass completion", pct: true },
  { key: "wonCorners", label: "Corners" },
  { key: "foulsCommitted", label: "Fouls" },
  { key: "offsides", label: "Offsides" },
  { key: "yellowCards", label: "Yellow cards" },
  { key: "redCards", label: "Red cards" },
  { key: "saves", label: "Saves" },
  { key: "penaltyKickGoals", label: "Penalty goals" },
];

export type MatchDetail = {
  match: Match;
  competition?: string;
  round?: string;
  story?: string;
  timeline: TimelineItem[];
  lineups: LineupSide[];
  stats: DualStat[];
  tables: StandingTable[];
  series?: SeasonSeries;
  form: FormSide[];
  venue?: VenueInfo;
  news: NewsItem[];
  recap?: NewsItem;
};

function kindFromType(type: unknown, scoring?: boolean): TimelineKind {
  const raw = isRecord(type) ? asString(type.type) ?? asString(type.text) ?? "" : String(type ?? "");
  const value = raw.toLowerCase();
  if (scoring || value.includes("goal") || value.includes("penalty")) return "goal";
  if (value.includes("card") || value.includes("yellow") || value.includes("red")) return "card";
  if (value.includes("sub")) return "sub";
  return "other";
}

function mapTimelineItem(raw: Record<string, unknown>, key: boolean): TimelineItem | null {
  const play = isRecord(raw.play) ? raw.play : raw;
  const id = asString(play.id) ?? asString(raw.id);
  const text = asString(raw.text) ?? asString(play.text) ?? asString(play.shortText);
  if (!id || !text) return null;
  const clock = isRecord(play.clock)
    ? asString(play.clock.displayValue)
    : isRecord(raw.time)
      ? asString(raw.time.displayValue)
      : isRecord(raw.clock)
        ? asString(raw.clock.displayValue)
        : undefined;
  const clockValue =
    (isRecord(play.clock) ? asNumber(play.clock.value) : undefined) ??
    (isRecord(raw.time) ? asNumber(raw.time.value) : undefined) ??
    (isRecord(raw.clock) ? asNumber(raw.clock.value) : undefined);
  const team = isRecord(play.team) ? play.team : isRecord(raw.team) ? raw.team : undefined;
  const scoring = play.scoringPlay === true || raw.scoringPlay === true;
  return {
    id,
    clock,
    text,
    kind: key ? kindFromType(play.type ?? raw.type, scoring) : "comment",
    key,
    teamId: team ? asString(team.id) : undefined,
    wallclock: asString(play.wallclock) ?? asString(raw.wallclock),
    clockValue,
  };
}

function mergeTimeline(keyEvents: unknown[], commentary: unknown[]): TimelineItem[] {
  const byId = new Map<string, TimelineItem>();
  for (const item of commentary) {
    if (!isRecord(item)) continue;
    const mapped = mapTimelineItem(item, false);
    if (mapped) byId.set(mapped.id, mapped);
  }
  for (const item of keyEvents) {
    if (!isRecord(item)) continue;
    const mapped = mapTimelineItem(item, true);
    if (!mapped) continue;
    const existing = byId.get(mapped.id);
    byId.set(mapped.id, existing ? { ...existing, ...mapped, text: mapped.text || existing.text, key: true } : mapped);
  }
  return [...byId.values()].sort((a, b) => {
    const wall = (b.wallclock ?? "").localeCompare(a.wallclock ?? "");
    if (wall !== 0) return wall;
    return (b.clockValue ?? -1) - (a.clockValue ?? -1);
  });
}

function mapLineup(raw: unknown, fallbackColor: string): LineupSide | null {
  if (!isRecord(raw)) return null;
  const homeAway = asString(raw.homeAway);
  if (homeAway !== "home" && homeAway !== "away") return null;
  if (!isRecord(raw.team)) return null;
  const team = mapTeam(raw, true);
  if (!team.color || team.color === "#6B7280") team.color = fallbackColor;
  const players: LineupPlayer[] = [];
  for (const row of asArray(raw.roster)) {
    if (!isRecord(row)) continue;
    const athlete = isRecord(row.athlete) ? row.athlete : undefined;
    const id = athlete ? asString(athlete.id) : undefined;
    const name = athlete
      ? (asString(athlete.displayName) ?? asString(athlete.fullName) ?? asString(athlete.shortName))
      : undefined;
    if (!id || !name) continue;
    const position = isRecord(row.position) ? asString(row.position.abbreviation) ?? asString(row.position.displayName) : undefined;
    players.push({
      id,
      name,
      jersey: asString(row.jersey),
      position,
      starter: row.starter === true,
      formationPlace: asNumber(row.formationPlace),
      headshot: athlete ? headshotFromAthlete(athlete, id) : undefined,
    });
  }
  return {
    team,
    homeAway,
    formation: asString(raw.formation),
    players,
  };
}

function statMap(team: Record<string, unknown>): Map<string, { display: string; value?: number; label?: string }> {
  const map = new Map<string, { display: string; value?: number; label?: string }>();
  for (const stat of asArray(team.statistics)) {
    if (!isRecord(stat)) continue;
    const name = asString(stat.name);
    const display = asString(stat.displayValue);
    if (!name || display === undefined) continue;
    map.set(name, {
      display,
      value: asNumber(stat.value) ?? asNumber(stat.displayValue),
      label: asString(stat.label),
    });
  }
  return map;
}

function formatStatDisplay(display: string, pct?: boolean): string {
  if (!pct) return display;
  const num = Number(display);
  if (!Number.isFinite(num)) return display;
  if (num <= 1) return `${Math.round(num * 100)}%`;
  return display.includes("%") ? display : `${display}%`;
}

function mapStats(boxscore: unknown): DualStat[] {
  if (!isRecord(boxscore)) return [];
  const teams = asArray(boxscore.teams).filter(isRecord);
  const home = teams.find((team) => asString(team.homeAway) === "home") ?? teams[0];
  const away = teams.find((team) => asString(team.homeAway) === "away") ?? teams[1];
  if (!home || !away) return [];
  const homeStats = statMap(home);
  const awayStats = statMap(away);
  const out: DualStat[] = [];
  for (const pref of PREFERRED_STATS) {
    const h = homeStats.get(pref.key);
    const a = awayStats.get(pref.key);
    if (!h && !a) continue;
    out.push({
      key: pref.key,
      label: pref.label,
      home: h ? formatStatDisplay(h.display, pref.pct) : "–",
      away: a ? formatStatDisplay(a.display, pref.pct) : "–",
      homeValue: h?.value,
      awayValue: a?.value,
      pct: pref.pct,
    });
  }
  return out;
}

function mapMiniTables(standings: unknown): StandingTable[] {
  if (!isRecord(standings)) return [];
  const tables: StandingTable[] = [];
  for (const group of asArray(standings.groups)) {
    if (!isRecord(group)) continue;
    const header = asString(group.header) ?? "Table";
    const inner = isRecord(group.standings) ? group.standings : group;
    const entries = asArray(inner.entries);
    const table = mapStandingEntries(entries, header);
    if (table) tables.push(table);
  }
  return tables;
}

function asFormResult(value: string | undefined): FormResult | undefined {
  if (value === "W" || value === "D" || value === "L") return value;
  return undefined;
}

function mapForm(lastFive: unknown[]): FormSide[] {
  const sides: FormSide[] = [];
  for (const block of lastFive) {
    if (!isRecord(block) || !isRecord(block.team)) continue;
    const teamId = asString(block.team.id);
    const teamName = asString(block.team.displayName);
    if (!teamId || !teamName) continue;
    const games: FormGame[] = [];
    for (const event of asArray(block.events)) {
      if (!isRecord(event)) continue;
      const result = asFormResult(asString(event.gameResult));
      if (!result) continue;
      const opponent = isRecord(event.opponent) ? asString(event.opponent.displayName) : undefined;
      games.push({
        result,
        opponent,
        score: asString(event.score),
        date: asString(event.gameDate),
      });
    }
    if (games.length) sides.push({ teamId, teamName, games });
  }
  return sides;
}

function mapSeries(raw: unknown): SeasonSeries | undefined {
  const list = asArray(raw);
  const first = list.find(isRecord);
  if (!first) return undefined;
  const events: SeasonSeries["events"] = [];
  for (const event of asArray(first.events)) {
    if (!isRecord(event)) continue;
    const id = asString(event.id);
    if (!id) continue;
    const competitors = asArray(event.competitors).filter(isRecord);
    const home = competitors.find((item) => asString(item.homeAway) === "home") ?? competitors[0];
    const away = competitors.find((item) => asString(item.homeAway) === "away") ?? competitors[1];
    const homeTeam = home && isRecord(home.team) ? home.team : home;
    const awayTeam = away && isRecord(away.team) ? away.team : away;
    events.push({
      id,
      date: asString(event.date),
      summary: asString(event.summary) ?? "",
      homeName: (homeTeam && asString(homeTeam.displayName)) ?? "Home",
      awayName: (awayTeam && asString(awayTeam.displayName)) ?? "Away",
      homeScore: home ? asString(home.score) ?? String(asNumber(home.score) ?? "") : undefined,
      awayScore: away ? asString(away.score) ?? String(asNumber(away.score) ?? "") : undefined,
    });
  }
  const title = asString(first.title) ?? asString(first.seriesLabel);
  const summary = asString(first.summary) ?? asString(first.shortSummary);
  if (!title && !summary && !events.length) return undefined;
  return { title: title ?? "Series", summary: summary ?? "", events };
}

function mapVenue(gameInfo: unknown): VenueInfo | undefined {
  if (!isRecord(gameInfo)) return undefined;
  const venue = isRecord(gameInfo.venue) ? gameInfo.venue : undefined;
  const address = venue && isRecord(venue.address) ? venue.address : undefined;
  const officials = asArray(gameInfo.officials).filter(isRecord);
  const referee =
    officials.find((item) => {
      const position = isRecord(item.position) ? asString(item.position.name) ?? asString(item.position.displayName) : undefined;
      return position?.toLowerCase().includes("ref");
    }) ?? officials[0];
  const info: VenueInfo = {
    name: venue ? asString(venue.fullName) ?? asString(venue.shortName) : undefined,
    city: address ? asString(address.city) : undefined,
    country: address ? asString(address.country) : undefined,
    attendance: asNumber(gameInfo.attendance),
    referee: referee ? asString(referee.displayName) ?? asString(referee.fullName) : undefined,
  };
  if (!info.name && !info.attendance && !info.referee) return undefined;
  return info;
}

export function mapNewsArticles(raw: unknown, leagueSlug?: string): NewsItem[] {
  const root = isRecord(raw) ? raw : undefined;
  const articles = root ? asArray(root.articles) : asArray(raw);
  const items: NewsItem[] = [];
  for (const article of articles) {
    if (!isRecord(article)) continue;
    const id = asString(article.id) ?? (typeof article.id === "number" ? String(article.id) : undefined);
    const headline = asString(article.headline);
    if (!id || !headline) continue;
    const image = isRecord(asArray(article.images)[0])
      ? asString((asArray(article.images)[0] as Record<string, unknown>).url)
      : undefined;
    const teamIds = asArray(article.categories).flatMap((category) => {
      if (!isRecord(category) || asString(category.type) !== "team") return [];
      const fromTeam = isRecord(category.team) ? asString(category.team.id) : undefined;
      const idValue = asString(category.teamId) ?? (typeof category.teamId === "number" ? String(category.teamId) : undefined);
      const found = fromTeam ?? idValue;
      return found ? [found] : [];
    });
    items.push({
      id,
      headline,
      description: asString(article.description),
      byline: asString(article.byline),
      published: asString(article.published) ?? asString(article.lastModified) ?? "",
      image,
      leagueSlug,
      teamIds,
    });
  }
  return items;
}

function mapRecap(article: unknown, leagueSlug?: string): NewsItem | undefined {
  if (!isRecord(article)) return undefined;
  const id = asString(article.id) ?? (typeof article.id === "number" ? String(article.id) : undefined);
  const headline = asString(article.headline);
  if (!id || !headline) return undefined;
  const image = isRecord(asArray(article.images)[0])
    ? asString((asArray(article.images)[0] as Record<string, unknown>).url)
    : undefined;
  return {
    id,
    headline,
    description: asString(article.description),
    byline: asString(article.byline),
    published: asString(article.published) ?? "",
    image,
    leagueSlug,
    teamIds: [],
  };
}

function headerMatch(header: unknown, leagueId: string, options?: { timeZone?: string; hour12?: boolean }): Match | null {
  if (!isRecord(header)) return null;
  const competitions = asArray(header.competitions);
  const competition = competitions.find(isRecord);
  if (!competition) return null;
  const eventLike = {
    ...header,
    ...competition,
    id: asString(header.id) ?? asString(competition.id),
    date: asString(competition.date) ?? asString(header.date),
    competitors: asArray(competition.competitors),
    status: competition.status,
  };
  const leagueName = isRecord(header.league)
    ? asString(header.league.shortName) ?? asString(header.league.name)
    : undefined;
  return mapEvent(eventLike, asString(eventLike.id) ?? "0", leagueId, {
    timeZone: options?.timeZone,
    hour12: options?.hour12,
    leagueName,
  });
}

export function mapSummary(
  raw: unknown,
  leagueId: string,
  options?: { timeZone?: string; hour12?: boolean },
): MatchDetail | null {
  if (!isRecord(raw)) return null;
  const match = headerMatch(raw.header, leagueId, options);
  if (!match) return null;
  const competition = isRecord(raw.header) && isRecord(raw.header.league)
    ? asString(raw.header.league.shortName) ?? asString(raw.header.league.name)
    : undefined;
  const seasonName =
    isRecord(raw.header) && isRecord(raw.header.season) ? asString(raw.header.season.name) : undefined;
  const timeline = mergeTimeline(asArray(raw.keyEvents), asArray(raw.commentary));
  const lastKey = timeline.find((item) => item.key);
  const lineups = asArray(raw.rosters)
    .map((item) => mapLineup(item, match.home.id === "" ? "#6B7280" : "#6B7280"))
    .filter((item): item is LineupSide => Boolean(item));
  for (const side of lineups) {
    if (side.homeAway === "home") side.team = { ...side.team, color: match.home.color, logo: side.team.logo ?? match.home.logo };
    if (side.homeAway === "away") side.team = { ...side.team, color: match.away.color, logo: side.team.logo ?? match.away.logo };
  }
  return {
    match: { ...match, leagueName: match.leagueName ?? competition, round: match.round ?? seasonName },
    competition,
    round: seasonName,
    story:
      lastKey && (match.status === "live" || match.status === "ht" || match.status === "ft")
        ? lastKey.text
        : undefined,
    timeline,
    lineups,
    stats: mapStats(raw.boxscore),
    tables: mapMiniTables(raw.standings),
    series: mapSeries(raw.seasonseries),
    form: mapForm(asArray(raw.lastFiveGames)),
    venue: mapVenue(raw.gameInfo),
    news: mapNewsArticles(raw.news, leagueId),
    recap: mapRecap(raw.article, leagueId),
  };
}

export function storyLine(timeline: TimelineItem[]): string | undefined {
  const last = timeline.find((item) => item.key);
  if (!last) return undefined;
  return last.clock ? `${last.text}` : last.text;
}
