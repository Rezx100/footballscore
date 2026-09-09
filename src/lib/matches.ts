import type { Match } from "@/lib/types";

export function isInPlay(match: Match): boolean {
  return match.status === "live" || match.status === "ht";
}
