import { dayKey } from '../dates';
import type {
  CommentaryLine,
  Competition,
  HeadToHead,
  LineupPlayer,
  Match,
  MatchDetail,
  NotificationItem,
  Player,
  SearchHit,
  StandingRow,
  Team,
  TimelineEvent,
} from '../types';

function team(id: string, name: string, short: string, color: string, country?: string): Team {
  return { id, name, short, color, country };
}

export const TEAMS: Record<string, Team> = {
  arsenal: team('arsenal', 'Arsenal', 'ARS', '#EF0107', 'England'),
  chelsea: team('chelsea', 'Chelsea', 'CHE', '#034694', 'England'),
  liverpool: team('liverpool', 'Liverpool', 'LIV', '#C8102E', 'England'),
  city: team('city', 'Manchester City', 'MCI', '#6CABDD', 'England'),
  united: team('united', 'Manchester United', 'MUN', '#DA291C', 'England'),
  tottenham: team('tottenham', 'Tottenham', 'TOT', '#132257', 'England'),
  newcastle: team('newcastle', 'Newcastle', 'NEW', '#241F20', 'England'),
  villa: team('villa', 'Aston Villa', 'AVL', '#670E36', 'England'),
  barcelona: team('barcelona', 'Barcelona', 'BAR', '#A50044', 'Spain'),
  madrid: team('madrid', 'Real Madrid', 'RMA', '#FEBE10', 'Spain'),
  atletico: team('atletico', 'Atlético', 'ATL', '#CB3524', 'Spain'),
  bayern: team('bayern', 'Bayern', 'BAY', '#DC052D', 'Germany'),
  dortmund: team('dortmund', 'Dortmund', 'BVB', '#FDE100', 'Germany'),
  inter: team('inter', 'Inter', 'INT', '#010E80', 'Italy'),
  juventus: team('juventus', 'Juventus', 'JUV', '#F3F0E8', 'Italy'),
  milan: team('milan', 'Milan', 'MIL', '#FB090B', 'Italy'),
  psg: team('psg', 'Paris SG', 'PSG', '#004170', 'France'),
  marseille: team('marseille', 'Marseille', 'OM', '#2FA8E0', 'France'),
  ajax: team('ajax', 'Ajax', 'AJA', '#D2122E', 'Netherlands'),
  intermiami: team('intermiami', 'Inter Miami', 'MIA', '#F7B5CD', 'USA'),
  atlanta: team('atlanta', 'Atlanta United', 'ATL', '#80000A', 'USA'),
};

export const COMPETITIONS: Competition[] = [
  { id: 'pl', name: 'Premier League', country: 'England', short: 'PL', color: '#3D195B', season: '2025/26' },
  { id: 'ucl', name: 'Champions League', country: 'Europe', short: 'UCL', color: '#0E1B4D', season: '2025/26' },
  { id: 'll', name: 'La Liga', country: 'Spain', short: 'LL', color: '#EE8707', season: '2025/26' },
  { id: 'sa', name: 'Serie A', country: 'Italy', short: 'SA', color: '#024494', season: '2025/26' },
  { id: 'bl', name: 'Bundesliga', country: 'Germany', short: 'BL', color: '#D20515', season: '2025/26' },
  { id: 'l1', name: 'Ligue 1', country: 'France', short: 'L1', color: '#091C3E', season: '2025/26' },
  { id: 'mls', name: 'MLS', country: 'USA', short: 'MLS', color: '#E31837', season: '2026' },
  { id: 'ered', name: 'Eredivisie', country: 'Netherlands', short: 'ERE', color: '#F36C21', season: '2025/26' },
];

function kickoffMinutesAgo(minutes: number): string {
  return new Date(Date.now() - minutes * 60_000).toISOString();
}

function kickoffIn(minutes: number): string {
  return new Date(Date.now() + minutes * 60_000).toISOString();
}

function match(
  id: string,
  leagueId: string,
  home: Team,
  away: Team,
  status: Match['status'],
  kickoffIso: string,
  extra: Partial<Match> = {},
): Match {
  const league = COMPETITIONS.find((c) => c.id === leagueId);
  return {
    id,
    leagueId,
    leagueName: league?.name,
    home,
    away,
    status,
    kickoffIso,
    ...extra,
  };
}

