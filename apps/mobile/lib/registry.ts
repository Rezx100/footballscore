import type { Match, SearchHit, Team } from './types';
import { getMatch, getTeam } from './demo';

const matches = new Map<string, Match>();
const teams = new Map<string, Team>();

export function rememberMatches(rows: Match[]) {
  for (const match of rows) {
    matches.set(match.id, match);
    teams.set(match.home.id, match.home);
    teams.set(match.away.id, match.away);
  }
}

export function lookupMatch(id: string): Match | undefined {
  return matches.get(id) ?? getMatch(id);
}

export function lookupTeam(id: string): Team | undefined {
  return teams.get(id) ?? getTeam(id);
}

export function listMatches(): Match[] {
  return Array.from(matches.values());
}

export function searchRegistry(query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const hits: SearchHit[] = [];
  const seen = new Set<string>();
  for (const team of teams.values()) {
    if (seen.has(`team:${team.id}`)) continue;
    if (team.name.toLowerCase().includes(q) || team.short.toLowerCase().includes(q)) {
      seen.add(`team:${team.id}`);
      hits.push({
        id: team.id,
        kind: 'team',
        title: team.name,
        subtitle: team.country ?? 'Club',
        color: team.color,
        short: team.short,
      });
    }
  }
  for (const match of matches.values()) {
    const hay = `${match.home.name} ${match.away.name} ${match.home.short} ${match.away.short}`.toLowerCase();
    if (hay.includes(q)) {
      hits.push({
        id: match.id,
        kind: 'match',
        title: `${match.home.short} vs ${match.away.short}`,
        subtitle: match.leagueName ?? '',
      });
    }
  }
  return hits.slice(0, 24);
}
