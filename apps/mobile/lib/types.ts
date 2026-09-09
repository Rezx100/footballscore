export type MatchStatus = 'ns' | 'live' | 'ht' | 'ft' | 'pp' | 'ab';

export type Team = {
  id: string;
  name: string;
  short: string;
  color: string;
  logo?: string;
  country?: string;
};

export type Match = {
  id: string;
  leagueId: string;
  leagueName?: string;
  home: Team;
  away: Team;
  status: MatchStatus;
  minute?: number;
  homeScore?: number;
  awayScore?: number;
  kickoffIso: string;
  round?: string;
  venue?: string;
  referee?: string;
};

export type Competition = {
  id: string;
  name: string;
  country: string;
  short: string;
  color: string;
  season: string;
};

export type Player = {
  id: string;
  name: string;
  shortName: string;
  teamId: string;
  position: string;
  shirt: number;
  nationality?: string;
  age?: number;
  goals?: number;
  assists?: number;
  apps?: number;
  rating?: number;
  yellows?: number;
  reds?: number;
};

export type TimelineKind = 'goal' | 'yellow-card' | 'red-card' | 'substitution' | 'var' | 'comment' | 'other';

export type TimelineEvent = {
  id: string;
  minute: number;
  type: TimelineKind;
  text: string;
  side?: 'home' | 'away';
  playerId?: string;
  assistId?: string;
  key?: boolean;
};

export type CommentaryLine = {
  id: string;
  minute?: number;
  text: string;
  key?: boolean;
};

export type LineupPlayer = {
  id: string;
  name: string;
  initials: string;
  number: number;
  position: string;
  starter: boolean;
  x: number;
  y: number;
  rating?: number;
};

export type LineupSide = {
  team: Team;
  formation: string;
  players: LineupPlayer[];
};

export type DualStat = {
  label: string;
  homeValue: number;
  awayValue: number;
  format?: (n: number) => string;
};

export type StandingRow = {
  position: number;
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  goalDifference: number;
  points: number;
  form: Array<'W' | 'D' | 'L'>;
  followed?: boolean;
  zoneColor?: string;
};

export type HeadToHead = {
  summary: string;
  events: Array<{
    id: string;
    date: string;
    homeName: string;
    awayName: string;
    homeScore: number;
    awayScore: number;
  }>;
};

export type MatchDetail = {
  match: Match;
  events: TimelineEvent[];
  commentary: CommentaryLine[];
  homeLineup: LineupSide;
  awayLineup: LineupSide;
  stats: DualStat[];
  table: StandingRow[];
  h2h: HeadToHead;
  ratings: Array<{ playerId: string; name: string; teamId: string; rating: number }>;
};

export type SearchHit = {
  id: string;
  kind: 'team' | 'competition' | 'player' | 'match';
  title: string;
  subtitle: string;
  color?: string;
  short?: string;
};

export type NotificationKind =
  | 'kickoff'
  | 'goal'
  | 'card'
  | 'sub'
  | 'ht'
  | 'ft'
  | 'lineup'
  | 'var';

export type NotificationItem = {
  id: string;
  kind: NotificationKind;
  text: string;
  time: string;
  matchId?: string;
  delayed?: boolean;
};

export type FollowState = {
  teams: string[];
  competitions: string[];
  matches: string[];
};

export type AppPrefs = {
  onboardingDone: boolean;
  scheme: 'dark' | 'light' | 'system';
  spoiler: boolean;
  delayMinutes: number;
  hour12: boolean;
  tz: string;
  hideFinished: boolean;
  notifications: Record<NotificationKind, boolean>;
};

export type DataSource = 'demo' | 'espn' | 'api-football';