export const MATCHES: Match[] = [
  match('m-ars-che', 'pl', TEAMS.arsenal, TEAMS.chelsea, 'live', kickoffMinutesAgo(67), {
    homeScore: 2,
    awayScore: 1,
    minute: 67,
    venue: 'Emirates Stadium',
    referee: 'M. Oliver',
    round: 'Matchweek 7',
  }),
  match('m-liv-mci', 'pl', TEAMS.liverpool, TEAMS.city, 'live', kickoffMinutesAgo(23), {
    homeScore: 1,
    awayScore: 1,
    minute: 23,
    venue: 'Anfield',
    round: 'Matchweek 7',
  }),
  match('m-tot-new', 'pl', TEAMS.tottenham, TEAMS.newcastle, 'ns', kickoffIn(95), {
    venue: 'Tottenham Hotspur Stadium',
    round: 'Matchweek 7',
  }),
  match('m-avl-mun', 'pl', TEAMS.villa, TEAMS.united, 'ft', kickoffMinutesAgo(280), {
    homeScore: 1,
    awayScore: 0,
    venue: 'Villa Park',
    round: 'Matchweek 7',
  }),
  match('m-bar-rma', 'll', TEAMS.barcelona, TEAMS.madrid, 'ht', kickoffMinutesAgo(52), {
    homeScore: 0,
    awayScore: 0,
    venue: 'Spotify Camp Nou',
    round: 'Matchweek 7',
  }),
  match('m-atm-bar', 'll', TEAMS.atletico, TEAMS.barcelona, 'ns', kickoffIn(26 * 60), {
    venue: 'Metropolitano',
    round: 'Matchweek 8',
  }),
  match('m-int-juv', 'sa', TEAMS.inter, TEAMS.juventus, 'ft', kickoffMinutesAgo(310), {
    homeScore: 2,
    awayScore: 0,
    venue: 'San Siro',
    round: 'Matchweek 6',
  }),
  match('m-bay-bvb', 'bl', TEAMS.bayern, TEAMS.dortmund, 'ns', kickoffIn(180), {
    venue: 'Allianz Arena',
    round: 'Matchweek 6',
  }),
  match('m-psg-om', 'l1', TEAMS.psg, TEAMS.marseille, 'ft', kickoffMinutesAgo(400), {
    homeScore: 3,
    awayScore: 1,
    venue: 'Parc des Princes',
    round: 'Matchweek 6',
  }),
  match('m-ars-bay', 'ucl', TEAMS.arsenal, TEAMS.bayern, 'ns', kickoffIn(48 * 60), {
    venue: 'Emirates Stadium',
    round: 'League phase · MD3',
  }),
  match('m-rma-int', 'ucl', TEAMS.madrid, TEAMS.inter, 'ft', kickoffMinutesAgo(26 * 60), {
    homeScore: 1,
    awayScore: 1,
    venue: 'Santiago Bernabéu',
    round: 'League phase · MD2',
  }),
  match('m-mia-atl', 'mls', TEAMS.intermiami, TEAMS.atlanta, 'ns', kickoffIn(8 * 60), {
    venue: 'Chase Stadium',
    round: 'Decision Day',
  }),
];

