export {
  mapPool,
  fetchSoccerHeader,
  fetchScoreboard,
  fetchSummary,
  fetchStandings,
  fetchTeams,
  fetchTeam,
  fetchRoster,
  fetchSchedule,
  fetchInjuries,
  fetchNews,
  fetchArticle,
  fetchLeaguesCatalog,
  fetchLeaders,
  fetchCoreLeague,
  fetchOnDayDates,
  fetchAthlete,
  type HeaderLeagueJson,
  type ScoreboardJson,
} from "@/lib/espn/client";

export { getCatalog, catalogByCountry } from "@/lib/espn/catalog";

export {
  FIRST_CLASS_LEAGUES,
  FIRST_CLASS_BY_SLUG,
  regionForSlug,
  displayNameForSlug,
  logoForSlug,
  priorityForSlug,
  type FirstClassLeague,
} from "@/lib/espn/leagues";

export { getMatchesForDay, type MatchesLoad } from "@/lib/espn/matches";

export {
  mapEvent,
  eventOnDay,
  emptyGroup,
  upsertMatch,
  finalizeGroups,
} from "@/lib/espn/map";

export { getFirstClassClubs, getFollowedClubs } from "@/lib/espn/explore";

export {
  getLeaguePage,
  getLeagueFixtures,
  type LeagueMeta,
  type LeaguePage,
} from "@/lib/espn/league-page";

export { getMatchDetail } from "@/lib/espn/match-page";

export { getTeamPage, type TeamPage } from "@/lib/espn/team-page";

export { getPlayerPage, type PlayerPage } from "@/lib/espn/player-page";

export { getNewsIndex } from "@/lib/espn/news-page";

export { getArticle } from "@/lib/espn/article-page";

export { mapSummary, mapNewsArticles, storyLine, type MatchDetail } from "@/lib/espn/map-summary";

export {
  mapClub,
  mapTeamsList,
  mapTeamProfile,
  mapRoster,
  mapSchedule,
  mapInjuries,
  asTeam,
  type TeamProfile,
} from "@/lib/espn/map-team";

export { mapArticle, sortNews, mapNewsFeed } from "@/lib/espn/map-news";

export { mapStandingEntries, mapV2Standings } from "@/lib/espn/map-standings";
