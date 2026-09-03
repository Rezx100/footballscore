import { fetchTeams } from "@/lib/espn/client";
import { FIRST_CLASS_LEAGUES } from "@/lib/espn/leagues";
import { mapTeamsList } from "@/lib/espn/map-team";
import type { Club } from "@/lib/types";

export async function getFirstClassClubs(): Promise<Club[]> {
  const results = await Promise.allSettled(
    FIRST_CLASS_LEAGUES.map(async (league) => mapTeamsList(await fetchTeams(league.slug), league.slug)),
  );
  const clubs: Club[] = [];
  for (const result of results) {
    if (result.status === "fulfilled") clubs.push(...result.value);
  }
  return clubs;
}
