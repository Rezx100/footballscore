import Link from "next/link";
import { BoardFlap, DateFlap } from "@/components/brand/flap";
import { boardDate, neighborDay } from "@/lib/dates";
import { matchesHref, type MatchesQuery } from "@/lib/matches-query";

function SideDay({
  query,
  dir,
}: {
  query: MatchesQuery;
  dir: "prev" | "next";
}) {
  const neighbor = neighborDay(query.day, dir);
  if (!neighbor) {
    return (
      <span className="opacity-25">
        <BoardFlap tone="idle" width={44} height={48}>
          <span className="font-board text-[10px] tracking-[0.08em] text-[var(--muted)]">···</span>
        </BoardFlap>
      </span>
    );
  }
  return (
    <Link
      href={matchesHref({ ...query, day: neighbor.key, hide: false, match: null, tab: "matches" })}
      aria-label={neighbor.spoken}
      className="day-chip text-[var(--ink)] transition-opacity duration-160 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:opacity-90"
    >
      <BoardFlap tone="idle" width={44} height={48}>
        <span className="font-board text-[10px] tracking-[0.1em] text-[var(--muted)]">
          {neighbor.weekday}
        </span>
      </BoardFlap>
    </Link>
  );
}

export function DayHead({
  query,
  liveCount = 0,
}: {
  query: MatchesQuery;
  liveCount?: number;
}) {
  const current = boardDate(query.day);

  return (
    <div className="px-4 pb-4 pt-3">
      <div className="day-rail flex items-center gap-2.5 rounded-[12px] px-2.5 py-2">
        <div className="flex items-center gap-1.5">
          <SideDay query={query} dir="prev" />
          <span aria-current="date" aria-label={current.spoken} className="day-rail__today">
            <DateFlap day={current.dayNum} month={current.month} />
          </span>
          <SideDay query={query} dir="next" />
        </div>

        <div className="ml-auto flex min-w-0 flex-col items-end gap-0.5 pr-1">
          {liveCount > 0 ? (
            <p className="flex items-center gap-1.5 font-board text-[12px] tracking-[0.04em] text-[var(--copper)]">
              <span
                className="live-dot h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--copper)]"
                aria-hidden="true"
              />
              {liveCount} live
            </p>
          ) : (
            <p className="font-board text-[11px] tracking-[0.06em] text-[var(--muted)]">Times ET</p>
          )}
          <p className="font-board text-[10px] tracking-[0.08em] text-[var(--muted)]">
            {current.weekdayLong.slice(0, 3).toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}
