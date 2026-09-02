import type { LeagueGroup, Match } from "@/lib/types";

export function isFinished(match: Match): boolean {
  return match.status === "ft" || match.status === "pp" || match.status === "ab";
}

export function groupIsFinished(group: LeagueGroup): boolean {
  return group.matches.length > 0 && group.matches.every(isFinished);
}
