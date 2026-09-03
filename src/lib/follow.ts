export type FollowedTeam = { league: string; id: string };

export type FollowState = {
  leagues: string[];
  teams: FollowedTeam[];
  order: string[];
};

export const FOLLOW_COOKIE = "fs_follow";
export const FOLLOW_STORAGE_KEY = "footballscore.follow";

export const EMPTY_FOLLOW: FollowState = { leagues: [], teams: [], order: [] };

function teamKey(team: FollowedTeam): string {
  return `${team.league}/${team.id}`;
}

export function parseFollowCookie(raw: string | undefined): FollowState {
  if (!raw) return { ...EMPTY_FOLLOW };
  try {
    const decoded = decodeURIComponent(raw);
    if (decoded.startsWith("{")) {
      const parsed = JSON.parse(decoded) as Partial<FollowState>;
      return normalizeFollow(parsed);
    }
    const leagues: string[] = [];
    const teams: FollowedTeam[] = [];
    const order: string[] = [];
    for (const part of decoded.split("|")) {
      if (part.startsWith("l:")) {
        for (const slug of part.slice(2).split(",")) {
          if (slug) {
            leagues.push(slug);
            order.push(`l:${slug}`);
          }
        }
      }
      if (part.startsWith("t:")) {
        for (const token of part.slice(2).split(",")) {
          const [league, id] = token.split("/");
          if (league && id) {
            teams.push({ league, id });
            order.push(`t:${league}/${id}`);
          }
        }
      }
    }
    return normalizeFollow({ leagues, teams, order });
  } catch {
    return { ...EMPTY_FOLLOW };
  }
}

export function serializeFollow(state: FollowState): string {
  const leagues = state.leagues.join(",");
  const teams = state.teams.map(teamKey).join(",");
  return encodeURIComponent(`l:${leagues}|t:${teams}`);
}

export function normalizeFollow(input: Partial<FollowState> | null | undefined): FollowState {
  const leagues = [...new Set((input?.leagues ?? []).filter(Boolean))];
  const teams: FollowedTeam[] = [];
  const seen = new Set<string>();
  for (const team of input?.teams ?? []) {
    if (!team?.league || !team?.id) continue;
    const key = teamKey(team);
    if (seen.has(key)) continue;
    seen.add(key);
    teams.push({ league: team.league, id: String(team.id) });
  }
  const order = input?.order?.length
    ? input.order
    : [...leagues.map((slug) => `l:${slug}`), ...teams.map((team) => `t:${teamKey(team)}`)];
  return { leagues, teams, order };
}

export function isLeagueFollowed(state: FollowState, slug: string): boolean {
  return state.leagues.includes(slug);
}

export function isTeamFollowed(state: FollowState, league: string, id: string): boolean {
  return state.teams.some((team) => team.league === league && team.id === id);
}
