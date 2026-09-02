import Link from "next/link";
import { BrandMark } from "@/components/brand/mark";
import { Wordmark } from "@/components/brand/wordmark";
import { MARKS, nextMark } from "@/lib/brand";
import { matchesHref, type MatchesQuery } from "@/lib/matches-query";

export function Lockup({ query }: { query: MatchesQuery }) {
  const current = MARKS.find((mark) => mark.id === query.mark) ?? MARKS[0];
  const following = nextMark(query.mark);
  return (
    <div className="flex items-center justify-between gap-4">
      <Link
        href={matchesHref({ ...query, mark: following })}
        className="flex items-center gap-2.5 text-[var(--ink)]"
        aria-label={`footballscore, ${current.name}. Try the next mark`}
      >
        <BrandMark id={query.mark} size={20} />
        <Wordmark />
      </Link>
      <Link
        href={
          query.search
            ? matchesHref({ ...query, q: "", search: false, tab: "matches" })
            : matchesHref({ ...query, search: true, tab: "matches" })
        }
        className="shrink-0 font-[family-name:var(--font-board)] text-[11px] text-[var(--muted)]"
      >
        {query.search ? "Close" : "Find"}
      </Link>
    </div>
  );
}
