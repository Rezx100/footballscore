import { AppShell } from "@/components/app-shell";
import { AppHeader } from "@/components/scory/chrome";
import { NewsCard } from "@/components/news/news-card";
import { EmptyState, UnderlineTabs } from "@/components/scory/primitives";
import { getNewsIndex } from "@/lib/espn/news-page";
import { filterNews, type NewsBucket } from "@/lib/news-buckets";
import { serverFollow } from "@/lib/server-state";

export const dynamic = "force-dynamic";
export const revalidate = 300;
export const maxDuration = 20;

function parseNewsTab(value: string | undefined): NewsBucket {
  return value === "transfers" || value === "injuries" || value === "opinion" ? value : "latest";
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const tab = parseNewsTab(Array.isArray(query.tab) ? query.tab[0] : query.tab);
  const follow = await serverFollow();
  const { forYou, world } = await getNewsIndex(follow);
  const pool = forYou.length ? forYou : world;
  const items = filterNews(pool, tab);

  return (
    <AppShell>
      <AppHeader />
      <div className="px-4 pt-3">
        <h1 className="text-[18px] font-semibold leading-6">News</h1>
        <div className="mt-3">
          <UnderlineTabs
            value={tab}
            items={[
              { value: "latest", label: "Latest", href: "/news" },
              { value: "transfers", label: "Transfers", href: "/news?tab=transfers" },
              { value: "injuries", label: "Injuries", href: "/news?tab=injuries" },
              { value: "opinion", label: "Opinion", href: "/news?tab=opinion" },
            ]}
          />
        </div>
      </div>
      {items.length ? (
        <div className="space-y-2 px-4 pb-10 pt-4">
          {items.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No headlines"
          body={
            tab === "latest"
              ? "ESPN did not return news for the first-class leagues right now."
              : `No ESPN headlines matched ${tab} right now.`
          }
          actionHref="/news"
          actionLabel={tab === "latest" ? "Back to scores" : "See latest"}
        />
      )}
    </AppShell>
  );
}