export const PLAYERS: Player[] = [
  { id: 'saka', name: 'Bukayo Saka', shortName: 'B. Saka', teamId: 'arsenal', position: 'Forward', shirt: 7, nationality: 'England', age: 24, goals: 6, assists: 4, apps: 7, rating: 7.8, yellows: 1, reds: 0 },
  { id: 'odegaard', name: 'Martin Ødegaard', shortName: 'Ødegaard', teamId: 'arsenal', position: 'Midfielder', shirt: 8, nationality: 'Norway', age: 26, goals: 3, assists: 5, apps: 7, rating: 7.6, yellows: 0, reds: 0 },
  { id: 'rice', name: 'Declan Rice', shortName: 'Rice', teamId: 'arsenal', position: 'Midfielder', shirt: 41, nationality: 'England', age: 26, goals: 2, assists: 1, apps: 7, rating: 7.4, yellows: 1, reds: 0 },
  { id: 'saliba', name: 'William Saliba', shortName: 'Saliba', teamId: 'arsenal', position: 'Defender', shirt: 2, nationality: 'France', age: 24, goals: 1, assists: 0, apps: 7, rating: 7.3, yellows: 1, reds: 0 },
  { id: 'raya', name: 'David Raya', shortName: 'Raya', teamId: 'arsenal', position: 'Goalkeeper', shirt: 1, nationality: 'Spain', age: 29, goals: 0, assists: 0, apps: 7, rating: 6.9, yellows: 0, reds: 0 },
  { id: 'havertz', name: 'Kai Havertz', shortName: 'Havertz', teamId: 'arsenal', position: 'Forward', shirt: 29, nationality: 'Germany', age: 26, goals: 4, assists: 2, apps: 6, rating: 7.1, yellows: 1, reds: 0 },
  { id: 'white', name: 'Ben White', shortName: 'White', teamId: 'arsenal', position: 'Defender', shirt: 4, nationality: 'England', age: 27, goals: 1, assists: 1, apps: 7, rating: 7.0, yellows: 1, reds: 0 },
  { id: 'gabriel', name: 'Gabriel Magalhães', shortName: 'Gabriel', teamId: 'arsenal', position: 'Defender', shirt: 6, nationality: 'Brazil', age: 27, goals: 1, assists: 0, apps: 7, rating: 7.1, yellows: 1, reds: 0 },
  { id: 'calafiori', name: 'Riccardo Calafiori', shortName: 'Calafiori', teamId: 'arsenal', position: 'Defender', shirt: 33, nationality: 'Italy', age: 23, goals: 0, assists: 1, apps: 5, rating: 6.9, yellows: 1, reds: 0 },
  { id: 'trossard', name: 'Leandro Trossard', shortName: 'Trossard', teamId: 'arsenal', position: 'Forward', shirt: 19, nationality: 'Belgium', age: 30, goals: 2, assists: 2, apps: 7, rating: 6.8, yellows: 0, reds: 0 },
  { id: 'martinelli', name: 'Gabriel Martinelli', shortName: 'Martinelli', teamId: 'arsenal', position: 'Forward', shirt: 11, nationality: 'Brazil', age: 24, goals: 2, assists: 2, apps: 6, rating: 7.3, yellows: 0, reds: 0 },
  { id: 'palmer', name: 'Cole Palmer', shortName: 'Palmer', teamId: 'chelsea', position: 'Forward', shirt: 20, nationality: 'England', age: 23, goals: 5, assists: 3, apps: 7, rating: 7.5, yellows: 1, reds: 0 },
  { id: 'caicedo', name: 'Moisés Caicedo', shortName: 'Caicedo', teamId: 'chelsea', position: 'Midfielder', shirt: 25, nationality: 'Ecuador', age: 23, goals: 1, assists: 1, apps: 7, rating: 7.0, yellows: 2, reds: 0 },
  { id: 'jackson', name: 'Nicolas Jackson', shortName: 'Jackson', teamId: 'chelsea', position: 'Forward', shirt: 15, nationality: 'Senegal', age: 24, goals: 3, assists: 1, apps: 6, rating: 6.8, yellows: 1, reds: 0 },
  { id: 'sanchez', name: 'Robert Sánchez', shortName: 'Sánchez', teamId: 'chelsea', position: 'Goalkeeper', shirt: 1, nationality: 'Spain', age: 27, goals: 0, assists: 0, apps: 7, rating: 6.4, yellows: 0, reds: 0 },
  { id: 'james', name: 'Reece James', shortName: 'James', teamId: 'chelsea', position: 'Defender', shirt: 24, nationality: 'England', age: 25, goals: 1, assists: 2, apps: 5, rating: 6.8, yellows: 1, reds: 0 },
  { id: 'colwill', name: 'Levi Colwill', shortName: 'Colwill', teamId: 'chelsea', position: 'Defender', shirt: 5, nationality: 'England', age: 22, goals: 0, assists: 0, apps: 7, rating: 6.7, yellows: 1, reds: 0 },
  { id: 'cucurella', name: 'Marc Cucurella', shortName: 'Cucurella', teamId: 'chelsea', position: 'Defender', shirt: 3, nationality: 'Spain', age: 27, goals: 0, assists: 1, apps: 7, rating: 6.9, yellows: 2, reds: 0 },
  { id: 'fernandez', name: 'Enzo Fernández', shortName: 'Fernández', teamId: 'chelsea', position: 'Midfielder', shirt: 8, nationality: 'Argentina', age: 24, goals: 2, assists: 2, apps: 7, rating: 6.8, yellows: 1, reds: 0 },
  { id: 'neto', name: 'Pedro Neto', shortName: 'Neto', teamId: 'chelsea', position: 'Forward', shirt: 7, nationality: 'Portugal', age: 25, goals: 2, assists: 2, apps: 6, rating: 6.7, yellows: 0, reds: 0 },
  { id: 'salah', name: 'Mohamed Salah', shortName: 'Salah', teamId: 'liverpool', position: 'Forward', shirt: 11, nationality: 'Egypt', age: 33, goals: 7, assists: 3, apps: 7, rating: 8.1, yellows: 0, reds: 0 },
  { id: 'haaland', name: 'Erling Haaland', shortName: 'Haaland', teamId: 'city', position: 'Forward', shirt: 9, nationality: 'Norway', age: 25, goals: 8, assists: 1, apps: 7, rating: 7.9, yellows: 0, reds: 0 },
  { id: 'yamal', name: 'Lamine Yamal', shortName: 'Yamal', teamId: 'barcelona', position: 'Forward', shirt: 19, nationality: 'Spain', age: 18, goals: 5, assists: 6, apps: 7, rating: 8.2, yellows: 0, reds: 0 },
  { id: 'mbappe', name: 'Kylian Mbappé', shortName: 'Mbappé', teamId: 'madrid', position: 'Forward', shirt: 9, nationality: 'France', age: 26, goals: 7, assists: 2, apps: 7, rating: 7.7, yellows: 1, reds: 0 },
];

