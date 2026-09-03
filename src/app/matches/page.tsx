import { AppShell } from "@/components/app-shell";
import { MatchesScreen } from "@/components/matches/matches-screen";
import { getMatchesForDay } from "@/lib/espn/matches";
import { parseMatchesQuery } from "@/lib/matches-query";
import { serverFollow, serverPrefs } from "@/lib/server-state";

export const dynamic = "force-dynamic";
export const revalidate = 15;
export const maxDuration = 20;

export default async function MatchesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const query = parseMatchesQuery(params);
  const prefs = await serverPrefs();
  const follow = await serverFollow();
  const hideRaw = Array.isArray(params.hide) ? params.hide[0] : params.hide;
  if (hideRaw === "0") query.hide = false;
  else if (hideRaw === "1") query.hide = true;
  else if (prefs.hideFinished) query.hide = true;
  const { groups, error, lastNight, nextUp } = await getMatchesForDay(query.day, prefs);

  return (
    <AppShell>
      <MatchesScreen
        query={query}
        groups={groups}
        error={error}
        follow={follow}
        timeZone={prefs.tz}
        lastNight={lastNight}
        nextUp={nextUp}
      />
    </AppShell>
  );
}
