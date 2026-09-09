/**
 * Inline mock data for screen previews. Prefer `@/lib/demo` once it exists — these mocks
 * exist only so `apps/mobile/screens/*` render standalone before Grok's data layer lands.
 */
import type { Match, StandingsRow, Team } from '@/components/scoreva';

function team(id: string, name: string, short: string, color: string): Team {
  return { id, name, short, color };
}

export const TEAMS = {
  arsenal: team('arsenal', 'Arsenal', 'ARS', '#E23D3D'),
  chelsea: team('chelsea', 'Chelsea', 'CHE', '#1B5FA8'),
  city: team('city', 'City', 'CTY', '#6EC8E0'),
  united: team('united', 'United', 'UTD', '#D7FF3C'),
  liverpool: team('liverpool', 'Liverpool', 'LIV', '#E6B84A'),
  villa: team('villa', 'Villa', 'AVL', '#8B5CF6'),
  spurs: team('spurs', 'Spurs', 'TOT', '#6EC8E0'),
  newcastle: team('newcastle', 'Newcastle', 'NEW', '#F3F0E8'),
};

export const HERO_MATCH: Match = {
  id: 'm-hero',
  leagueId: 'pl',
  leagueName: 'Premier League',
  home: TEAMS.arsenal,
  away: TEAMS.chelsea,
  status: 'live',
  minute: 67,
  homeScore: 2,
  awayScore: 1,
  kickoffIso: new Date().toISOString(),
};

export const MOCK_MATCHES: Match[] = [
  HERO_MATCH,
  {
    id: 'm-2',
    leagueId: 'pl',
    leagueName: 'Premier League',
    home: TEAMS.city,
    away: TEAMS.united,
    status: 'ft',
    homeScore: 0,
    awayScore: 0,
    kickoffIso: new Date(Date.now() - 3 * 3600_000).toISOString(),
  },
  {
    id: 'm-3',
    leagueId: 'pl',
    leagueName: 'Premier League',
    home: TEAMS.liverpool,
    away: TEAMS.villa,
    status: 'ft',
    homeScore: 3,
    awayScore: 1,
    kickoffIso: new Date(Date.now() - 5 * 3600_000).toISOString(),
  },
  {
    id: 'm-4',
    leagueId: 'pl',
    leagueName: 'Premier League',
    home: TEAMS.spurs,
    away: TEAMS.newcastle,
    status: 'ns',
    kickoffIso: new Date(Date.now() + 2 * 3600_000).toISOString(),
  },
];

export const STANDINGS: StandingsRow[] = [
  { position: 1, team: TEAMS.city, played: 6, won: 5, drawn: 1, lost: 0, goalDifference: 12, points: 16, zoneColor: '#6EC8E0' },
  { position: 2, team: TEAMS.arsenal, played: 6, won: 4, drawn: 2, lost: 0, goalDifference: 9, points: 14, followed: true, zoneColor: '#6EC8E0' },
  { position: 3, team: TEAMS.liverpool, played: 6, won: 4, drawn: 1, lost: 1, goalDifference: 7, points: 13, zoneColor: '#6EC8E0' },
  { position: 4, team: TEAMS.united, played: 6, won: 3, drawn: 2, lost: 1, goalDifference: 4, points: 11, zoneColor: '#6EC8E0' },
  { position: 5, team: TEAMS.chelsea, played: 6, won: 3, drawn: 1, lost: 2, goalDifference: 2, points: 10 },
  { position: 6, team: TEAMS.villa, played: 6, won: 2, drawn: 2, lost: 2, goalDifference: 0, points: 8 },
  { position: 7, team: TEAMS.spurs, played: 6, won: 2, drawn: 1, lost: 3, goalDifference: -2, points: 7 },
  { position: 8, team: TEAMS.newcastle, played: 6, won: 0, drawn: 2, lost: 4, goalDifference: -9, points: 2, zoneColor: '#E23D3D' },
];

export const TIMELINE_EVENTS = [
  { id: 'e-1', minute: 67, type: 'goal' as const, text: "Saka scores, assisted by Ødegaard" },
  { id: 'e-2', minute: 58, type: 'yellow-card' as const, text: 'Caicedo booked for a late challenge' },
  { id: 'e-3', minute: 41, type: 'goal' as const, text: 'Palmer equalises from the penalty spot' },
  { id: 'e-4', minute: 35, type: 'substitution' as const, text: 'Jesus off, Havertz on' },
  { id: 'e-5', minute: 12, type: 'goal' as const, text: 'Ødegaard opens the scoring' },
];

export const FORMATION_PLAYERS = [
  { id: 'p-1', number: 1, initials: 'RA', x: 0.05, y: 0.5 },
  { id: 'p-2', number: 2, initials: 'WH', x: 0.22, y: 0.85 },
  { id: 'p-3', number: 3, initials: 'GA', x: 0.22, y: 0.62 },
  { id: 'p-4', number: 4, initials: 'SA', x: 0.22, y: 0.38 },
  { id: 'p-5', number: 5, initials: 'TI', x: 0.22, y: 0.15 },
  { id: 'p-6', number: 6, initials: 'PA', x: 0.45, y: 0.65 },
  { id: 'p-7', number: 7, initials: 'RI', x: 0.45, y: 0.5 },
  { id: 'p-8', number: 8, initials: 'OD', x: 0.45, y: 0.35 },
  { id: 'p-9', number: 9, initials: 'SK', x: 0.72, y: 0.8 },
  { id: 'p-10', number: 10, initials: 'JE', x: 0.72, y: 0.5 },
  { id: 'p-11', number: 11, initials: 'MA', x: 0.72, y: 0.2 },
];

export const DUAL_STATS = [
  { label: 'Possession', homeValue: 58, awayValue: 42, format: (n: number) => `${n}%` },
  { label: 'Shots', homeValue: 11, awayValue: 7 },
  { label: 'Shots on target', homeValue: 6, awayValue: 3 },
  { label: 'Corners', homeValue: 5, awayValue: 4 },
];

export function buildDateRailDays(activeIndex = 3) {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - 3 + i);
    return {
      iso: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString([], { weekday: 'short' }),
      day: String(d.getDate()).padStart(2, '0'),
      liveCount: i === activeIndex ? 1 : 0,
    };
  });
}