function eleven(
  ids: Array<[id: string, number: number, initials: string, x: number, y: number, rating?: number]>,
): LineupPlayer[] {
  return ids.map(([id, number, initials, x, y, rating]) => {
    const p = PLAYERS.find((pl) => pl.id === id);
    return {
      id,
      name: p?.shortName ?? initials,
      initials,
      number,
      position: p?.position ?? 'Player',
      starter: true,
      x,
      y,
      rating,
    };
  });
}

const ARSENAL_XI = eleven([
  ['raya', 1, 'RA', 0.08, 0.5, 6.8],
  ['white', 4, 'WH', 0.24, 0.18, 7.0],
  ['saliba', 2, 'SA', 0.24, 0.38, 7.2],
  ['gabriel', 6, 'GA', 0.24, 0.62, 7.1],
  ['calafiori', 33, 'CA', 0.24, 0.82, 6.9],
  ['rice', 41, 'RI', 0.44, 0.5, 7.5],
  ['odegaard', 8, 'ØD', 0.58, 0.42, 8.1],
  ['trossard', 19, 'TR', 0.58, 0.22, 6.8],
  ['saka', 7, 'SK', 0.78, 0.82, 8.6],
  ['havertz', 29, 'KH', 0.82, 0.5, 7.0],
  ['martinelli', 11, 'MA', 0.78, 0.18, 7.3],
]);

const CHELSEA_XI = eleven([
  ['sanchez', 1, 'RS', 0.08, 0.5, 6.4],
  ['james', 24, 'RJ', 0.24, 0.18, 6.8],
  ['colwill', 5, 'LC', 0.24, 0.38, 6.7],
  ['foñana', 6, 'FO', 0.24, 0.62, 6.6],
  ['cucurella', 3, 'CU', 0.24, 0.82, 6.9],
  ['caicedo', 25, 'MC', 0.42, 0.42, 6.9],
  ['fernandez', 8, 'EF', 0.42, 0.62, 6.8],
  ['palmer', 20, 'CP', 0.62, 0.55, 7.8],
  ['neto', 7, 'PN', 0.78, 0.18, 6.7],
  ['jackson', 15, 'NJ', 0.82, 0.5, 6.4],
  ['madueke', 11, 'NM', 0.78, 0.82, 6.6],
]);

