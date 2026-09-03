import { FollowingView } from "@/components/following/following-view";
import { PageShell } from "@/components/shell/page-shell";
import { getCatalog } from "@/lib/espn/catalog";
import { getFirstClassClubs, getFollowedClubs } from "@/lib/espn/explore";
import { serverFollow } from "@/lib/server-state";

export const dynamic = "force-dynamic";
export const revalidate = 300;

export default async function FollowingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const q = Array.isArray(query.q) ? query.q[0] : query.q ?? "";
  const follow = await serverFollow();
  const [catalog, clubs] = await Promise.all([
    getCatalog(),
    q.trim() ? getFirstClassClubs() : getFollowedClubs(follow.teams),
  ]);
  return (
    <PageShell>
      <FollowingView catalog={catalog} clubs={clubs} q={q} />
    </PageShell>
  );
}
