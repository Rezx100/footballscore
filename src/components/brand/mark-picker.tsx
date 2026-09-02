import Link from "next/link";
import { BrandMark } from "@/components/brand/mark";
import { MARKS } from "@/lib/brand";
import { matchesHref, type MatchesQuery } from "@/lib/matches-query";

export function MarkPicker({ query }: { query: MatchesQuery }) {
  return (
    <div className="flex items-end gap-3" role="group" aria-label="Mark drafts">
      {MARKS.map((mark) => {
        const selected = mark.id === query.mark;
        return (
          <Link
            key={mark.id}
            href={matchesHref({ ...query, mark: mark.id })}
            aria-current={selected ? "true" : undefined}
            aria-label={`${mark.n}. ${mark.name}`}
            className={`flex flex-col items-center gap-1 ${selected ? "text-[var(--ink)]" : "text-[var(--muted)]"}`}
          >
            <span
              className={`flex h-8 w-8 items-center justify-center ${
                selected ? "outline outline-1 outline-[var(--ink)]" : ""
              }`}
            >
              <BrandMark id={mark.id} size={22} />
            </span>
            <span className="text-[10px] leading-none tabular-nums">{mark.n}</span>
          </Link>
        );
      })}
    </div>
  );
}
