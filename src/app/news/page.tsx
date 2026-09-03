import Link from "next/link";
import { NewsCard } from "@/components/news/news-card";
import { EmptyState, SegmentTabs } from "@/components/ui/blocks";
import { PageShell, SiteLockup } from "@/components/shell/page-shell";
import { getNewsIndex } from "@/lib/espn/news-page";
import { serverFollow } from "@/lib/server-state";

export const dynamic = "force-dynamic";
export const revalidate = 300;
export const maxDuration = 20;

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const tab = (Array.isArray(query.tab) ? query.tab[0] : query.tab) === "world" ? "world" : "foryou";
  const follow = await serverFollow();
  const { forYou, world } = await getNewsIndex(follow);
  const items = tab === "world" ? world : forYou.length ? forYou : world;

  return (
    <PageShell
      masthead={
        <header className="masthead px-4 pt-4 pb-2">
          <SiteLockup />
          <h1 className="font-cond mt-5 text-[20px]">News</h1>
        </header>
      }
    >
      <SegmentTabs
        value={tab}
        items={[
          { value: "foryou", label: "For you", href: "/news" },
          { value: "world", label: "World", href: "/news?tab=world" },
        ]}
      />
      {items.length ? (
        <div className="space-y-2 px-4 pb-10">
          {tab === "foryou" && !forYou.length ? (
            <p className="pb-2 text-[13px] text-[var(--muted)]">
              Follow leagues or clubs for a personal feed. Showing world headlines for now.{" "}
              <Link href="/following" className="text-[var(--live)]">Following</Link>
            </p>
          ) : null}
          {items.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <EmptyState title="No headlines" body="ESPN did not return news for the first-class leagues right now." actionHref="/matches" actionLabel="Back to scores" />
      )}
    </PageShell>
  );
}
