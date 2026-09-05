import Link from "next/link";
import { boardDate, ymdForDay } from "@/lib/dates";
import { matchesHref, type MatchesQuery } from "@/lib/matches-query";
import type { DayKey } from "@/lib/types";

const DAYS: DayKey[] = ["yesterday", "today", "tomorrow", "next"];

function chipLabel(day: DayKey, timeZone: string): string {
  if (day === "today") return "Today";
  if (day === "tomorrow") return "Tomorrow";
  const ymd = ymdForDay(day, new Date(), timeZone);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(ymd.y, ymd.m - 1, ymd.d)));
}

export function DayHead({
  query,
  timeZone = "UTC",
}: {
  query: MatchesQuery;
  liveCount?: number;
  timeZone?: string;
}) {
  return (
    <div className="day-rail h-rail">
      {DAYS.map((day) => {
        const spoken = boardDate(day, new Date(), timeZone).spoken;
        const active = query.day === day;
        return (
          <Link
            key={day}
            href={matchesHref({ ...query, day, hide: false, match: null, tab: "matches" })}
            aria-label={spoken}
            aria-current={active ? "date" : undefined}
            className="day-chip"
          >
            {chipLabel(day, timeZone)}
          </Link>
        );
      })}
    </div>
  );
}
