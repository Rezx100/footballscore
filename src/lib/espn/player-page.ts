import { fetchAthlete, fetchRoster, fetchTeam } from "@/lib/espn/client";
import { asNumber, asString, isRecord } from "@/lib/espn/json";
import { headshotFromAthlete } from "@/lib/espn/cdn";
import { mapClub, mapRoster } from "@/lib/espn/map-team";
import type { Club, SquadPlayer } from "@/lib/types";

export type PlayerPage = {
  id: string;
  name: string;
  jersey?: string;
  position?: string;
  age?: number;
  team?: Club;
  height?: string;
  citizenship?: string;
  headshot?: string;
};

function fromSquad(player: SquadPlayer, team?: Club): PlayerPage {
  return {
    id: player.id,
    name: player.name,
    jersey: player.jersey,
    position: player.position,
    age: player.age,
    team,
    headshot: player.headshot,
  };
}

function fromCore(raw: unknown, fallback: PlayerPage): PlayerPage | null {
  if (!isRecord(raw)) return fallback.name ? fallback : null;
  const name = asString(raw.displayName) ?? asString(raw.fullName) ?? fallback.name;
  if (!name) return null;
  const position = isRecord(raw.position)
    ? asString(raw.position.displayName) ?? asString(raw.position.name)
    : fallback.position;
  return {
    id: asString(raw.id) ?? fallback.id,
    name,
    jersey: asString(raw.jersey) ?? fallback.jersey,
    position,
    age: asNumber(raw.age) ?? fallback.age,
    team: fallback.team,
    height: asString(raw.displayHeight) ?? asString(raw.height),
    citizenship: asString(raw.citizenship) ?? (isRecord(raw.citizenshipCountry) ? asString(raw.citizenshipCountry.name) : undefined),
    headshot: headshotFromAthlete(raw) ?? fallback.headshot,
  };
}

export async function getPlayerPage(
  id: string,
  league?: string,
  teamId?: string,
): Promise<PlayerPage | null> {
  let fromRoster: PlayerPage | null = null;
  if (league && teamId) {
    const [rosterRaw, teamRaw] = await Promise.all([fetchRoster(league, teamId), fetchTeam(league, teamId)]);
    const roster = mapRoster(rosterRaw);
    const club = teamRaw && isRecord(teamRaw) && isRecord(teamRaw.team) ? mapClub(teamRaw.team, league) : undefined;
    const player = roster.players.find((item) => item.id === id);
    if (player) fromRoster = fromSquad(player, club ?? undefined);
  }
  const core = await fetchAthlete(id);
  const mapped = fromCore(core, fromRoster ?? { id, name: "" });
  if (!mapped || !mapped.name) return fromRoster;
  if (!mapped.position && !mapped.jersey && !mapped.team && !fromRoster) return null;
  return mapped;
}
