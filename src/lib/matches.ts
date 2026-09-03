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
