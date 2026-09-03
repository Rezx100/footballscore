import { fetchSummary } from "@/lib/espn/client";
import { mapSummary, type MatchDetail } from "@/lib/espn/map-summary";
import type { Prefs } from "@/lib/types";

export async function getMatchDetail(
  league: string,
  id: string,
  prefs: Prefs,
): Promise<MatchDetail | null> {
  const raw = await fetchSummary(league, id);
  return mapSummary(raw, league, { timeZone: prefs.tz, hour12: prefs.hour12 });
}
