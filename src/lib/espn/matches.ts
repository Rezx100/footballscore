import { isoDateForDay, espnDateForDay } from "@/lib/dates";
import { fetchScoreboard, fetchSoccerHeader } from "@/lib/espn/client";
import { FIRST_CLASS_LEAGUES } from "@/lib/espn/leagues";
import { eventOnDay, finalizeGroups, mapEvent, upsertMatch } from "@/lib/espn/map";
import type { DayKey, LeagueGroup, Prefs } from "@/lib/types";

export type MatchesLoad = {
  groups: LeagueGroup[];
  error: string | null;
  lastNight?: LeagueGroup[];
  nextUp?: LeagueGroup[];
};

async function loadGroupsForDay(day: DayKey, prefs: Prefs): Promise<MatchesLoad> {
  const espnDate = espnDateForDay(day, new Date(), prefs.tz);
  const isoDate = isoDateForDay(day, new Date(), prefs.tz);
  const allowLiveOverflow = day === "today";
  const mapOpts = { timeZone: prefs.tz, hour12: prefs.hour12 };

  const headerPromise = fetchSoccerHeader(espnDate).then(
    (leagues) => ({ ok: true as const, leagues }),
    (error: unknown) => ({ ok: false as const, error: String(error) }),
  );

  const [headerResult, ...boards] = await Promise.all([
    headerPromise,
    ...FIRST_CLASS_LEAGUES.map((league) => fetchScoreboard(league.slug, espnDate)),
  ]);

  const groups = new Map<string, LeagueGroup>();
  let loaded = 0;

  FIRST_CLASS_LEAGUES.forEach((league, index) => {
    const board = boards[index];
    if (!board) return;
    loaded += 1;
    board.events.forEach((event, eventIndex) => {
      if (!eventOnDay(event, isoDate, allowLiveOverflow, prefs.tz)) return;
      const match = mapEvent(event, `${board.slug}-${eventIndex}`, board.slug, {
        ...mapOpts,
        leagueName: league.name,
      });
      if (match) upsertMatch(groups, board.slug, league.name, match, board.logo ?? league.logo);
    });
  });

  if (headerResult.ok) {
    loaded += 1;
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
  }

  if (loaded === 0) {
    return { groups: [], error: "Couldn’t load football scores. Try again in a moment." };
  }

  return { groups: finalizeGroups(groups, isoDate, allowLiveOverflow, prefs.tz), error: null };
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
