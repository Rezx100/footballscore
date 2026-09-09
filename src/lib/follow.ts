export type FollowedTeam = { league: string; id: string };

export type FollowState = {
  leagues: string[];
  teams: FollowedTeam[];
  order: string[];
};

export const EMPTY_FOLLOW: FollowState = { leagues: [], teams: [], order: [] };