const ARSENAL_EVENTS: TimelineEvent[] = [
  { id: 'e1', minute: 67, type: 'goal', text: 'Saka finishes low to the far corner. Assisted by Ødegaard.', side: 'home', playerId: 'saka', assistId: 'odegaard', key: true },
  { id: 'e2', minute: 58, type: 'yellow-card', text: 'Caicedo booked for a late challenge on Rice.', side: 'away', playerId: 'caicedo', key: true },
  { id: 'e3', minute: 41, type: 'goal', text: 'Palmer equalises from the penalty spot.', side: 'away', playerId: 'palmer', key: true },
  { id: 'e4', minute: 35, type: 'substitution', text: 'Havertz on, Jesus off.', side: 'home', key: true },
  { id: 'e5', minute: 28, type: 'var', text: 'VAR: penalty check complete — no penalty.', side: 'home' },
  { id: 'e6', minute: 12, type: 'goal', text: 'Ødegaard opens from the edge of the box.', side: 'home', playerId: 'odegaard', key: true },
];

const ARSENAL_COMMENTARY: CommentaryLine[] = [
  { id: 'c1', minute: 67, text: 'Goal. Saka, right-footed, bottom far corner. Emirates lifts.', key: true },
  { id: 'c2', minute: 66, text: 'Ødegaard slips Saka in behind the right channel.' },
  { id: 'c3', minute: 63, text: 'Chelsea sit deeper. Palmer drops between the lines looking for a second.' },
  { id: 'c4', minute: 58, text: 'Yellow card, Caicedo. Late on Rice after the ball had gone.', key: true },
  { id: 'c5', minute: 52, text: 'Second half underway. No changes.' },
  { id: 'c6', minute: 45, text: 'Half-time. Arsenal 1–1 Chelsea.', key: true },
  { id: 'c7', minute: 41, text: 'Goal. Palmer, penalty, high to Raya’s left.', key: true },
  { id: 'c8', minute: 40, text: 'Penalty given after contact on Jackson. Raya was coming.' },
  { id: 'c9', minute: 28, text: 'VAR checks a possible penalty at the other end. No penalty.' },
  { id: 'c10', minute: 12, text: 'Goal. Ødegaard, first-time from 20 yards. 1–0.', key: true },
  { id: 'c11', minute: 1, text: 'Kick-off. Arsenal in red, Chelsea in white.' },
];

export const PL_TABLE: StandingRow[] = [
  { position: 1, team: TEAMS.liverpool, played: 7, won: 5, drawn: 1, lost: 1, gf: 14, ga: 6, goalDifference: 8, points: 16, form: ['W', 'W', 'D', 'W', 'L'], zoneColor: '#6EC8E0' },
  { position: 2, team: TEAMS.arsenal, played: 7, won: 5, drawn: 1, lost: 1, gf: 15, ga: 7, goalDifference: 8, points: 16, form: ['W', 'W', 'W', 'D', 'W'], followed: true, zoneColor: '#6EC8E0' },
  { position: 3, team: TEAMS.city, played: 7, won: 4, drawn: 2, lost: 1, gf: 16, ga: 8, goalDifference: 8, points: 14, form: ['W', 'D', 'W', 'W', 'D'], zoneColor: '#6EC8E0' },
  { position: 4, team: TEAMS.chelsea, played: 7, won: 4, drawn: 1, lost: 2, gf: 12, ga: 8, goalDifference: 4, points: 13, form: ['L', 'W', 'W', 'W', 'D'], zoneColor: '#6EC8E0' },
  { position: 5, team: TEAMS.tottenham, played: 7, won: 3, drawn: 2, lost: 2, gf: 11, ga: 9, goalDifference: 2, points: 11, form: ['D', 'W', 'L', 'W', 'D'] },
  { position: 6, team: TEAMS.villa, played: 7, won: 3, drawn: 2, lost: 2, gf: 9, ga: 8, goalDifference: 1, points: 11, form: ['W', 'L', 'W', 'D', 'W'] },
  { position: 7, team: TEAMS.united, played: 7, won: 3, drawn: 1, lost: 3, gf: 8, ga: 10, goalDifference: -2, points: 10, form: ['L', 'W', 'L', 'W', 'D'] },
  { position: 8, team: TEAMS.newcastle, played: 7, won: 2, drawn: 2, lost: 3, gf: 7, ga: 9, goalDifference: -2, points: 8, form: ['L', 'D', 'L', 'W', 'D'], zoneColor: '#E23D3D' },
];

