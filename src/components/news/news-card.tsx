import Link from "next/link";
import { formatRelative } from "@/lib/dates";
import { newsHref } from "@/lib/hrefs";
import type { NewsItem } from "@/lib/types";

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Link href={newsHref(item.id)} className="score-card flex gap-3 overflow-hidden rounded-[12px] p-3">
      {item.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.image} alt="" className="h-16 w-24 shrink-0 rounded-[8px] object-cover" />
      ) : (
        <span className="h-16 w-24 shrink-0 rounded-[8px] bg-[var(--elev)]" />
      )}
      <span className="min-w-0">
        <span className="font-cond block text-[15px] leading-snug">{item.headline}</span>
        <span className="font-board mt-1 block text-[10px] tracking-[0.06em] text-[var(--muted)]">
          {[item.byline, item.published ? formatRelative(item.published) : null].filter(Boolean).join(" · ")}
        </span>
      </span>
    </Link>
  );
}
