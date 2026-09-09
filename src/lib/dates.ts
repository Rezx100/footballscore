import type { DayKey } from "@/lib/types";

type Ymd = { y: number; m: number; d: number };

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

function ymdToEspnDate(ymd: Ymd): string {
  return `${ymd.y}${pad2(ymd.m)}${pad2(ymd.d)}`;
}

function ymdToIsoDate(ymd: Ymd): string {
  return `${ymd.y}-${pad2(ymd.m)}-${pad2(ymd.d)}`;
}

function dayOffset(day: DayKey): number {
  if (day === "yesterday") return -1;
  if (day === "tomorrow") return 1;
  if (day === "next") return 2;
  return 0;
}

function ymdForDay(day: DayKey, now = new Date(), timeZone = "UTC"): Ymd {
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

export function isoToEspnDate(iso: string): string {
  const day = iso.slice(0, 10).replaceAll("-", "");
  return day.length === 8 ? day : iso.replaceAll("-", "").slice(0, 8);
}
