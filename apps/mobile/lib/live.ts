import type { Match, MatchStatus } from './types';

/** Derive live clock from kick-off so demo matches keep moving without a feed. */
export function clockFromKickoff(
  kickoffIso: string,
  now = Date.now(),
): { status: MatchStatus; minute?: number } {
  const start = new Date(kickoffIso).getTime();
  if (Number.isNaN(start)) return { status: 'ns' };
  const elapsed = Math.floor((now - start) / 60_000);
  if (elapsed < 0) return { status: 'ns' };
  if (elapsed < 45) return { status: 'live', minute: Math.max(1, elapsed) };
  if (elapsed < 48) return { status: 'live', minute: 45 };
  if (elapsed < 60) return { status: 'ht' };
  const second = elapsed - 15;
  if (second < 90) return { status: 'live', minute: second };
  if (second < 97) return { status: 'live', minute: 90 + (second - 90) };
  return { status: 'ft' };
}

export function withLiveClock(match: Match, now = Date.now()): Match {
  if (match.status === 'pp' || match.status === 'ab') return match;
  if (match.status === 'ft') return match;
  // ESPN (and API-Football) already send status + minute. Do not overwrite them
  // from kick-off — that clock is only for seeded demo fixtures.
  if (match.id.startsWith('espn-') || match.id.startsWith('apif-')) return match;
  if (match.status === 'ns') {
    const derived = clockFromKickoff(match.kickoffIso, now);
    if (derived.status === 'ns') return match;
    return { ...match, ...derived };
  }
  const derived = clockFromKickoff(match.kickoffIso, now);
  if (derived.status === 'ft') {
    return { ...match, status: 'ft', minute: undefined };
  }
  return { ...match, ...derived };
}

export function isLiveStatus(status: MatchStatus): boolean {
  return status === 'live' || status === 'ht';
}
