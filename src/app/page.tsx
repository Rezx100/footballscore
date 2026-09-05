import { AppShell } from "@/components/app-shell";
import { ScoreFeed } from "@/components/home/score-feed";
import { getFollowedClubs } from "@/lib/espn/explore";
import { getMatchesForDay } from "@/lib/espn/matches";
import { DEFAULT_MATCHES_QUERY, parseDayParam } from "@/lib/matches-query";
import { serverFollow, serverPrefs } from "@/lib/server-state";

export const dynamic = "force-dynamic";
export const revalidate = 15;
export const maxDuration = 20;

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const day = parseDayParam(params.day);
  const [prefs, follow] = await Promise.all([serverPrefs(), serverFollow()]);
  const [{ groups, error }, clubs] = await Promise.all([
    getMatchesForDay(day, prefs),
    getFollowedClubs(follow.teams),
  ]);

  return (
    <AppShell>
      <ScoreFeed
        query={{ ...DEFAULT_MATCHES_QUERY, day }}
        groups={groups}
        error={error}
        follow={follow}
        clubs={clubs}
        timeZone={prefs.tz}
      />
    </AppShell>
  );
}
