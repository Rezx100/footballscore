import { MATCHES, MATCH_DETAILS, getMatch, getMatchDetail, matchesForDay, searchCatalog } from '../demo';
import { withLiveClock } from '../live';
import { cacheGet, cacheSet } from '../cache';
import { rememberMatches, lookupMatch, searchRegistry } from '../registry';
import type { DataSource, Match, MatchDetail, SearchHit } from '../types';
import { fetchEspnMatchDetail, fetchEspnMatches, fetchEspnStandings } from './espn';

const LIVE_TTL = 8_000;
const DAY_TTL = 45_000;

export type FeedResult = {
  matches: Match[];
  source: DataSource;
  stale?: boolean;
};

function applyClock(matches: Match[]): Match[] {
  return matches.map((m) => withLiveClock(m));
}

function uniqueById(rows: Match[]): Match[] {
  const seen = new Set<string>();
  const out: Match[] = [];
  for (const row of rows) {
    if (seen.has(row.id)) continue;
    seen.add(row.id);
    out.push(row);
  }
  return out;
}

function sameFixture(a: Match, b: Match): boolean {
  return a.home.short === b.home.short && a.away.short === b.away.short;
}

/** Keep seeded demo showcases (full match centre) beside the live ESPN board. */
function mergeShowcase(espn: Match[], day: string, timeZone?: string): Match[] {
  const demoDay = matchesForDay(day, timeZone);
  const featured = Object.values(MATCH_DETAILS).map((row) => row.match);
  const extras = uniqueById([...featured, ...demoDay]).filter(
    (demo) => !espn.some((live) => sameFixture(demo, live)),
  );
  return uniqueById([...extras, ...espn]);
}

export async function loadDayFeed(day: string, timeZone?: string): Promise<FeedResult> {
  const cacheKey = `day:${day}`;
  const cached = await cacheGet<FeedResult>(cacheKey);

  try {
    const espn = await fetchEspnMatches(day);
    if (espn.length > 0) {
      const result: FeedResult = { matches: applyClock(mergeShowcase(espn, day, timeZone)), source: 'espn' };
      rememberMatches(result.matches);
      await cacheSet(cacheKey, result, LIVE_TTL);
      return result;
    }
  } catch {
    // ESPN is optional; demo keeps every screen alive.
  }

  if (cached) {
    rememberMatches(cached.matches);
    return { ...cached, matches: applyClock(cached.matches), stale: true };
  }

  const demo = applyClock(matchesForDay(day, timeZone));
  const fallback = demo.length > 0 ? demo : applyClock(MATCHES);
  const result: FeedResult = { matches: fallback, source: 'demo' };
  rememberMatches(result.matches);
  await cacheSet(cacheKey, result, DAY_TTL);
  return result;
}

function skeletonDetail(row: Match): MatchDetail {
  return {
    match: withLiveClock(row),
    events: [],
    commentary: [{ id: 'empty', text: 'No play-by-play yet.' }],
    homeLineup: { team: row.home, formation: '', players: [] },
    awayLineup: { team: row.away, formation: '', players: [] },
    stats: [],
    table: [],
    h2h: { summary: 'No head-to-head on file.', events: [] },
    ratings: [],
  };
}

export async function loadMatchDetail(id: string): Promise<MatchDetail | null> {
  const demo = getMatchDetail(id);
  if (demo && !id.startsWith('espn-')) {
    return { ...demo, match: withLiveClock(demo.match) };
  }
  const row = lookupMatch(id) ?? getMatch(id);
  if (!row) return null;
  if (id.startsWith('espn-')) {
    try {
      const live = await fetchEspnMatchDetail(row);
      if (live) return live;
    } catch {
      // fall through to the skeleton so the header still renders
    }
  }
  return skeletonDetail(row);
}

export async function loadStandings(leagueId: string) {
  try {
    const rows = await fetchEspnStandings(leagueId);
    if (rows.length > 0) return rows;
  } catch {
    // demo table remains the fallback in the screen
  }
  return null;
}

export function searchAll(query: string): SearchHit[] {
  const local = searchCatalog(query);
  const live = searchRegistry(query);
  const seen = new Set(local.map((h) => `${h.kind}:${h.id}`));
  const merged = [...local];
  for (const hit of live) {
    const key = `${hit.kind}:${hit.id}`;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(hit);
  }
  return merged.slice(0, 24);
}

export async function footballProxyUrl(): Promise<string | null> {
  const base = process.env.EXPO_PUBLIC_SUPABASE_URL;
  if (!base) return null;
  return `${base.replace(/\/$/, '')}/functions/v1/football-proxy`;
}