const H2H_ARS_CHE: HeadToHead = {
  summary: 'Arsenal 3 · Draws 2 · Chelsea 1 in the last six',
  events: [
    { id: 'h1', date: '2025-04-23', homeName: 'Arsenal', awayName: 'Chelsea', homeScore: 2, awayScore: 1 },
    { id: 'h2', date: '2024-11-10', homeName: 'Chelsea', awayName: 'Arsenal', homeScore: 1, awayScore: 1 },
    { id: 'h3', date: '2024-04-23', homeName: 'Arsenal', awayName: 'Chelsea', homeScore: 2, awayScore: 2 },
    { id: 'h4', date: '2023-10-21', homeName: 'Chelsea', awayName: 'Arsenal', homeScore: 2, awayScore: 2 },
    { id: 'h5', date: '2023-05-02', homeName: 'Arsenal', awayName: 'Chelsea', homeScore: 3, awayScore: 1 },
    { id: 'h6', date: '2023-02-26', homeName: 'Chelsea', awayName: 'Arsenal', homeScore: 1, awayScore: 0 },
  ],
};

export const MATCH_DETAILS: Record<string, MatchDetail> = {
  'm-ars-che': {
    match: MATCHES[0]!,
    events: ARSENAL_EVENTS,
    commentary: ARSENAL_COMMENTARY,
    homeLineup: { team: TEAMS.arsenal, formation: '4-3-3', players: ARSENAL_XI },
    awayLineup: { team: TEAMS.chelsea, formation: '4-2-3-1', players: CHELSEA_XI },
    stats: [
      { label: 'Possession', homeValue: 58, awayValue: 42, format: (n) => `${n}%` },
      { label: 'Shots', homeValue: 14, awayValue: 8 },
      { label: 'Shots on target', homeValue: 7, awayValue: 3 },
      { label: 'Expected goals', homeValue: 1.9, awayValue: 0.8, format: (n) => n.toFixed(1) },
      { label: 'Corners', homeValue: 6, awayValue: 3 },
      { label: 'Fouls', homeValue: 8, awayValue: 11 },
      { label: 'Pass accuracy', homeValue: 88, awayValue: 84, format: (n) => `${n}%` },
    ],
    table: PL_TABLE,
    h2h: H2H_ARS_CHE,
    ratings: [
      { playerId: 'saka', name: 'B. Saka', teamId: 'arsenal', rating: 8.6 },
      { playerId: 'odegaard', name: 'Ødegaard', teamId: 'arsenal', rating: 8.1 },
      { playerId: 'palmer', name: 'Palmer', teamId: 'chelsea', rating: 7.8 },
      { playerId: 'rice', name: 'Rice', teamId: 'arsenal', rating: 7.5 },
      { playerId: 'caicedo', name: 'Caicedo', teamId: 'chelsea', rating: 6.9 },
    ],
  },
};

export const NOTIFICATION_FEED: NotificationItem[] = [
  { id: 'n1', kind: 'goal', text: 'Goal · Saka · Arsenal 2–1 Chelsea', time: '67′', matchId: 'm-ars-che' },
  { id: 'n2', kind: 'card', text: 'Yellow · Caicedo · Chelsea', time: '58′', matchId: 'm-ars-che' },
  { id: 'n3', kind: 'goal', text: 'Goal · Salah · Liverpool 1–1 City', time: '23′', matchId: 'm-liv-mci' },
  { id: 'n4', kind: 'ht', text: 'Half-time · Barcelona 0–0 Real Madrid', time: 'HT', matchId: 'm-bar-rma' },
  { id: 'n5', kind: 'kickoff', text: 'Kick-off in 95 minutes · Tottenham vs Newcastle', time: 'Today', matchId: 'm-tot-new' },
  { id: 'n6', kind: 'ft', text: 'Full-time · Aston Villa 1–0 Manchester United', time: 'FT', matchId: 'm-avl-mun' },
];

