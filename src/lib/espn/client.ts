import { asArray, asString, isRecord } from "@/lib/espn/json";

const ESPN_SITE = "https://site.api.espn.com";
const ESPN_CORE = "https://sports.core.api.espn.com";
const ESPN_CONTENT = "https://content.core.api.espn.com";

async function espnGet(path: string, revalidate: number): Promise<unknown> {
  const url = path.startsWith("http") ? path : `${ESPN_SITE}${path}`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "footballscore/0.1",
    },
    next: { revalidate },
  });
  if (!response.ok) {
    throw new Error(`ESPN ${response.status} for ${url}`);
  }
  return response.json();
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
