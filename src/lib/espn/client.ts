import { asArray, asString, isRecord } from "@/lib/espn/json";

const ESPN_SITE = "https://site.api.espn.com";
const ESPN_SITE_WEB = "https://site.web.api.espn.com";
const ESPN_CORE = "https://sports.core.api.espn.com";
const ESPN_CONTENT = "https://content.core.api.espn.com";

const FETCH_MS = 4000;

const ESPN_HEADERS: Record<string, string> = {
  Accept: "application/json",
  "Accept-Language": "en-US,en;q=0.9",
  "User-Agent": "footballscore/0.1",
};

export async function mapPool<T, R>(
  items: readonly T[],
  limit: number,
  mapper: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  if (items.length === 0) return [];
  const out: R[] = new Array(items.length);
  let next = 0;
  async function worker() {
    while (true) {
      const index = next;
      next += 1;
      if (index >= items.length) return;
      out[index] = await mapper(items[index], index);
    }
  }
  const workers = Math.min(Math.max(1, limit), items.length);
  await Promise.all(Array.from({ length: workers }, () => worker()));
  return out;
}

function siteMirrors(url: string): string[] {
  if (url.startsWith(ESPN_SITE_WEB)) {
    return [url, `${ESPN_SITE}${url.slice(ESPN_SITE_WEB.length)}`];
  }
  if (url.startsWith(ESPN_SITE)) {
    return [url, `${ESPN_SITE_WEB}${url.slice(ESPN_SITE.length)}`];
  }
  return [url];
}

function resolveUrl(path: string): string {
  if (path.startsWith("http")) return path.replace(/^http:\/\//, "https://");
  return `${ESPN_SITE_WEB}${path}`;
}

async function espnGetOnce(url: string, revalidate: number): Promise<unknown> {
  const response = await fetch(url, {
    headers: ESPN_HEADERS,
    signal: AbortSignal.timeout(FETCH_MS),
    next: { revalidate },
  });
  if (!response.ok) {
    throw new Error(`ESPN ${response.status} for ${url}`);
  }
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("json")) {
    throw new Error(`ESPN non-JSON for ${url}`);
  }
  return response.json();
}

async function espnGet(path: string, revalidate: number): Promise<unknown> {
  const urls = siteMirrors(resolveUrl(path));
  let last: unknown;
  for (const url of urls) {
    try {
      return await espnGetOnce(url, revalidate);
    } catch (error) {
      last = error;
    }
  }
  throw last instanceof Error ? last : new Error(`ESPN fetch failed for ${path}`);
}

async function espnGetOrNull(path: string, revalidate: number): Promise<unknown | null> {
  try {
    return await espnGet(path, revalidate);
  } catch {
    return null;
  }
}

function soccerPath(slug: string, rest: string): string {
  return `/apis/site/v2/sports/soccer/${encodeURIComponent(slug)}${rest}`;
}

export type HeaderLeagueJson = {
  slug: string;
  name: string;
  events: unknown[];
};

export async function fetchSoccerHeader(espnDate: string): Promise<HeaderLeagueJson[]> {
  const data = await espnGet(`/apis/v2/scoreboard/header?sport=soccer&dates=${espnDate}`, 15);
  if (!isRecord(data)) return [];
  const sports = asArray(data.sports);
  const soccer = sports.find(isRecord) ?? sports[0];
  if (!isRecord(soccer)) return [];
  return asArray(soccer.leagues).flatMap((league) => {
    if (!isRecord(league)) return [];
    const slug = asString(league.slug);
    const name = asString(league.shortName) ?? asString(league.name);
    if (!slug || !name) return [];
    return [{ slug, name, events: asArray(league.events) }];
  });
}

export type ScoreboardJson = {
  slug: string;
  name: string;
  logo?: string;
  events: unknown[];
};

function leagueLogo(league: Record<string, unknown>): string | undefined {
  const logos = asArray(league.logos);
  const light = logos.find((logo) => {
    if (!isRecord(logo)) return false;
    const rel = asArray(logo.rel).map(asString);
    return !rel.includes("dark");
  });
  const chosen = isRecord(light) ? light : isRecord(logos[0]) ? logos[0] : undefined;
  return chosen ? asString(chosen.href) : undefined;
}

