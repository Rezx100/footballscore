import { MATCHES, getMatch, getMatchDetail, matchesForDay, searchCatalog } from '../demo';
import { withLiveClock } from '../live';
import { cacheGet, cacheSet } from '../cache';
import type { DataSource, Match, MatchDetail, SearchHit } from '../types';
import { fetchEspnMatches } from './espn';

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

export async function loadDayFeed(day: string, timeZone?: string): Promise<FeedResult> {
  const cacheKey = `day:${day}`;
  const cached = await cacheGet<FeedResult>(cacheKey);

  try {
    const espn = await fetchEspnMatches(day);
    if (espn.length > 0) {
      const result: FeedResult = { matches: applyClock(espn), source: 'espn' };
      await cacheSet(cacheKey, result, LIVE_TTL);
      return result;
    }
  } catch {
    // ESPN is optional; demo keeps every screen alive.
  }

  if (cached) return { ...cached, matches: applyClock(cached.matches), stale: true };

  const demo = applyClock(matchesForDay(day, timeZone));
  const fallback = demo.length > 0 ? demo : applyClock(MATCHES);
  const result: FeedResult = { matches: fallback, source: 'demo' };
  await cacheSet(cacheKey, result, DAY_TTL);
  return result;
}

export async function loadMatchDetail(id: string): Promise<MatchDetail | null> {
  const demo = getMatchDetail(id);
  if (demo) return { ...demo, match: withLiveClock(demo.match) };
  const row = getMatch(id);
  return row ? { match: withLiveClock(row), events: [], commentary: [], homeLineup: { team: row.home, formation: '', players: [] }, awayLineup: { team: row.away, formation: '', players: [] }, stats: [], table: [], h2h: { summary: '', events: [] }, ratings: [] } : null;
}

export function searchAll(query: string): SearchHit[] {
  return searchCatalog(query);
}

export async function footballProxyUrl(): Promise<string | null> {
  const base = process.env.EXPO_PUBLIC_SUPABASE_URL;
  if (!base) return null;
  return `${base.replace(/\/$/, '')}/functions/v1/football-proxy`;
}
