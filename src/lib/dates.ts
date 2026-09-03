import type { DayKey } from "@/lib/types";

type Ymd = { y: number; m: number; d: number };

export function isValidTimeZone(value: string | undefined): value is string {
  if (!value) return false;
  try {
    Intl.DateTimeFormat("en-US", { timeZone: value }).format(new Date());
    return true;
  } catch {
    return false;
  }
}

function ymdInZone(date: Date, timeZone: string): Ymd {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
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

export function ymdForDay(day: DayKey, now = new Date(), timeZone = "UTC"): Ymd {
  return addDays(ymdInZone(now, timeZone), dayOffset(day));
}

export function espnDateForDay(day: DayKey, now = new Date(), timeZone = "UTC"): string {
  return ymdToEspnDate(ymdForDay(day, now, timeZone));
}

export function isoDateForDay(day: DayKey, now = new Date(), timeZone = "UTC"): string {
  return ymdToIsoDate(ymdForDay(day, now, timeZone));
}

export function calendarDayOf(iso: string, timeZone = "UTC"): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(iso));
  const pick = (type: string) => parts.find((part) => part.type === type)?.value ?? "0";
  return `${pick("year")}-${pick("month")}-${pick("day")}`;
}

export function formatKickoff(iso: string, timeZone = "UTC", hour12 = false): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: hour12 ? "h12" : "h23",
  }).format(new Date(iso));
}

export function formatRelative(iso: string, now = new Date()): string {
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return "";
  const delta = now.getTime() - then;
  const minutes = Math.round(delta / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days}d`;
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" }).format(new Date(iso));
}

export function tzAbbrev(timeZone: string, now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    timeZoneName: "short",
  }).formatToParts(now);
  return parts.find((part) => part.type === "timeZoneName")?.value ?? timeZone;
}

export type BoardDate = {
  weekday: string;
  weekdayLong: string;
  month: string;
  dayNum: string;
  spoken: string;
};

export function boardDate(day: DayKey, now = new Date(), timeZone = "UTC"): BoardDate {
  const ymd = ymdForDay(day, now, timeZone);
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
  const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"] as const;
  const month = MONTHS[ymd.m - 1];
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
  now = new Date(),
  timeZone = "UTC",
): ({ key: DayKey } & BoardDate) | null {
  const key = dir === "prev" ? DAY_PREV[day] : DAY_NEXT[day];
  if (!key) return null;
  return { key, ...boardDate(key, now, timeZone) };
}

export function dayLabel(day: DayKey, now = new Date(), timeZone = "UTC"): string {
  const { weekday, dayNum, month } = boardDate(day, now, timeZone);
  return `${weekday} ${dayNum} ${month}`;
}

export function isoToEspnDate(iso: string): string {
  const day = iso.slice(0, 10).replaceAll("-", "");
  return day.length === 8 ? day : iso.replaceAll("-", "").slice(0, 8);
}
