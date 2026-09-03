export function matchHref(id: string, league: string): string {
  const params = new URLSearchParams({ league });
  return `/match/${encodeURIComponent(id)}?${params.toString()}`;
}

export function leagueHref(slug: string, tab?: string): string {
  const path = `/league/${encodeURIComponent(slug)}`;
  if (!tab || tab === "now") return path;
  return `${path}?tab=${encodeURIComponent(tab)}`;
}

export function teamHref(league: string, id: string): string {
  return `/team/${encodeURIComponent(league)}/${encodeURIComponent(id)}`;
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

export function tabHref(tab: "matches" | "news" | "leagues" | "following" | "more"): string {
  if (tab === "matches") return "/matches";
  if (tab === "news") return "/news";
  if (tab === "leagues") return "/leagues";
  if (tab === "following") return "/following";
  return "/more";
}
