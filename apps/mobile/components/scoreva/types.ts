/**
 * Local domain types for `components/scoreva` and `screens/`.
 *
 * `@/lib/types` did not exist at the time these components were written. These types match
 * the shape specified for that module exactly, so once it lands, every file in this folder
 * can switch to `import type { ... } from '@/lib/types'` with no prop-shape changes.
 */

export type MatchStatus = 'ns' | 'live' | 'ht' | 'ft' | 'pp' | 'ab';

export interface Team {
  id: string;
  name: string;
  short: string;
  color: string;
  logo?: string;
}

export interface Match {
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
}
