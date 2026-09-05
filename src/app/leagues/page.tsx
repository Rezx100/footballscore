import { AppShell } from "@/components/app-shell";
import { AppHeader } from "@/components/scory/chrome";
import { ExploreView } from "@/components/explore/explore-view";
import { getCatalog } from "@/lib/espn/catalog";
import { getFirstClassClubs } from "@/lib/espn/explore";
import { serverFollow } from "@/lib/server-state";

export const dynamic = "force-dynamic";
export const revalidate = 300;

export default async function LeaguesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const q = Array.isArray(query.q) ? query.q[0] : query.q ?? "";
  const [catalog, clubs, follow] = await Promise.all([
    getCatalog(),
    q.trim() ? getFirstClassClubs() : Promise.resolve([]),
    serverFollow(),
  ]);
  return (
    <AppShell>
      <AppHeader />
      <ExploreView catalog={catalog} clubs={clubs} follow={follow} q={q} />
    </AppShell>
  );
}
