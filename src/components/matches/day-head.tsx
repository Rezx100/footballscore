import Link from "next/link";
import { BoardFlap, DateFlap } from "@/components/brand/flap";
import { boardDate, neighborDay, tzAbbrev } from "@/lib/dates";
import { matchesHref, type MatchesQuery } from "@/lib/matches-query";

function SideDay({
  query,
  dir,
  timeZone,
}: {
  query: MatchesQuery;
  dir: "prev" | "next";
  timeZone: string;
}) {
  const neighbor = neighborDay(query.day, dir, new Date(), timeZone);
  if (!neighbor) {
    return (
      <span className="opacity-30">
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
      className="day-chip text-[var(--ink)] transition-opacity duration-160 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:opacity-100"
    >
      <BoardFlap tone="idle" width={44} height={48}>
        <span className="font-board text-[10px] tracking-[0.1em] text-[color-mix(in_srgb,var(--ink)_70%,transparent)]">
          {neighbor.weekday}
        </span>
      </BoardFlap>
    </Link>
  );
}

export function DayHead({
  query,
  liveCount = 0,
  timeZone = "UTC",
}: {
  query: MatchesQuery;
  liveCount?: number;
  timeZone?: string;
}) {
  const current = boardDate(query.day, new Date(), timeZone);

  return (
    <div className="px-4 pb-4 pt-3">
      <div className="day-rail flex items-center gap-2.5 rounded-[12px] px-2.5 py-2">
        <div className="flex items-center gap-1.5">
          <SideDay query={query} dir="prev" timeZone={timeZone} />
          <span aria-current="date" aria-label={current.spoken} className="day-rail__today">
            <DateFlap day={current.dayNum} month={current.month} />
          </span>
          <SideDay query={query} dir="next" timeZone={timeZone} />
        </div>

        <div className="ml-auto flex min-w-0 flex-col items-end gap-0.5 pr-1">
          {liveCount > 0 ? (
            <p className="flex items-center gap-1.5 font-board text-[12px] tracking-[0.04em] text-[var(--live)]">
              <span
                className="live-dot h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--live)]"
                aria-hidden="true"
              />
              {liveCount} live
            </p>
          ) : (
            <p className="font-board text-[11px] tracking-[0.06em] text-[var(--muted)]">{tzAbbrev(timeZone)}</p>
          )}
          <p className="font-board text-[10px] tracking-[0.08em] text-[var(--muted)]">
            {current.weekdayLong.slice(0, 3).toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}
