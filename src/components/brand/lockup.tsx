import Link from "next/link";
import { CalendarGlyph, ChevronGlyph, FilterGlyph, SearchGlyph } from "@/components/matches/figma-icons";
import { matchesHref, type MatchesQuery } from "@/lib/matches-query";

export function Lockup({ query }: { query: MatchesQuery }) {
  return (
    <div className="flex h-8 w-full items-center justify-between">
      <div className="flex h-6 items-center">
        <span className="inline-flex h-6 w-[17px] shrink-0 items-center text-[16px] font-medium leading-6 text-[var(--scory-text-brand,#f87171)]">
          [:]
        </span>
        <span className="ml-2 inline-flex h-6 w-[51px] shrink-0 items-center text-[18px] font-semibold leading-6 tracking-[-0.2px] text-[var(--scory-text-primary,#ffffff)]">
          Scory
        </span>
        <span className="sport-pill ml-2">
          <span>Football</span>
          <ChevronGlyph size={16} />
        </span>
      </div>
      <div className="flex h-8 shrink-0 items-center gap-[10px]">
        <Link
          href={
            query.search
              ? matchesHref({ ...query, q: "", search: false, tab: "matches" })
              : matchesHref({ ...query, search: true, tab: "matches" })
          }
          aria-label={query.search ? "Close search" : "Search"}
          className="flex size-[32px] items-center justify-center rounded-[8px] text-[var(--scory-icon-default,#ffffff)]"
        >
          <SearchGlyph size={20} />
        </Link>
        <span
          aria-hidden="true"
          className="flex size-[32px] items-center justify-center rounded-[8px] text-[var(--scory-icon-default,#ffffff)]"
        >
          <CalendarGlyph size={20} />
        </span>
        <span
          aria-hidden="true"
          className="flex size-[32px] items-center justify-center rounded-[8px] text-[var(--scory-icon-default,#ffffff)]"
        >
          <FilterGlyph size={20} />
        </span>
        <span className="masthead-avatar" aria-hidden="true" />
      </div>
    </div>
  );
}
