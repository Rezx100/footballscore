import Link from "next/link";
import { DAY_NEXT, DAY_PREV, editorialDate } from "@/lib/dates";
import { matchesHref, type MatchesQuery } from "@/lib/matches-query";

function Caret({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 12 16" width="12" height="16" aria-hidden="true" className="block">
      {dir === "prev" ? (
        <path d="M8.5 1.5 2.5 8l6 6.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      ) : (
        <path d="M3.5 1.5 9.5 8l-6 6.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      )}
    </svg>
  );
}

export function DayHead({
  query,
  liveCount = 0,
}: {
  query: MatchesQuery;
  liveCount?: number;
}) {
  const { weekday, date, relative } = editorialDate(query.day);
  const prev = DAY_PREV[query.day];
  const next = DAY_NEXT[query.day];

  return (
    <div className="px-5 pb-5 pt-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[28px] leading-[1.05] tracking-[-0.035em] text-[var(--ink)]">{weekday}</p>
          <p className="mt-1.5 text-[13px] text-[var(--muted)]">{date}</p>
          <p className="mt-2 text-[12px] text-[var(--muted)]">
            {relative ? <span>{relative}</span> : null}
            {relative && (liveCount > 0 || query.day !== "yesterday") ? " · " : null}
            {liveCount > 0 ? (
              <span className="tabular-nums text-[var(--live)]">{liveCount} live</span>
            ) : query.day !== "yesterday" ? (
              <span>Times ET</span>
            ) : null}
          </p>
        </div>
        <div className="flex items-center gap-2 pt-2">
          {prev ? (
            <Link
              href={matchesHref({ ...query, day: prev, hide: false, match: null, tab: "matches" })}
              className="p-1 text-[var(--ink)]"
              aria-label="Previous day"
            >
              <Caret dir="prev" />
            </Link>
          ) : (
            <span className="p-1 text-[var(--line)]" aria-hidden="true">
              <Caret dir="prev" />
            </span>
          )}
          {next ? (
            <Link
              href={matchesHref({ ...query, day: next, hide: false, match: null, tab: "matches" })}
              className="p-1 text-[var(--ink)]"
              aria-label="Next day"
            >
              <Caret dir="next" />
            </Link>
          ) : (
            <span className="p-1 text-[var(--line)]" aria-hidden="true">
              <Caret dir="next" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
