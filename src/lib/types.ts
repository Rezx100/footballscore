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
  leagueId: string;
  leagueName?: string;
  home: Team;
  away: Team;
  status: MatchStatus;
  minute?: string;
  homeScore?: number;
  awayScore?: number;
  kickoff: string;
  kickoffIso: string;
  hasTv?: boolean;
  broadcast?: string;
  round?: string;
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

export type TimelineKind = "goal" | "card" | "sub" | "comment" | "other";

export type TimelineItem = {
  id: string;
  clock?: string;
  text: string;
  kind: TimelineKind;
  key: boolean;
  teamId?: string;
  wallclock?: string;
  clockValue?: number;
};

export type LineupPlayer = {
  id: string;
  name: string;
  jersey?: string;
  position?: string;
  starter: boolean;
  formationPlace?: number;
  headshot?: string;
};

export type LineupSide = {
  team: Team;
  homeAway: "home" | "away";
  formation?: string;
  players: LineupPlayer[];
};

export type DualStat = {
  key: string;
  label: string;
  home: string;
  away: string;
  homeValue?: number;
  awayValue?: number;
  pct?: boolean;
};

export type StandingNote = {
  color: string;
  description: string;
};

export type StandingRow = {
  teamId: string;
  teamName: string;
  teamShort: string;
  logo?: string;
  rank: number;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  gf: number;
  ga: number;
  gd: number;
  pts: number;
  note?: StandingNote;
};

export type StandingTable = {
  name: string;
  entries: StandingRow[];
};

export type FormResult = "W" | "D" | "L";

export type FormGame = {
  result: FormResult;
  opponent?: string;
  score?: string;
  date?: string;
};

export type FormSide = {
  teamId: string;
  teamName: string;
  games: FormGame[];
};

export type SeriesEvent = {
  id: string;
  date?: string;
  summary: string;
  homeName: string;
  awayName: string;
  homeScore?: string;
  awayScore?: string;
};

export type SeasonSeries = {
  title: string;
  summary: string;
  events: SeriesEvent[];
};

export type VenueInfo = {
  name?: string;
  city?: string;
  country?: string;
  attendance?: number;
  referee?: string;
};

export type NewsItem = {
  id: string;
  headline: string;
  description?: string;
  byline?: string;
  published: string;
  image?: string;
  leagueSlug?: string;
  teamIds: string[];
};

export type NewsArticle = NewsItem & {
  storyHtml?: string;
  related: NewsItem[];
};

export type CatalogLeague = {
  slug: string;
  name: string;
  displayName: string;
  abbreviation?: string;
  country?: string;
  isTournament?: boolean;
  $ref: string;
};

export type Club = {
  id: string;
  leagueId: string;
  name: string;
  short: string;
  color: string;
  logo?: string;
};

export type SquadPlayer = {
  id: string;
  name: string;
  jersey?: string;
  position: string;
  positionGroup: string;
  age?: number;
  headshot?: string;
};

export type InjuryRow = {
  id: string;
  name: string;
  status?: string;
  detail?: string;
};

export type Prefs = {
  tz: string;
  hour12: boolean;
  hideFinished: boolean;
  startTab: "matches" | "news" | "leagues" | "following";
  tzOverride: boolean;
};
