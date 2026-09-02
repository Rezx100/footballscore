import type { DayKey } from "@/lib/types";

export type TabId = "matches" | "news" | "leagues" | "following" | "more";

export type MatchesQuery = {
  day: DayKey;
  hide: boolean;
  q: string;
  tab: TabId;
  match: string | null;
  search: boolean;
};

const DAYS: DayKey[] = ["yesterday", "today", "tomorrow", "next"];
const TABS: TabId[] = ["matches", "news", "leagues", "following", "more"];

function parseDay(value: string | undefined): DayKey {
  if (value === "thu") return "next";
  return DAYS.includes(value as DayKey) ? (value as DayKey) : "today";
}

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
  };
}

export function matchesHref(query: Partial<MatchesQuery> & MatchesQuery): string {
  const params = new URLSearchParams();
  if (query.day !== "today") params.set("day", query.day);
  if (query.hide) params.set("hide", "1");
  if (query.q.trim()) params.set("q", query.q.trim());
  if (query.tab !== "matches") params.set("tab", query.tab);
  if (query.match) params.set("match", query.match);
  if (query.search && !query.q.trim()) params.set("search", "1");
  const qs = params.toString();
  return qs ? `/matches?${qs}` : "/matches";
}
