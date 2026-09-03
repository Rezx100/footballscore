import { calendarDayOf, formatKickoff } from "@/lib/dates";
import { asArray, asNumber, asString, isRecord } from "@/lib/espn/json";
import {
  displayNameForSlug,
  logoForSlug,
  priorityForSlug,
  regionForSlug,
} from "@/lib/espn/leagues";
import type { LeagueGroup, Match, MatchStatus, Team } from "@/lib/types";

function teamLogo(id: string | undefined, explicit?: string): string | undefined {
  if (explicit) return explicit;
  if (!id) return undefined;
  return `https://a.espncdn.com/i/teamlogos/soccer/500/${id}.png`;
}

function hexColor(value: string | undefined): string {
  if (!value) return "#6B7280";
  const hex = value.replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(hex)) return "#6B7280";
  return `#${hex}`;
}

function mapTeam(raw: Record<string, unknown>, nested: boolean): Team {
  const team = nested && isRecord(raw.team) ? raw.team : raw;
  const id = asString(team.id) ?? asString(raw.id) ?? "0";
  const display = asString(team.displayName) ?? asString(team.name) ?? "Team";
  const short =
    asString(team.abbreviation) ?? asString(team.name) ?? display.slice(0, 3).toUpperCase();
  return {
    id,
    name: asString(team.name) ?? display,
    short,
    color: hexColor(asString(team.color)),
    logo: teamLogo(id, asString(team.logo) ?? asString(raw.logo)),
  };
}

function competitorsOf(event: Record<string, unknown>): Record<string, unknown>[] {
  const direct = asArray(event.competitors).filter(isRecord);
  if (direct.length >= 2) return direct;
  const competitions = asArray(event.competitions);
  const first = competitions.find(isRecord);
  if (!first) return [];
  return asArray(first.competitors).filter(isRecord);
}

function homeAway(list: Record<string, unknown>[]): { home?: Record<string, unknown>; away?: Record<string, unknown> } {
  const home = list.find((item) => asString(item.homeAway) === "home");
  const away = list.find((item) => asString(item.homeAway) === "away");
  if (home && away) return { home, away };
  return { home: list[0], away: list[1] };
}

function typeName(event: Record<string, unknown>): { name?: string; state?: string; completed?: boolean } {
  const status = event.status;
  if (isRecord(status) && isRecord(status.type)) {
    return {
      name: asString(status.type.name),
      state: asString(status.type.state),
      completed: status.type.completed === true,
    };
  }
  if (isRecord(event.fullStatus) && isRecord(event.fullStatus.type)) {
    const type = event.fullStatus.type;
    return {
      name: asString(type.name),
      state: asString(type.state) ?? asString(event.status),
      completed: type.completed === true,
    };
  }
  return { state: asString(event.status) };
}

function clockOf(event: Record<string, unknown>): string | undefined {
  const clock = asString(event.clock);
  if (clock && clock !== "0'") return clock;
  if (isRecord(event.status)) {
    const display = asString(event.status.displayClock);
    if (display && display !== "0'") return display;
  }
  if (isRecord(event.fullStatus)) {
    const display = asString(event.fullStatus.displayClock);
    if (display && display !== "0'") return display;
  }
  return clock;
}

function mapStatus(event: Record<string, unknown>): { status: MatchStatus; minute?: string } {
  const type = typeName(event);
  const name = (type.name ?? "").toUpperCase();
  const state = (type.state ?? "").toLowerCase();
  const clock = clockOf(event);

  if (name.includes("POSTPONE") || name.includes("CANCEL")) return { status: "pp" };
  if (name.includes("ABANDON")) return { status: "ab" };
  if (name.includes("HALFTIME") || asString(event.summary) === "HT") return { status: "ht" };
  if (state === "in" || name.includes("IN_PROGRESS") || name.includes("FIRST_HALF") || name.includes("SECOND_HALF")) {
    return { status: "live", minute: clock && !clock.endsWith("'") ? `${clock}'` : clock };
  }
  if (state === "pre" || name.includes("SCHEDULE")) return { status: "ns" };
  if (state === "post" || type.completed || name.includes("FULL_TIME") || name.includes("FINAL")) {
    return { status: "ft" };
  }
  if (state === "in") return { status: "live", minute: clock };
  return { status: "ns" };
}

function hasTv(event: Record<string, unknown>): boolean {
  if (event.onWatch === true) return true;
  const competitions = asArray(event.competitions).filter(isRecord);
  return competitions.some(
    (competition) => asArray(competition.broadcasts).length > 0 || asArray(competition.geoBroadcasts).length > 0,
  );
}

function scoreOf(competitor: Record<string, unknown> | undefined): number | undefined {
  if (!competitor) return undefined;
  return asNumber(competitor.score);
}

