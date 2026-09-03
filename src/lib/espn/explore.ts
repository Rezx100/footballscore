import { fetchTeam, fetchTeams, mapPool } from "@/lib/espn/client";
import { FIRST_CLASS_LEAGUES } from "@/lib/espn/leagues";
import { mapClub, mapTeamsList } from "@/lib/espn/map-team";
import type { FollowedTeam } from "@/lib/follow";
import type { Club } from "@/lib/types";

export async function getFirstClassClubs(): Promise<Club[]> {
  const results = await mapPool(FIRST_CLASS_LEAGUES, 4, async (league) =>
    mapTeamsList(await fetchTeams(league.slug), league.slug),
  );
  return results.flat();
}

export async function getFollowedClubs(teams: FollowedTeam[]): Promise<Club[]> {
  const unique = teams.filter(
    (team, index, all) => all.findIndex((item) => item.league === team.league && item.id === team.id) === index,
  );
  const results = await mapPool(unique.slice(0, 24), 4, async (team) => {
    const raw = await fetchTeam(team.league, team.id);
    return mapClub(raw, team.league);
  });
  return results.filter((club): club is Club => Boolean(club));
}
