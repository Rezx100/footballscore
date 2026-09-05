import { isoDateForDay, isoToEspnDate } from "@/lib/dates";
import { fetchSoccerHeader } from "@/lib/espn/client";
import { eventOnDay, finalizeGroups, mapEvent, upsertMatch } from "@/lib/espn/map";
import type { DayKey, LeagueGroup, Prefs } from "@/lib/types";

export type MatchesLoad = {
  groups: LeagueGroup[];
  error: string | null;
  lastNight?: LeagueGroup[];
  nextUp?: LeagueGroup[];
};

async function loadGroupsForIso(
  isoDate: string,
  prefs: Prefs,
  allowLiveOverflow: boolean,
): Promise<MatchesLoad> {
  const espnDate = isoToEspnDate(isoDate);
  const mapOpts = { timeZone: prefs.tz, hour12: prefs.hour12 };

  const headerResult = await fetchSoccerHeader(espnDate).then(
    (leagues) => ({ ok: true as const, leagues }),
    (error: unknown) => ({ ok: false as const, error: String(error) }),
  );

  if (!headerResult.ok) {
    return { groups: [], error: "Couldn’t load football scores. Try again in a moment." };
  }

  const groups = new Map<string, LeagueGroup>();
  for (const league of headerResult.leagues) {
    league.events.forEach((event, eventIndex) => {
      if (!eventOnDay(event, isoDate, allowLiveOverflow, prefs.tz)) return;
      const match = mapEvent(event, `${league.slug}-${eventIndex}`, league.slug, {
        ...mapOpts,
        leagueName: league.name,
      });
      if (match) upsertMatch(groups, league.slug, league.name, match);
    });
  }

  return { groups: finalizeGroups(groups, isoDate, allowLiveOverflow, prefs.tz), error: null };
}

async function loadGroupsForDay(day: DayKey, prefs: Prefs): Promise<MatchesLoad> {
  const isoDate = isoDateForDay(day, new Date(), prefs.tz);
  return loadGroupsForIso(isoDate, prefs, day === "today");
}

export async function getMatchesForIso(iso: string, prefs: Prefs): Promise<MatchesLoad> {
  const isoDate = iso.slice(0, 10);
  const todayIso = isoDateForDay("today", new Date(), prefs.tz);
  return loadGroupsForIso(isoDate, prefs, isoDate === todayIso);
}

export async function getMatchesForDay(day: DayKey, prefs: Prefs): Promise<MatchesLoad> {
  const load = await loadGroupsForDay(day, prefs);
  if (day === "today" && load.groups.length === 0 && !load.error) {
    const [lastNight, nextUp] = await Promise.all([
      loadGroupsForDay("yesterday", prefs),
      loadGroupsForDay("tomorrow", prefs),
    ]);
    return {
      ...load,
      lastNight: lastNight.groups,
      nextUp: nextUp.groups,
    };
  }
  return load;
}