export const TOP_SCORERS: Array<{ player: Player; goals: number; assists: number }> = [
  { player: PLAYERS.find((p) => p.id === 'haaland')!, goals: 8, assists: 1 },
  { player: PLAYERS.find((p) => p.id === 'salah')!, goals: 7, assists: 3 },
  { player: PLAYERS.find((p) => p.id === 'mbappe')!, goals: 7, assists: 2 },
  { player: PLAYERS.find((p) => p.id === 'saka')!, goals: 6, assists: 4 },
  { player: PLAYERS.find((p) => p.id === 'yamal')!, goals: 5, assists: 6 },
  { player: PLAYERS.find((p) => p.id === 'palmer')!, goals: 5, assists: 3 },
];

export function getMatch(id: string): Match | undefined {
  return MATCHES.find((m) => m.id === id);
}

export function getTeam(id: string): Team | undefined {
  return TEAMS[id];
}

export function getCompetition(id: string): Competition | undefined {
  return COMPETITIONS.find((c) => c.id === id);
}

export function getPlayer(id: string): Player | undefined {
  return PLAYERS.find((p) => p.id === id);
}

export function getMatchDetail(id: string): MatchDetail | undefined {
  const seeded = MATCH_DETAILS[id];
  if (seeded) return { ...seeded, match: getMatch(id) ?? seeded.match };
  const matchRow = getMatch(id);
  if (!matchRow) return undefined;
  return {
    match: matchRow,
    events: [],
    commentary: [{ id: 'empty', text: 'No play-by-play yet.' }],
    homeLineup: { team: matchRow.home, formation: '4-3-3', players: [] },
    awayLineup: { team: matchRow.away, formation: '4-3-3', players: [] },
    stats: [],
    table: matchRow.leagueId === 'pl' ? PL_TABLE : [],
    h2h: { summary: 'No head-to-head on file.', events: [] },
    ratings: [],
  };
}

export function matchesForDay(day: string, timeZone?: string): Match[] {
  return MATCHES.filter((m) => dayKey(m.kickoffIso, timeZone) === day);
}

export function searchCatalog(query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const hits: SearchHit[] = [];
  for (const teamRow of Object.values(TEAMS)) {
    if (teamRow.name.toLowerCase().includes(q) || teamRow.short.toLowerCase().includes(q)) {
      hits.push({ id: teamRow.id, kind: 'team', title: teamRow.name, subtitle: teamRow.country ?? 'Club', color: teamRow.color, short: teamRow.short });
    }
  }
  for (const c of COMPETITIONS) {
    if (c.name.toLowerCase().includes(q) || c.short.toLowerCase().includes(q)) {
      hits.push({ id: c.id, kind: 'competition', title: c.name, subtitle: c.country, color: c.color, short: c.short });
    }
  }
  for (const p of PLAYERS) {
    if (p.name.toLowerCase().includes(q) || p.shortName.toLowerCase().includes(q)) {
      const club = TEAMS[p.teamId];
      hits.push({ id: p.id, kind: 'player', title: p.name, subtitle: `${club?.name ?? ''} · ${p.position}`, short: p.shortName });
    }
  }
  for (const m of MATCHES) {
    const hay = `${m.home.name} ${m.away.name} ${m.home.short} ${m.away.short}`.toLowerCase();
    if (hay.includes(q)) {
      hits.push({
        id: m.id,
        kind: 'match',
        title: `${m.home.short} vs ${m.away.short}`,
        subtitle: m.leagueName ?? '',
      });
    }
  }
  return hits.slice(0, 24);
}

export function squadForTeam(teamId: string): Player[] {
  return PLAYERS.filter((p) => p.teamId === teamId);
}

export function formForTeam(teamId: string): Array<'W' | 'D' | 'L'> {
  return PL_TABLE.find((r) => r.team.id === teamId)?.form ?? ['W', 'D', 'L', 'W', 'D'];
}
