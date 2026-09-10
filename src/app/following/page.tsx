import { AppShell } from "@/components/app-shell";
import { AppHeader } from "@/components/scory/chrome";
import { FollowingView } from "@/components/following/following-view";
import { getCatalog } from "@/lib/espn/catalog";
import { getFirstClassClubs, getFollowedClubs } from "@/lib/espn/explore";
import { getMatchesForDay } from "@/lib/espn/matches";
import { serverFollow, serverPrefs } from "@/lib/server-state";

export const dynamic = "force-dynamic";
export const revalidate = 300;

export default async function FollowingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const q = Array.isArray(query.q) ? query.q[0] : query.q ?? "";
  const [follow, prefs] = await Promise.all([serverFollow(), serverPrefs()]);
  const [catalog, clubs, { groups }] = await Promise.all([
    getCatalog(),
    q.trim() ? getFirstClassClubs() : getFollowedClubs(follow.teams),
    getMatchesForDay("today", prefs),
  ]);
  return (
    <AppShell>
      <AppHeader />
      <FollowingView catalog={catalog} clubs={clubs} q={q} groups={groups} />
    </AppShell>
  );
}
