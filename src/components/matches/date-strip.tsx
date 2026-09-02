import Link from "next/link";
import { DAY_LABELS, DAY_ORDER } from "@/lib/matches";
import { matchesHref, type MatchesQuery } from "@/lib/matches-query";

export function DateStrip({ query }: { query: MatchesQuery }) {
  return (
    <div className="flex gap-5 overflow-x-auto px-4 pt-1 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {DAY_ORDER.map((day) => {
        const active = day === query.day;
        return (
          <Link
            key={day}
            href={matchesHref({ ...query, day, hide: false, match: null, tab: "matches" })}
            className={`shrink-0 pb-2 text-[15px] ${
              active
                ? "border-b-[3px] border-[#111111] font-bold text-[#111111]"
                : "border-b-[3px] border-transparent font-medium text-[var(--muted)]"
            }`}
          >
            {DAY_LABELS[day]}
          </Link>
        );
      })}
    </div>
  );
}