export async function fetchScoreboard(slug: string, espnDate?: string): Promise<ScoreboardJson | null> {
  const dates = espnDate ? `?dates=${espnDate}` : "";
  const data = await espnGetOrNull(soccerPath(slug, `/scoreboard${dates}`), 15);
  if (!isRecord(data)) return null;
  const league = asArray(data.leagues).find(isRecord);
  const name =
    asString(league?.abbreviation) ?? asString(league?.name) ?? asString(league?.midsizeName) ?? slug;
  return {
    slug: asString(league?.slug) ?? slug,
    name,
    logo: league ? leagueLogo(league) : undefined,
    events: asArray(data.events),
  };
}

export async function fetchSummary(slug: string, eventId: string): Promise<unknown | null> {
  return espnGetOrNull(soccerPath(slug, `/summary?event=${encodeURIComponent(eventId)}`), 15);
}

export async function fetchStandings(slug: string): Promise<unknown | null> {
  return espnGetOrNull(`/apis/v2/sports/soccer/${encodeURIComponent(slug)}/standings`, 60);
}

export async function fetchTeams(slug: string): Promise<unknown | null> {
  return espnGetOrNull(soccerPath(slug, "/teams"), 60);
}

export async function fetchTeam(slug: string, id: string): Promise<unknown | null> {
  return espnGetOrNull(soccerPath(slug, `/teams/${encodeURIComponent(id)}`), 60);
}

export async function fetchRoster(slug: string, id: string): Promise<unknown | null> {
  return espnGetOrNull(soccerPath(slug, `/teams/${encodeURIComponent(id)}/roster`), 60);
}

export async function fetchSchedule(slug: string, id: string): Promise<unknown | null> {
  return espnGetOrNull(soccerPath(slug, `/teams/${encodeURIComponent(id)}/schedule`), 60);
}

export async function fetchInjuries(slug: string, id: string): Promise<unknown | null> {
  return espnGetOrNull(soccerPath(slug, `/teams/${encodeURIComponent(id)}/injuries`), 60);
}

export async function fetchNews(slug: string): Promise<unknown | null> {
  return espnGetOrNull(soccerPath(slug, "/news"), 300);
}

export async function fetchArticle(id: string): Promise<unknown | null> {
  return espnGetOrNull(`${ESPN_CONTENT}/v1/sports/news/${encodeURIComponent(id)}`, 300);
}

export async function fetchLeaguesCatalog(): Promise<unknown | null> {
  return espnGetOrNull(`${ESPN_CORE}/v2/sports/soccer/leagues?limit=1000`, 86400);
}

export async function fetchLeaders(slug: string): Promise<unknown | null> {
  return espnGetOrNull(`${ESPN_CORE}/v2/sports/soccer/leagues/${encodeURIComponent(slug)}/leaders`, 60);
}

export async function fetchCoreLeague(slug: string): Promise<unknown | null> {
  return espnGetOrNull(`${ESPN_CORE}/v2/sports/soccer/leagues/${encodeURIComponent(slug)}`, 86400);
}

export async function fetchOnDayDates(slug: string): Promise<string[]> {
  const calendar = await espnGetOrNull(
    `${ESPN_CORE}/v2/sports/soccer/leagues/${encodeURIComponent(slug)}/calendar`,
    3600,
  );
  if (!isRecord(calendar)) return [];
  const ondays = asArray(calendar.items)
    .map((item) => (isRecord(item) ? asString(item.$ref) : undefined))
    .find((ref) => ref?.includes("ondays"));
  if (!ondays) return [];
  const data = await espnGetOrNull(ondays.replace(/^http:/, "https:"), 3600);
  if (!isRecord(data)) return [];
  const eventDate = isRecord(data.eventDate) ? data.eventDate : undefined;
  return asArray(eventDate?.dates).map(asString).filter((value): value is string => Boolean(value));
}

export async function fetchAthlete(id: string): Promise<unknown | null> {
  return espnGetOrNull(`${ESPN_CORE}/v2/sports/soccer/athletes/${encodeURIComponent(id)}`, 300);
}
