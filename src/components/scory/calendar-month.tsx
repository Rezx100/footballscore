"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BackGlyph, ChevronRightGlyph } from "@/components/matches/figma-icons";
import { AppHeader } from "@/components/scory/chrome";
import { Button } from "@/components/scory/primitives";
import { DayHead } from "@/components/matches/day-head";
import { isoDateForDay } from "@/lib/dates";
import { DEFAULT_MATCHES_QUERY, matchesHrefForIso } from "@/lib/matches-query";

const DOW = ["S", "M", "T", "W", "T", "F", "S"];

function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

export function CalendarView({ timeZone }: { timeZone: string }) {
  const router = useRouter();
  const todayIso = isoDateForDay("today", new Date(), timeZone);
  const [selected, setSelected] = useState(todayIso);
  const [cursor, setCursor] = useState(() => {
    const [year, month] = todayIso.split("-").map(Number);
    return { year: year ?? 2026, month: month ?? 1 };
  });

  const cells = useMemo(() => {
    const first = new Date(Date.UTC(cursor.year, cursor.month - 1, 1));
    const start = first.getUTCDay();
    const count = daysInMonth(cursor.year, cursor.month);
    const out: Array<{ iso: string; day: number } | null> = [];
    for (let i = 0; i < start; i += 1) out.push(null);
    for (let day = 1; day <= count; day += 1) {
      out.push({ iso: `${cursor.year}-${pad(cursor.month)}-${pad(day)}`, day });
    }
    return out;
  }, [cursor]);

  const label = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(cursor.year, cursor.month - 1, 1)));

  return (
    <div className="bg-[var(--bg)] text-[var(--ink)]">
      <AppHeader />
      <DayHead query={DEFAULT_MATCHES_QUERY} timeZone={timeZone} />
      <div className="px-4 pb-10 pt-2">
        <h1 className="text-[18px] font-semibold leading-6">Pick a date</h1>
        <div className="scory-cal mt-4">
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              className="scory-icon-btn"
              aria-label="Previous month"
              onClick={() =>
                setCursor((current) =>
                  current.month === 1
                    ? { year: current.year - 1, month: 12 }
                    : { year: current.year, month: current.month - 1 },
                )
              }
            >
              <BackGlyph size={20} />
            </button>
            <p className="text-[16px] font-semibold">{label}</p>
            <button
              type="button"
              className="scory-icon-btn"
              aria-label="Next month"
              onClick={() =>
                setCursor((current) =>
                  current.month === 12
                    ? { year: current.year + 1, month: 1 }
                    : { year: current.year, month: current.month + 1 },
                )
              }
            >
              <ChevronRightGlyph size={16} />
            </button>
          </div>
          <div className="scory-cal__grid">
            {DOW.map((day, index) => (
              <span key={`${day}-${index}`} className="scory-cal__dow">
                {day}
              </span>
            ))}
            {cells.map((cell, index) =>
              cell ? (
                <button
                  key={cell.iso}
                  type="button"
                  className="scory-cal__day"
                  aria-pressed={cell.iso === selected}
                  aria-current={cell.iso === todayIso ? "date" : undefined}
                  onClick={() => setSelected(cell.iso)}
                >
                  {cell.day}
                </button>
              ) : (
                <span key={`empty-${index}`} className="scory-cal__day" />
              ),
            )}
          </div>
        </div>
        <Button
          className="mt-6 w-full"
          onClick={() => router.push(matchesHrefForIso(selected, timeZone))}
        >
          Apply Date
        </Button>
      </div>
    </div>
  );
}
