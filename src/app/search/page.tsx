import { AppShell } from "@/components/app-shell";
import { SearchView, parseSearchTab } from "@/components/search/search-view";
import { getCatalog } from "@/lib/espn/catalog";
import { getFirstClassClubs } from "@/lib/espn/explore";
import { getNewsIndex } from "@/lib/espn/news-page";
import { serverFollow } from "@/lib/server-state";

export const dynamic = "force-dynamic";
export const revalidate = 300;
export const maxDuration = 20;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const q = (Array.isArray(params.q) ? params.q[0] : params.q) ?? "";
  const tab = parseSearchTab(Array.isArray(params.tab) ? params.tab[0] : params.tab);
  const follow = await serverFollow();
  const [{ world }, catalog, clubs] = await Promise.all([
    getNewsIndex(follow),
    getCatalog(),
    getFirstClassClubs(),
  ]);

  return (
    <AppShell>
      <SearchView q={q} tab={tab} news={world} clubs={clubs} leagues={catalog} />
    </AppShell>
  );
}
