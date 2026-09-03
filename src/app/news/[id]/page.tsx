import { EmptyState } from "@/components/ui/blocks";
import { NewsCard } from "@/components/news/news-card";
import { PageShell, SiteLockup } from "@/components/shell/page-shell";
import { formatRelative } from "@/lib/dates";
import { getArticle } from "@/lib/espn/article-page";

export const dynamic = "force-dynamic";
export const revalidate = 300;

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getArticle(id);
  if (!article) {
    return (
      <PageShell masthead={<header className="px-4 pt-4"><SiteLockup /></header>}>
        <EmptyState title="Story not in the feed" body="ESPN did not return this article." actionHref="/news" actionLabel="Back to news" />
      </PageShell>
    );
  }

  return (
    <PageShell
      masthead={
        <header className="px-4 pt-4 pb-2">
          <SiteLockup />
        </header>
      }
    >
      <article className="px-4 pb-10 pt-4">
        <p className="font-board text-[10px] tracking-[0.08em] text-[var(--muted)]">
          {[article.byline, article.published ? formatRelative(article.published) : null].filter(Boolean).join(" · ")}
        </p>
        <h1 className="font-cond mt-2 text-[24px] leading-tight">{article.headline}</h1>
        {article.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={article.image} alt="" className="mt-4 w-full rounded-[12px] object-cover" />
        ) : null}
        {article.description ? <p className="mt-4 text-[16px] leading-[24px] text-[color-mix(in_srgb,var(--ink)_88%,transparent)]">{article.description}</p> : null}
        {article.storyHtml ? (
          <div className="article-body mt-4 text-[15px] leading-[24px]" dangerouslySetInnerHTML={{ __html: article.storyHtml }} />
        ) : null}
        {article.related.length ? (
          <div className="mt-8 space-y-2">
            <h2 className="font-cond text-[16px]">Related</h2>
            {article.related.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        ) : null}
      </article>
    </PageShell>
  );
}
