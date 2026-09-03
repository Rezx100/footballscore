import { ExploreView } from "@/components/explore/explore-view";
import { PageShell } from "@/components/shell/page-shell";
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
  const [catalog, clubs, follow] = await Promise.all([getCatalog(), getFirstClassClubs(), serverFollow()]);
  return (
    <PageShell>
      <ExploreView catalog={catalog} clubs={clubs} follow={follow} q={q} />
    </PageShell>
  );
}
