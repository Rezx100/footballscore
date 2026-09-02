import type { DayKey, LeagueGroup, Match, Team } from "@/lib/types";

const team = (
  id: string,
  name: string,
  short: string,
  color: string,
): Team => ({ id, name, short, color });

const seattle = team("sea", "Seattle Sounders", "SEA", "#5D9732");
const minnesota = team("min", "Minnesota", "MIN", "#231F20");
const sunderland = team("sun", "Sunderland", "SUN", "#EB172B");
const everton = team("eve", "Everton", "EVE", "#003399");
const arsenal = team("ars", "Arsenal", "ARS", "#EF0107");
const chelsea = team("che", "Chelsea", "CHE", "#034694");
const tottenham = team("tot", "Tottenham", "TOT", "#132257");
const manUtd = team("mun", "Man United", "MUN", "#DA291C");
const oviedo = team("ovi", "Real Oviedo", "OVI", "#0033A0");
const osasuna = team("osa", "Osasuna", "OSA", "#D91A2A");
const sassuolo = team("sas", "Sassuolo", "SAS", "#00A651");
const genoa = team("gen", "Genoa", "GEN", "#C8102E");
const lazio = team("laz", "Lazio", "LAZ", "#87D8F7");
const cagliari = team("cag", "Cagliari", "CAG", "#AD1919");
const realMadrid = team("rma", "Real Madrid", "RMA", "#FEBE10");
const barcelona = team("bar", "Barcelona", "BAR", "#A50044");
const inter = team("int", "Inter", "INT", "#010E80");
const milan = team("mil", "Milan", "MIL", "#AC2B2B");
const liverpool = team("liv", "Liverpool", "LIV", "#C8102E");
const manCity = team("mci", "Man City", "MCI", "#6CABDD");

function match(partial: Match): Match {
  return partial;
}

export const DAY_LABELS: Record<DayKey, string> = {
  yesterday: "Yesterday",
  today: "Today",
  tomorrow: "Tomorrow",
  thu: "Thu 06",
};

export const DAY_ORDER: DayKey[] = ["yesterday", "today", "tomorrow", "thu"];

export const matchesByDay: Record<DayKey, LeagueGroup[]> = {
  today: [
    {
      id: "mls",
      name: "Major League Soccer",
      country: "United States",
      flag: "us",
      matches: [
        match({
          id: "sea-min",
          home: seattle,
          away: minnesota,
          status: "ns",
          kickoff: "10:45 AM",
          hasTv: true,
        }),
      ],
    },
    {
      id: "epl",
      name: "Premier League",
      country: "England",
      flag: "eng",
      matches: [
        match({
          id: "sun-eve",
          home: sunderland,
          away: everton,
          status: "ft",
          homeScore: 1,
          awayScore: 1,
          kickoff: "10:00 AM",
        }),
        match({
          id: "ars-che",
          home: arsenal,
          away: chelsea,
          status: "live",
          minute: "67'",
          homeScore: 2,
          awayScore: 1,
          kickoff: "12:30 PM",
          hasTv: true,
        }),
        match({
          id: "tot-mun",
          home: tottenham,
          away: manUtd,
          status: "ns",
          kickoff: "7:30 PM",
          hasTv: true,
        }),
      ],
    },
    {
      id: "laliga",
      name: "LaLiga",
      country: "Spain",
      flag: "esp",
      matches: [
        match({
          id: "ovi-osa",
          home: oviedo,
          away: osasuna,
          status: "ft",
          homeScore: 0,
          awayScore: 0,
          kickoff: "8:00 AM",
        }),
      ],
    },
    {
      id: "seriea",
      name: "Serie A",
      country: "Italy",
      flag: "ita",
      matches: [
        match({
          id: "sas-gen",
          home: sassuolo,
          away: genoa,
          status: "ft",
          homeScore: 1,
          awayScore: 2,
          kickoff: "9:00 AM",
        }),
        match({
          id: "laz-cag",
          home: lazio,
          away: cagliari,
          status: "ft",
          homeScore: 2,
          awayScore: 0,
          kickoff: "9:00 AM",
        }),
      ],
    },
  ],
  yesterday: [
    {
      id: "epl-y",
      name: "Premier League",
      country: "England",
      flag: "eng",
      matches: [
        match({
          id: "liv-mci",
          home: liverpool,
          away: manCity,
          status: "ft",
          homeScore: 2,
          awayScore: 2,
          kickoff: "12:30 PM",
        }),
        match({
          id: "che-tot",
          home: chelsea,
          away: tottenham,
          status: "ft",
          homeScore: 1,
          awayScore: 0,
          kickoff: "10:00 AM",
        }),
      ],
    },
    {
      id: "laliga-y",
      name: "LaLiga",
      country: "Spain",
      flag: "esp",
      matches: [
        match({
          id: "rma-bar",
          home: realMadrid,
          away: barcelona,
          status: "ft",
          homeScore: 3,
          awayScore: 2,
          kickoff: "3:00 PM",
        }),
      ],
    },
  ],
  tomorrow: [
    {
      id: "epl-t",
      name: "Premier League",
      country: "England",
      flag: "eng",
      matches: [
        match({
          id: "ars-liv",
          home: arsenal,
          away: liverpool,
          status: "ns",
          kickoff: "12:30 PM",
          hasTv: true,
        }),
        match({
          id: "mci-che",
          home: manCity,
          away: chelsea,
          status: "ns",
          kickoff: "3:00 PM",
        }),
      ],
    },
    {
      id: "seriea-t",
      name: "Serie A",
      country: "Italy",
      flag: "ita",
      matches: [
        match({
          id: "int-mil",
          home: inter,
          away: milan,
          status: "ns",
          kickoff: "2:45 PM",
          hasTv: true,
        }),
      ],
    },
  ],
  thu: [],
};

export function isFinished(match: Match): boolean {
  return match.status === "ft" || match.status === "pp";
}

export function groupIsFinished(group: LeagueGroup): boolean {
  return group.matches.length > 0 && group.matches.every(isFinished);
}
