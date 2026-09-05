import Link from "next/link";
import { formatRelative } from "@/lib/dates";
import { newsHref } from "@/lib/hrefs";
import type { NewsItem } from "@/lib/types";

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Link href={newsHref(item.id)} className="scory-news-card">
      {item.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.image} alt="" className="scory-news-card__thumb" />
      ) : (
        <span className="scory-news-card__thumb" />
      )}
      <span className="min-w-0 flex-1">
        <span className="line-clamp-2 text-[14px] font-medium leading-5 text-[var(--scory-text-primary)]">
          {item.headline}
        </span>
        <span className="mt-1 block text-[11px] leading-[14px] text-[var(--scory-text-secondary)]">
          {[item.byline, item.published ? formatRelative(item.published) : null].filter(Boolean).join(" · ")}
        </span>
      </span>
    </Link>
  );
}
