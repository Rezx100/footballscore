import type { DayKey } from "@/lib/types";

/** ESPN soccer scoreboards are US-region; group and format kickoffs in this zone. */
export const ESPN_TZ = "America/New_York";

type Ymd = { y: number; m: number; d: number };

function etYmd(date: Date): Ymd {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: ESPN_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const pick = (type: string) => parts.find((part) => part.type === type)?.value ?? "0";
  return { y: Number(pick("year")), m: Number(pick("month")), d: Number(pick("day")) };
}

function addDays(ymd: Ymd, days: number): Ymd {
  const dt = new Date(Date.UTC(ymd.y, ymd.m - 1, ymd.d + days));
  return { y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, d: dt.getUTCDate() };
}

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

export function ymdToEspnDate(ymd: Ymd): string {
  return `${ymd.y}${pad2(ymd.m)}${pad2(ymd.d)}`;
}

export function ymdToIsoDate(ymd: Ymd): string {
  return `${ymd.y}-${pad2(ymd.m)}-${pad2(ymd.d)}`;
}

export function dayOffset(day: DayKey): number {
  if (day === "yesterday") return -1;
  if (day === "tomorrow") return 1;
  if (day === "next") return 2;
  return 0;
}

export function ymdForDay(day: DayKey, now = new Date()): Ymd {
  return addDays(etYmd(now), dayOffset(day));
}

export function espnDateForDay(day: DayKey, now = new Date()): string {
  return ymdToEspnDate(ymdForDay(day, now));
}

export function isoDateForDay(day: DayKey, now = new Date()): string {
  return ymdToIsoDate(ymdForDay(day, now));
}

export function calendarDayOf(iso: string, timeZone = ESPN_TZ): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(iso));
  const pick = (type: string) => parts.find((part) => part.type === type)?.value ?? "0";
  return `${pick("year")}-${pick("month")}-${pick("day")}`;
}

export function formatKickoff(iso: string, timeZone = ESPN_TZ): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(new Date(iso));
}

export type BoardDate = {
  weekday: string;
  weekdayLong: string;
  month: string;
  dayNum: string;
  spoken: string;
};

export function boardDate(day: DayKey, now = new Date()): BoardDate {
  const ymd = ymdForDay(day, now);
  const utc = new Date(Date.UTC(ymd.y, ymd.m - 1, ymd.d));
  const weekday = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    timeZone: "UTC",
  })
    .format(utc)
    .toUpperCase();
  const weekdayLong = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    timeZone: "UTC",
  }).format(utc);
  const month = new Intl.DateTimeFormat("en-GB", {
    month: "short",
    timeZone: "UTC",
  })
    .format(utc)
    .toUpperCase();
  const dayNum = pad2(ymd.d);
  return {
    weekday,
    weekdayLong,
    month,
    dayNum,
    spoken: `${weekdayLong} ${ymd.d} ${new Intl.DateTimeFormat("en-GB", { month: "long", timeZone: "UTC" }).format(utc)}`,
  };
}

export const DAY_PREV: Record<DayKey, DayKey | null> = {
  yesterday: null,
  today: "yesterday",
  tomorrow: "today",
  next: "tomorrow",
};

export const DAY_NEXT: Record<DayKey, DayKey | null> = {
  yesterday: "today",
  today: "tomorrow",
  tomorrow: "next",
  next: null,
};

export function neighborDay(
  day: DayKey,
  dir: "prev" | "next",
): ({ key: DayKey } & BoardDate) | null {
  const key = dir === "prev" ? DAY_PREV[day] : DAY_NEXT[day];
  if (!key) return null;
  return { key, ...boardDate(key) };
}

export function dayLabel(day: DayKey, now = new Date()): string {
  const { weekday, dayNum, month } = boardDate(day, now);
  return `${weekday} ${dayNum} ${month}`;
}
