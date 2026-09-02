import Link from "next/link";
import { BrandMark } from "@/components/brand/mark";
import { Wordmark } from "@/components/brand/wordmark";
import { MARKS, nextMark } from "@/lib/brand";
import { matchesHref, type MatchesQuery } from "@/lib/matches-query";

export function Lockup({ query }: { query: MatchesQuery }) {
  const current = MARKS.find((mark) => mark.id === query.mark) ?? MARKS[0];
  const following = nextMark(query.mark);
  return (
    <div className="flex items-start justify-between gap-4">
      <Link
        href={matchesHref({ ...query, mark: following })}
        className="min-w-0 text-[var(--ink)]"
        aria-label={`footballscore, ${current.n}. ${current.name}. Try the next mark`}
      >
        <span className="flex items-center gap-2.5">
          <BrandMark id={query.mark} size={22} />
          <Wordmark />
        </span>
        <span className="mt-1.5 block pl-[32px] text-[11px] text-[var(--muted)]">
          {current.n} · {current.name}
        </span>
      </Link>
      <Link
        href={
          query.search
            ? matchesHref({ ...query, q: "", search: false, tab: "matches" })
            : matchesHref({ ...query, search: true, tab: "matches" })
        }
        className="shrink-0 pt-1 text-[12px] text-[var(--muted)]"
      >
        {query.search ? "Close" : "Search"}
      </Link>
    </div>
  );
}
