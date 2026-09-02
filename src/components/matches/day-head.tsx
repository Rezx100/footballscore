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
      <span className="opacity-30">
        <BoardFlap tone="idle" width={40} height={36}>
          <span className="font-board text-[10px] tracking-[0.06em] text-[var(--muted)]">···</span>
        </BoardFlap>
      </span>
    );
  }
  return (
    <Link
      href={matchesHref({ ...query, day: neighbor.key, hide: false, match: null, tab: "matches" })}
      aria-label={neighbor.spoken}
      className="text-[var(--ink)]"
    >
      <BoardFlap tone="idle" width={40} height={36}>
        <span className="font-board text-[10px] tracking-[0.08em] text-[var(--muted)]">
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
    <div className="flex items-end gap-3 px-5 pb-5 pt-4">
      <div className="flex items-end gap-1.5">
        <SideDay query={query} dir="prev" />
        <span aria-current="date" aria-label={current.spoken}>
          <DateFlap day={current.dayNum} month={current.month} />
        </span>
        <SideDay query={query} dir="next" />
      </div>
      <div className="min-w-0 pb-1">
        {liveCount > 0 ? (
          <p className="font-board text-[13px] text-[var(--live)]">{liveCount} live</p>
        ) : (
          <p className="font-board text-[11px] text-[var(--muted)]">Times ET</p>
        )}
      </div>
    </div>
  );
}
