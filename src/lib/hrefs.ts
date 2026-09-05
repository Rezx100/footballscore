export function matchHref(id: string, league: string): string {
  const params = new URLSearchParams({ league });
  return `/match/${encodeURIComponent(id)}?${params.toString()}`;
}

export function leagueHref(slug: string, tab?: string): string {
  const path = `/league/${encodeURIComponent(slug)}`;
  if (!tab || tab === "now") return path;
  return `${path}?tab=${encodeURIComponent(tab)}`;
}

export function teamHref(league: string, id: string, tab?: string): string {
  const path = `/team/${encodeURIComponent(league)}/${encodeURIComponent(id)}`;
  if (!tab || tab === "general") return path;
  return `${path}?tab=${encodeURIComponent(tab)}`;
}

export function liveHref(): string {
  return "/live";
}

export function searchHref(q?: string, tab?: string): string {
  const params = new URLSearchParams();
  if (q?.trim()) params.set("q", q.trim());
  if (tab && tab !== "trending") params.set("tab", tab);
  const qs = params.toString();
  return qs ? `/search?${qs}` : "/search";
}

export function calendarHref(): string {
  return "/calendar";
}

export function homeHref(day?: string): string {
  if (!day || day === "today") return "/";
  return `/?day=${encodeURIComponent(day)}`;
}

export function playerHref(id: string, league?: string, team?: string): string {
  const params = new URLSearchParams();
  if (league) params.set("league", league);
  if (team) params.set("team", team);
  const qs = params.toString();
  return qs ? `/player/${encodeURIComponent(id)}?${qs}` : `/player/${encodeURIComponent(id)}`;
}

export function newsHref(id: string): string {
  return `/news/${encodeURIComponent(id)}`;
}

export function tabHref(tab: "home" | "matches" | "news" | "leagues" | "following" | "more"): string {
  if (tab === "home") return "/";
  if (tab === "matches") return "/matches";
  if (tab === "news") return "/news";
  if (tab === "leagues") return "/leagues";
  if (tab === "following") return "/following";
  return "/more";
}
