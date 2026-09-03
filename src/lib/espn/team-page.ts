import { fetchInjuries, fetchNews, fetchRoster, fetchSchedule, fetchStandings, fetchTeam } from "@/lib/espn/client";
import { mapNewsFeed } from "@/lib/espn/map-news";
import { mapV2Standings } from "@/lib/espn/map-standings";
import { mapInjuries, mapRoster, mapSchedule, mapTeamProfile, type TeamProfile } from "@/lib/espn/map-team";
import { isInPlay } from "@/lib/matches";
import type { InjuryRow, Match, NewsItem, Prefs, SquadPlayer, StandingTable } from "@/lib/types";

export type TeamPage = {
  profile: TeamProfile;
  next?: Match;
  recent: Match[];
  upcoming: Match[];
  form: ("W" | "D" | "L")[];
  table?: StandingTable;
  squad: SquadPlayer[];
  coach?: string;
  injuries: InjuryRow[];
  news: NewsItem[];
};

function resultAgainst(match: Match, teamId: string): "W" | "D" | "L" | undefined {
  if (match.status !== "ft" || match.homeScore == null || match.awayScore == null) return undefined;
  const ours = match.home.id === teamId ? match.homeScore : match.awayScore;
  const theirs = match.home.id === teamId ? match.awayScore : match.homeScore;
  if (ours > theirs) return "W";
  if (ours < theirs) return "L";
  return "D";
}

export async function getTeamPage(league: string, id: string, prefs: Prefs): Promise<TeamPage | null> {
  const opts = { timeZone: prefs.tz, hour12: prefs.hour12 };
  const [teamRaw, rosterRaw, scheduleRaw, injuriesRaw, newsRaw, standingsRaw] = await Promise.all([
    fetchTeam(league, id),
    fetchRoster(league, id),
    fetchSchedule(league, id),
    fetchInjuries(league, id),
    fetchNews(league),
    fetchStandings(league),
  ]);
  const profile = mapTeamProfile(teamRaw, league, opts);
  if (!profile) return null;
  const schedule = mapSchedule(scheduleRaw, league, opts);
  const now = Date.now();
  const upcoming = schedule.filter((match) => new Date(match.kickoffIso).getTime() >= now || isInPlay(match));
  const recent = schedule
    .filter((match) => match.status === "ft" && new Date(match.kickoffIso).getTime() < now)
    .slice(-8)
    .reverse();
  const next = profile.next ?? upcoming.find((match) => isInPlay(match) || match.status === "ns");
  const form = recent
    .map((match) => resultAgainst(match, id))
    .filter((value): value is "W" | "D" | "L" => Boolean(value))
    .slice(0, 5);
  const tables = mapV2Standings(standingsRaw);
  const table = tables.find((item) => item.entries.some((row) => row.teamId === id)) ?? tables[0];
  const roster = mapRoster(rosterRaw);
  const news = mapNewsFeed(newsRaw, league).filter(
    (item) => item.teamIds.includes(id) || item.headline.toLowerCase().includes(profile.club.name.toLowerCase()),
  );
  return {
    profile,
    next: next ?? undefined,
    recent,
    upcoming: upcoming.filter((match) => match.id !== next?.id).slice(0, 12),
    form,
    table,
    squad: roster.players,
    coach: roster.coach,
    injuries: mapInjuries(injuriesRaw),
    news,
  };
}
