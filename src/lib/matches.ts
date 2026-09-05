import type { FollowState } from "@/lib/follow";
import type { LeagueGroup, Match } from "@/lib/types";

export function isFinished(match: Match): boolean {
  return match.status === "ft" || match.status === "pp" || match.status === "ab";
}

export function groupIsFinished(group: LeagueGroup): boolean {
  return group.matches.length > 0 && group.matches.every(isFinished);
}

export function isInPlay(match: Match): boolean {
  return match.status === "live" || match.status === "ht";
}

export function liveMatchCount(groups: LeagueGroup[]): number {
  return groups.reduce(
    (count, group) => count + group.matches.filter(isInPlay).length,
    0,
  );
}

function groupFollowed(group: LeagueGroup, follow: FollowState): boolean {
  return (
    follow.leagues.includes(group.id) ||
    group.matches.some((match) =>
      follow.teams.some((team) => team.id === match.home.id || team.id === match.away.id),
    )
  );
}

export function rankGroup(group: LeagueGroup, follow: FollowState): number {
  const live = group.matches.some(isInPlay);
  const followed = groupFollowed(group, follow);
  const firstClass = group.priority < 1000;
  if (live && followed) return 0;
  if (live) return 1;
  if (followed) return 2;
  if (firstClass) return 3;
  return 4;
}

export function sortGroups(groups: LeagueGroup[], follow: FollowState): LeagueGroup[] {
  return [...groups].sort(
    (a, b) => rankGroup(a, follow) - rankGroup(b, follow) || a.priority - b.priority || a.name.localeCompare(b.name),
  );
}

export function collectLiveMatches(groups: LeagueGroup[], follow: FollowState): Match[] {
  const matches = groups.flatMap((group) =>
    group.matches.filter(isInPlay).map((match) => ({ match, group })),
  );
  matches.sort((a, b) => {
    const af = groupFollowed(a.group, follow);
    const bf = groupFollowed(b.group, follow);
    if (af !== bf) return af ? -1 : 1;
    return 0;
  });
  return matches.map((item) => item.match);
}

export function filterGroupsByQuery(groups: LeagueGroup[], query: string): LeagueGroup[] {
  const search = query.trim().toLowerCase();
  if (!search) return groups;
  return groups
    .map((group) => ({
      ...group,
      matches: group.matches.filter(
        (match) =>
          match.home.name.toLowerCase().includes(search) ||
          match.away.name.toLowerCase().includes(search) ||
          group.name.toLowerCase().includes(search),
      ),
    }))
    .filter((group) => group.matches.length > 0);
}

export function matchesForFollow(groups: LeagueGroup[], follow: FollowState): LeagueGroup[] {
  if (!follow.leagues.length && !follow.teams.length) return [];
  return groups
    .map((group) => {
      const leagueFollowed = follow.leagues.includes(group.id);
      return {
        ...group,
        matches: leagueFollowed
          ? group.matches
          : group.matches.filter((match) =>
              follow.teams.some((team) => team.id === match.home.id || team.id === match.away.id),
            ),
      };
    })
    .filter((group) => group.matches.length > 0);
}
