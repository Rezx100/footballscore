export type MatchStatus = "ns" | "live" | "ht" | "ft" | "pp";

export type DayKey = "yesterday" | "today" | "tomorrow" | "thu";

export type Team = {
  id: string;
  name: string;
  short: string;
  color: string;
};

export type Match = {
  id: string;
  home: Team;
  away: Team;
  status: MatchStatus;
  minute?: string;
  homeScore?: number;
  awayScore?: number;
  kickoff: string;
  hasTv?: boolean;
};

export type LeagueGroup = {
  id: string;
  name: string;
  country: string;
  flag: "us" | "eng" | "esp" | "ita";
  matches: Match[];
};