function broadcastOf(event: Record<string, unknown>): string | undefined {
  const names: string[] = [];
  for (const item of asArray(event.broadcasts)) {
    if (typeof item === "string") names.push(item);
    else if (isRecord(item)) {
      const name = asString(item.name) ?? asString(item.shortName) ?? asString(item.type);
      if (name) names.push(name);
    }
  }
  if (names.length) return names[0];
  const competitions = asArray(event.competitions).filter(isRecord);
  for (const competition of competitions) {
    for (const item of asArray(competition.broadcasts)) {
      if (!isRecord(item)) continue;
      const name = asString(item.shortName) ?? asString(item.name);
      if (name) return name;
    }
  }
  return undefined;
}

function roundOf(event: Record<string, unknown>): string | undefined {
  if (isRecord(event.season) && asString(event.season.name)) {
    const name = asString(event.season.name);
    if (name && !/^\d/.test(name)) return name;
  }
  const notes = asArray(event.notes);
  for (const note of notes) {
    if (isRecord(note) && asString(note.headline)) return asString(note.headline);
    if (typeof note === "string") return note;
  }
  const competitions = asArray(event.competitions).filter(isRecord);
  for (const competition of competitions) {
    for (const note of asArray(competition.notes)) {
      if (isRecord(note) && asString(note.headline)) return asString(note.headline);
    }
    if (isRecord(competition.group) && asString(competition.group.name)) {
      return asString(competition.group.name);
    }
  }
  return asString(event.group);
}

export function mapEvent(
  event: unknown,
  fallbackId: string,
  leagueId: string,
  options?: { timeZone?: string; hour12?: boolean; leagueName?: string },
): Match | null {
  if (!isRecord(event)) return null;
  const id = asString(event.id) ?? fallbackId;
  const iso = asString(event.date);
  if (!iso) return null;
  const sides = homeAway(competitorsOf(event));
  if (!sides.home || !sides.away) return null;
  const nested = isRecord(sides.home.team);
  const home = mapTeam(sides.home, nested);
  const away = mapTeam(sides.away, nested);
  const { status, minute } = mapStatus(event);
  const homeScore = scoreOf(sides.home);
  const awayScore = scoreOf(sides.away);
  const timeZone = options?.timeZone ?? "UTC";
  const hour12 = options?.hour12 ?? false;
  const eventLeague = isRecord(event.league) ? asString(event.league.slug) : undefined;
  return {
    id,
    leagueId: eventLeague ?? leagueId,
    leagueName: options?.leagueName,
    home,
    away,
    status,
    minute,
    homeScore: status === "ns" || status === "pp" || status === "ab" ? undefined : homeScore,
    awayScore: status === "ns" || status === "pp" || status === "ab" ? undefined : awayScore,
    kickoff: formatKickoff(iso, timeZone, hour12),
    kickoffIso: iso,
    hasTv: hasTv(event),
    broadcast: broadcastOf(event),
    round: roundOf(event),
  };
}

export function eventOnDay(
  event: unknown,
  isoDate: string,
  allowLiveOverflow = false,
  timeZone = "UTC",
): boolean {
  if (!isRecord(event)) return false;
  const iso = asString(event.date);
  if (!iso) return false;
  if (calendarDayOf(iso, timeZone) === isoDate) return true;
  if (!allowLiveOverflow) return false;
  const { status } = mapStatus(event);
  return status === "live" || status === "ht";
}

function sortMatches(matches: Match[]): Match[] {
  const rank: Record<Match["status"], number> = {
    live: 0,
    ht: 1,
    ns: 2,
    ft: 3,
    pp: 4,
    ab: 5,
  };
  return [...matches].sort((a, b) => {
    const statusDiff = rank[a.status] - rank[b.status];
    if (statusDiff !== 0) return statusDiff;
    return a.kickoffIso.localeCompare(b.kickoffIso);
  });
}

export function emptyGroup(slug: string, name: string, logo?: string): LeagueGroup {
  const region = regionForSlug(slug);
  return {
    id: slug,
    name: displayNameForSlug(slug, name),
    country: region.country,
    flag: region.flag,
    logo: logo ?? logoForSlug(slug),
    priority: priorityForSlug(slug),
    matches: [],
  };
}

export function upsertMatch(groups: Map<string, LeagueGroup>, slug: string, name: string, match: Match, logo?: string) {
  const existing = groups.get(slug) ?? emptyGroup(slug, name, logo);
  if (logo && !existing.logo) existing.logo = logo;
  if (!existing.matches.some((item) => item.id === match.id)) {
    existing.matches.push(match);
  }
  groups.set(slug, existing);
}

export function finalizeGroups(
  groups: Map<string, LeagueGroup>,
  isoDate: string,
  allowLiveOverflow = false,
  timeZone = "UTC",
): LeagueGroup[] {
  return [...groups.values()]
    .map((group) => ({
      ...group,
      matches: sortMatches(
        group.matches.filter((match) => {
          if (calendarDayOf(match.kickoffIso, timeZone) === isoDate) return true;
          return allowLiveOverflow && (match.status === "live" || match.status === "ht");
        }),
      ),
    }))
    .filter((group) => group.matches.length > 0)
    .sort((a, b) => a.priority - b.priority || a.name.localeCompare(b.name));
}

export { mapTeam, hexColor, teamLogo, competitorsOf, homeAway, mapStatus, sortMatches };
