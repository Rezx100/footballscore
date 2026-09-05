import Link from "next/link";
import { CalendarGlyph, ChevronGlyph, FilterGlyph, SearchGlyph } from "@/components/matches/figma-icons";
import { matchesHref, type MatchesQuery } from "@/lib/matches-query";

export function Lockup({ query }: { query: MatchesQuery }) {
  return (
    <div className="flex w-full items-center justify-between overflow-hidden">
      <div className="flex min-w-0 items-center gap-2 overflow-hidden">
        <span className="shrink-0 text-[16px] font-medium leading-[24px] text-[var(--scory-text-brand,#f87171)]">
          [:]
        </span>
        <span className="shrink-0 text-[18px] font-semibold leading-[24px] tracking-[-0.2px] text-[var(--scory-text-primary,#ffffff)]">
          Scory
        </span>
        <span className="flex shrink-0 items-center gap-[6px] rounded-[999px] bg-[var(--scory-bg-brand,#6c0707)] py-[4px] pr-3 pl-3">
          <span className="text-[12px] font-medium leading-[16px] tracking-[0.1px] text-[var(--scory-text-on-brand,#ffffff)]">
            Football
          </span>
          <span className="text-[var(--scory-text-on-brand,#ffffff)]">
            <ChevronGlyph size={16} />
          </span>
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-[10px]">
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
        <img src="/icons/scory/avatar.svg" alt="" width={28} height={28} className="size-[28px] rounded-full" />
      </div>
    </div>
  );
}
