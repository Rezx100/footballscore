import { DEFAULT_MARK, parseMark, type MarkId } from "@/lib/brand";
import { isoDateForDay } from "@/lib/dates";
import type { DayKey } from "@/lib/types";

export type TabId = "matches" | "news" | "leagues" | "following" | "more";

export type MatchesQuery = {
  day: DayKey;
  hide: boolean;
  q: string;
  tab: TabId;
  match: string | null;
  search: boolean;
  mark: MarkId;
  iso?: string;
};

const DAYS: DayKey[] = ["yesterday", "today", "tomorrow", "next"];
const TABS: TabId[] = ["matches", "news", "leagues", "following", "more"];

function parseDay(value: string | undefined): DayKey {
  if (value === "thu") return "next";
  return DAYS.includes(value as DayKey) ? (value as DayKey) : "today";
}

export function parseIsoDate(value: string | undefined): string | undefined {
  return value && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : undefined;
}

export const DEFAULT_MATCHES_QUERY: MatchesQuery = {
  day: "today",
  hide: false,
  q: "",
  tab: "matches",
  match: null,
  search: false,
  mark: DEFAULT_MARK,
};

export function parseMatchesQuery(
  searchParams: Record<string, string | string[] | undefined>,
): MatchesQuery {
  const raw = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return {
    day: parseDay(raw("day")),
    hide: raw("hide") === "1",
    q: raw("q") ?? "",
    tab: TABS.includes(raw("tab") as TabId) ? (raw("tab") as TabId) : "matches",
    match: raw("match") ?? null,
    search: raw("search") === "1" || Boolean((raw("q") ?? "").trim()),
    mark: parseMark(raw("mark")),
    iso: parseIsoDate(raw("iso")),
  };
}

export function parseDayParam(value: string | string[] | undefined): DayKey {
  const raw = Array.isArray(value) ? value[0] : value;
  return parseDay(raw);
}

export function matchesHref(query: Partial<MatchesQuery> & MatchesQuery): string {
  const params = new URLSearchParams();
  if (query.iso) params.set("iso", query.iso);
  else if (query.day !== "today") params.set("day", query.day);
  if (query.hide) params.set("hide", "1");
  if (query.q.trim()) params.set("q", query.q.trim());
  if (query.tab !== "matches") params.set("tab", query.tab);
  if (query.match) params.set("match", query.match);
  if (query.search && !query.q.trim()) params.set("search", "1");
  if (query.mark !== DEFAULT_MARK) params.set("mark", query.mark);
  const qs = params.toString();
  return qs ? `/matches?${qs}` : "/matches";
}

export function dayKeyForIso(iso: string, timeZone: string, now = new Date()): DayKey | undefined {
  for (const day of DAYS) {
    if (isoDateForDay(day, now, timeZone) === iso) return day;
  }
  return undefined;
}

export function matchesHrefForIso(iso: string, timeZone: string, now = new Date()): string {
  const day = dayKeyForIso(iso, timeZone, now);
  if (day === "today") return "/matches";
  if (day) return `/matches?day=${day}`;
  return `/matches?iso=${iso}`;
}
