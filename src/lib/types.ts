export type MatchStatus = "ns" | "live" | "ht" | "ft" | "pp" | "ab";

export type DayKey = "yesterday" | "today" | "tomorrow" | "next";

export type Team = {
  id: string;
  name: string;
  short: string;
  color: string;
  logo?: string;
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
  kickoffIso: string;
  hasTv?: boolean;
};

export type LeagueGroup = {
  id: string;
  name: string;
  country: string;
  flag: string;
  logo?: string;
  priority: number;
  matches: Match[];
};
