import { asArray, asNumber, asString, isRecord } from "@/lib/espn/json";
import { mapEvent } from "@/lib/espn/map";
import type { Club, InjuryRow, Match, SquadPlayer, Team } from "@/lib/types";

function hexColor(value: string | undefined): string {
  if (!value) return "#6B7280";
  const hex = value.replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(hex)) return "#6B7280";
  return `#${hex}`;
}

function logoFrom(team: Record<string, unknown>, id: string): string | undefined {
  if (asString(team.logo)) return asString(team.logo);
  const logo = asArray(team.logos).find((item) => {
    if (!isRecord(item)) return false;
    return !asArray(item.rel).map(asString).includes("dark");
  });
  const chosen = isRecord(logo) ? logo : asArray(team.logos).find(isRecord);
  if (isRecord(chosen) && asString(chosen.href)) return asString(chosen.href);
  return `https://a.espncdn.com/i/teamlogos/soccer/500/${id}.png`;
}

export function mapClub(raw: unknown, leagueId: string): Club | null {
  const team = isRecord(raw) && isRecord(raw.team) ? raw.team : isRecord(raw) ? raw : undefined;
  if (!team) return null;
  const id = asString(team.id);
  const name = asString(team.displayName) ?? asString(team.name);
  if (!id || !name) return null;
  return {
    id,
    leagueId,
    name,
    short: asString(team.abbreviation) ?? asString(team.shortDisplayName) ?? name.slice(0, 3).toUpperCase(),
    color: hexColor(asString(team.color)),
    logo: logoFrom(team, id),
  };
}

export function mapTeamsList(raw: unknown, leagueId: string): Club[] {
  if (!isRecord(raw)) return [];
  const sports = asArray(raw.sports).filter(isRecord);
  const leagues = sports.flatMap((sport) => asArray(sport.leagues).filter(isRecord));
  const teams = leagues.flatMap((league) => asArray(league.teams));
  return teams.map((item) => mapClub(item, leagueId)).filter((item): item is Club => Boolean(item));
}

export type TeamProfile = {
  club: Club;
  standingSummary?: string;
  record?: string;
  next?: Match | null;
};

export function mapTeamProfile(raw: unknown, leagueId: string, options?: { timeZone?: string; hour12?: boolean }): TeamProfile | null {
  if (!isRecord(raw) || !isRecord(raw.team)) return null;
  const club = mapClub(raw.team, leagueId);
  if (!club) return null;
  const record = isRecord(raw.team.record) ? asArray(raw.team.record.items).find(isRecord) : undefined;
  const nextRaw = asArray(raw.team.nextEvent)[0];
  const nextLeague = isRecord(nextRaw) && isRecord(nextRaw.league) ? asString(nextRaw.league.slug) : leagueId;
  return {
    club,
    standingSummary: asString(raw.team.standingSummary),
    record: record ? asString(record.summary) : undefined,
    next: nextRaw ? mapEvent(nextRaw, asString(isRecord(nextRaw) ? nextRaw.id : undefined) ?? "0", nextLeague ?? leagueId, options) : null,
  };
}

function positionGroup(name: string | undefined, abbr: string | undefined): string {
  const hay = `${name ?? ""} ${abbr ?? ""}`.toLowerCase();
  if (hay.includes("goal")) return "Goalkeepers";
  if (hay.includes("defen") || /\b(cb|lb|rb|wb|cd)\b/.test(hay)) return "Defenders";
  if (hay.includes("mid") || /\b(cm|dm|am|wm|lm|rm)\b/.test(hay)) return "Midfielders";
  if (hay.includes("forw") || hay.includes("attack") || hay.includes("wing") || /\b(st|cf|lw|rw|ss)\b/.test(hay)) {
    return "Forwards";
  }
  return "Squad";
}

export function mapRoster(raw: unknown): { players: SquadPlayer[]; coach?: string } {
  if (!isRecord(raw)) return { players: [] };
  const players: SquadPlayer[] = [];
  for (const athlete of asArray(raw.athletes)) {
    if (!isRecord(athlete)) continue;
    if (Array.isArray(athlete.items)) continue;
    const id = asString(athlete.id);
    const name = asString(athlete.displayName) ?? asString(athlete.fullName);
    if (!id || !name) continue;
    const position = isRecord(athlete.position) ? athlete.position : undefined;
    const posName = position ? asString(position.displayName) ?? asString(position.name) : undefined;
    const abbr = position ? asString(position.abbreviation) : undefined;
    players.push({
      id,
      name,
      jersey: asString(athlete.jersey),
      position: posName ?? abbr ?? "Player",
      positionGroup: positionGroup(posName, abbr),
      age: asNumber(athlete.age),
    });
  }
  const coach = asArray(raw.coach).find(isRecord);
  const coachName = coach
    ? [asString(coach.firstName), asString(coach.lastName)].filter(Boolean).join(" ") || asString(coach.displayName)
    : undefined;
  return { players, coach: coachName };
}

export function mapSchedule(raw: unknown, leagueId: string, options?: { timeZone?: string; hour12?: boolean }): Match[] {
  if (!isRecord(raw)) return [];
  const matches: Match[] = [];
  for (const event of asArray(raw.events)) {
    const league = isRecord(event) && isRecord(event.league) ? asString(event.league.slug) : leagueId;
    const match = mapEvent(event, isRecord(event) ? asString(event.id) ?? "0" : "0", league ?? leagueId, options);
    if (match) matches.push(match);
  }
  return matches;
}

export function mapInjuries(raw: unknown): InjuryRow[] {
  if (!isRecord(raw) && !Array.isArray(raw)) return [];
  const items = isRecord(raw) ? asArray(raw.injuries).concat(asArray(raw.athletes)).concat(asArray(raw.items)) : asArray(raw);
  const rows: InjuryRow[] = [];
  for (const item of items) {
    if (!isRecord(item)) continue;
    const athlete = isRecord(item.athlete) ? item.athlete : item;
    const id = asString(athlete.id) ?? asString(item.id);
    const name = asString(athlete.displayName) ?? asString(athlete.fullName);
    if (!id || !name) continue;
    const status = isRecord(item.status) ? asString(item.status.type) ?? asString(item.status.name) : asString(item.status);
    rows.push({
      id,
      name,
      status,
      detail: asString(item.longComment) ?? asString(item.shortComment) ?? asString(item.comment) ?? asString(item.details),
    });
  }
  return rows;
}

export function asTeam(club: Club): Team {
  return { id: club.id, name: club.name, short: club.short, color: club.color, logo: club.logo };
}
