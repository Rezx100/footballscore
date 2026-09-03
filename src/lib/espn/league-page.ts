import { espnDateForDay, isoToEspnDate } from "@/lib/dates";
import {
  fetchCoreLeague,
  fetchNews,
  fetchOnDayDates,
  fetchScoreboard,
  fetchStandings,
  fetchTeams,
} from "@/lib/espn/client";
import { displayNameForSlug, logoForSlug, regionForSlug } from "@/lib/espn/leagues";
import { mapNewsFeed } from "@/lib/espn/map-news";
import { mapV2Standings } from "@/lib/espn/map-standings";
import { mapTeamsList } from "@/lib/espn/map-team";
import { mapEvent } from "@/lib/espn/map";
import { asArray, asString, isRecord } from "@/lib/espn/json";
import type { Club, Match, NewsItem, Prefs, StandingTable } from "@/lib/types";

export type LeagueMeta = {
  slug: string;
  name: string;
  country: string;
  logo?: string;
  isTournament?: boolean;
};

export type LeaguePage = {
  meta: LeagueMeta;
  live: Match[];
  today: Match[];
  tables: StandingTable[];
  clubs: Club[];
  news: NewsItem[];
  fixtureDates: string[];
  fixtures: Match[];
  leadersFailed: boolean;
};

async function leagueMeta(slug: string): Promise<LeagueMeta> {
  const region = regionForSlug(slug);
  const core = await fetchCoreLeague(slug);
  const nameFromCore = isRecord(core)
    ? asString(core.shortName) ?? asString(core.abbreviation) ?? asString(core.displayName) ?? asString(core.name)
    : undefined;
  const logos = isRecord(core) ? asArray(core.logos) : [];
  const logoRec = logos.find(isRecord);
  const logo = logoRec ? asString(logoRec.href) : undefined;
  const countryValue = isRecord(core)
    ? typeof core.country === "string"
      ? core.country
      : asString(isRecord(core.country) ? core.country.name : undefined)
    : undefined;
  return {
    slug,
    name: displayNameForSlug(slug, nameFromCore ?? slug),
    country: countryValue || region.country,
    logo: logo ?? logoForSlug(slug),
    isTournament: isRecord(core) ? core.isTournament === true : undefined,
  };
}

function mapBoardMatches(
  board: { slug: string; name: string; events: unknown[] } | null,
  prefs: Prefs,
): Match[] {
  if (!board) return [];
  return board.events
    .map((event, index) =>
      mapEvent(event, `${board.slug}-${index}`, board.slug, {
        timeZone: prefs.tz,
        hour12: prefs.hour12,
        leagueName: board.name,
      }),
    )
    .filter((match): match is Match => Boolean(match));
}

export async function getLeaguePage(
  slug: string,
  prefs: Prefs,
  fixtureDate?: string,
  teamFilter?: string,
): Promise<LeaguePage> {
  const todayEspn = espnDateForDay("today", new Date(), prefs.tz);
  const [meta, standingsRaw, teamsRaw, newsRaw, ondays, todayBoard] = await Promise.all([
    leagueMeta(slug),
    fetchStandings(slug),
    fetchTeams(slug),
    fetchNews(slug),
    fetchOnDayDates(slug),
    fetchScoreboard(slug, todayEspn),
  ]);

  const tables = mapV2Standings(standingsRaw);
  const clubs = mapTeamsList(teamsRaw, slug);
  const news = mapNewsFeed(newsRaw, slug);
  const today = mapBoardMatches(todayBoard, prefs);
  const live = today.filter((match) => match.status === "live" || match.status === "ht");

  const upcoming = ondays
    .map((iso) => isoToEspnDate(iso))
    .filter((date, index, all) => all.indexOf(date) === index);
  const selected = fixtureDate && upcoming.includes(fixtureDate.replaceAll("-", ""))
    ? fixtureDate.replaceAll("-", "")
    : upcoming.find((date) => date >= todayEspn) ?? upcoming[0] ?? todayEspn;

  const fixtureBoard = selected === todayEspn ? todayBoard : await fetchScoreboard(slug, selected);
  let fixtures = mapBoardMatches(fixtureBoard, prefs);
  if (teamFilter) {
    fixtures = fixtures.filter((match) => match.home.id === teamFilter || match.away.id === teamFilter);
  }

  return {
    meta,
    live,
    today,
    tables,
    clubs,
    news,
    fixtureDates: upcoming,
    fixtures,
    leadersFailed: true,
  };
}

export async function getLeagueFixtures(
  slug: string,
  espnDate: string,
  prefs: Prefs,
): Promise<Match[]> {
  const board = await fetchScoreboard(slug, espnDate);
  return mapBoardMatches(board, prefs);
}
