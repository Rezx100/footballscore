import { asArray, asString, isRecord } from "@/lib/espn/json";

const ESPN_SITE = "https://site.api.espn.com";
const REVALIDATE_SECONDS = 30;

async function espnGet(path: string): Promise<unknown> {
  const url = path.startsWith("http") ? path : `${ESPN_SITE}${path}`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "footballscore/0.1",
    },
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!response.ok) {
    throw new Error(`ESPN ${response.status} for ${url}`);
  }
  return response.json();
}

export type HeaderLeagueJson = {
  slug: string;
  name: string;
  events: unknown[];
};

export async function fetchSoccerHeader(espnDate: string): Promise<HeaderLeagueJson[]> {
  const data = await espnGet(`/apis/v2/scoreboard/header?sport=soccer&dates=${espnDate}`);
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
  const chosen = (isRecord(light) ? light : isRecord(logos[0]) ? logos[0] : undefined);
  return chosen ? asString(chosen.href) : undefined;
}

export async function fetchScoreboard(slug: string, espnDate: string): Promise<ScoreboardJson | null> {
  try {
    const data = await espnGet(
      `/apis/site/v2/sports/soccer/${encodeURIComponent(slug)}/scoreboard?dates=${espnDate}`,
    );
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
  } catch {
    return null;
  }
}
