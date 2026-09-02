import Link from "next/link";
import { getDateStrip } from "@/lib/dates";
import { matchesHref, type MatchesQuery } from "@/lib/matches-query";

export function DateStrip({
  query,
  liveCount = 0,
}: {
  query: MatchesQuery;
  liveCount?: number;
}) {
  const days = getDateStrip();
  return (
    <div className="flex gap-5 overflow-x-auto px-4 pt-2 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {days.map((day) => {
        const active = day.key === query.day;
        return (
          <Link
            key={day.key}
            href={matchesHref({ ...query, day: day.key, hide: false, match: null, tab: "matches" })}
            className={`shrink-0 text-[14px] no-underline ${
              active ? "font-semibold text-[var(--ink)]" : "font-medium text-[var(--muted)]"
            }`}
          >
            {day.label}
            {day.key === "today" && liveCount > 0 ? (
              <span className="ml-1.5 text-[11px] font-semibold text-[var(--live)]">
                {liveCount} live
              </span>
            ) : null}
          </Link>
        );
      })}
    </div>
  );
}
