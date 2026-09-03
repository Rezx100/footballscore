export type FirstClassLeague = {
  slug: string;
  name: string;
  country: string;
  flag: string;
  logo: string;
  priority: number;
};

export const FIRST_CLASS_LEAGUES: FirstClassLeague[] = [
  { slug: "eng.1", name: "Premier League", country: "England", flag: "eng", logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/23.png", priority: 0 },
  { slug: "esp.1", name: "LaLiga", country: "Spain", flag: "esp", logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/15.png", priority: 1 },
  { slug: "ger.1", name: "Bundesliga", country: "Germany", flag: "ger", logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/10.png", priority: 2 },
  { slug: "ita.1", name: "Serie A", country: "Italy", flag: "ita", logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/12.png", priority: 3 },
  { slug: "fra.1", name: "Ligue 1", country: "France", flag: "fra", logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/9.png", priority: 4 },
  { slug: "uefa.champions", name: "Champions League", country: "Europe", flag: "int", logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/2.png", priority: 5 },
  { slug: "uefa.europa", name: "Europa League", country: "Europe", flag: "int", logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/2310.png", priority: 6 },
  { slug: "uefa.europa.conf", name: "Conference League", country: "Europe", flag: "int", logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/20296.png", priority: 7 },
  { slug: "uefa.super_cup", name: "UEFA Super Cup", country: "Europe", flag: "int", logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/1272.png", priority: 8 },
  { slug: "fifa.world", name: "FIFA World Cup", country: "International", flag: "int", logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/4.png", priority: 9 },
  { slug: "fifa.cwc", name: "Club World Cup", country: "International", flag: "int", logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/1932.png", priority: 10 },
  { slug: "uefa.nations", name: "Nations League", country: "Europe", flag: "int", logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/2395.png", priority: 11 },
  { slug: "eng.2", name: "Championship", country: "England", flag: "eng", logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/24.png", priority: 12 },
  { slug: "eng.fa", name: "FA Cup", country: "England", flag: "eng", logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/40.png", priority: 13 },
  { slug: "usa.1", name: "MLS", country: "United States", flag: "us", logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/19.png", priority: 14 },
  { slug: "mex.1", name: "Liga MX", country: "Mexico", flag: "mx", logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/22.png", priority: 15 },
  { slug: "conmebol.libertadores", name: "Libertadores", country: "South America", flag: "int", logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/58.png", priority: 16 },
  { slug: "bra.1", name: "Brasileirão", country: "Brazil", flag: "br", logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/85.png", priority: 17 },
  { slug: "arg.1", name: "Liga Profesional", country: "Argentina", flag: "ar", logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/1.png", priority: 18 },
  { slug: "concacaf.leagues.cup", name: "Leagues Cup", country: "North America", flag: "int", logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/2410.png", priority: 19 },
  { slug: "ned.1", name: "Eredivisie", country: "Netherlands", flag: "nl", logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/11.png", priority: 20 },
  { slug: "por.1", name: "Primeira Liga", country: "Portugal", flag: "pt", logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/14.png", priority: 21 },
  { slug: "sco.1", name: "Premiership", country: "Scotland", flag: "sco", logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/45.png", priority: 22 },
  { slug: "ksa.1", name: "Saudi Pro League", country: "Saudi Arabia", flag: "sa", logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/2488.png", priority: 23 },
  { slug: "jpn.1", name: "J1 League", country: "Japan", flag: "jp", logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/2199.png", priority: 24 },
  { slug: "aus.1", name: "A-League", country: "Australia", flag: "au", logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/1308.png", priority: 25 },
  { slug: "usa.nwsl", name: "NWSL", country: "United States", flag: "us", logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/2323.png", priority: 26 },
  { slug: "concacaf.champions", name: "Champions Cup", country: "North America", flag: "int", logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/2298.png", priority: 27 },
];

export const FIRST_CLASS_BY_SLUG = new Map(FIRST_CLASS_LEAGUES.map((league) => [league.slug, league]));

const COUNTRY_BY_PREFIX: Record<string, { country: string; flag: string }> = {
  eng: { country: "England", flag: "eng" },
  esp: { country: "Spain", flag: "esp" },
  ger: { country: "Germany", flag: "ger" },
  ita: { country: "Italy", flag: "ita" },
  fra: { country: "France", flag: "fra" },
  usa: { country: "United States", flag: "us" },
  mex: { country: "Mexico", flag: "mx" },
  ned: { country: "Netherlands", flag: "nl" },
  por: { country: "Portugal", flag: "pt" },
  sco: { country: "Scotland", flag: "sco" },
  ksa: { country: "Saudi Arabia", flag: "sa" },
  jpn: { country: "Japan", flag: "jp" },
  aus: { country: "Australia", flag: "au" },
  bra: { country: "Brazil", flag: "br" },
  arg: { country: "Argentina", flag: "ar" },
  col: { country: "Colombia", flag: "co" },
  per: { country: "Peru", flag: "pe" },
  par: { country: "Paraguay", flag: "py" },
  ecu: { country: "Ecuador", flag: "ec" },
  bol: { country: "Bolivia", flag: "bo" },
  chi: { country: "Chile", flag: "cl" },
  uru: { country: "Uruguay", flag: "uy" },
  ven: { country: "Venezuela", flag: "ve" },
  rsa: { country: "South Africa", flag: "za" },
  bel: { country: "Belgium", flag: "be" },
  tur: { country: "Turkey", flag: "tr" },
  aut: { country: "Austria", flag: "at" },
  gre: { country: "Greece", flag: "gr" },
  den: { country: "Denmark", flag: "dk" },
  nor: { country: "Norway", flag: "no" },
  swe: { country: "Sweden", flag: "se" },
  irl: { country: "Ireland", flag: "ie" },
  rus: { country: "Russia", flag: "ru" },
  can: { country: "Canada", flag: "ca" },
  uefa: { country: "Europe", flag: "int" },
  fifa: { country: "International", flag: "int" },
  conmebol: { country: "South America", flag: "int" },
  concacaf: { country: "North America", flag: "int" },
  caf: { country: "Africa", flag: "int" },
  afc: { country: "Asia", flag: "int" },
  club: { country: "International", flag: "int" },
  generic: { country: "International", flag: "int" },
  campeones: { country: "North America", flag: "int" },
  global: { country: "International", flag: "int" },
  nonfifa: { country: "International", flag: "int" },
  friendly: { country: "International", flag: "int" },
};

export function regionForSlug(slug: string): { country: string; flag: string } {
  const known = FIRST_CLASS_BY_SLUG.get(slug);
  if (known) return { country: known.country, flag: known.flag };
  const prefix = slug.split(".")[0] ?? slug;
  return COUNTRY_BY_PREFIX[prefix] ?? { country: "International", flag: "int" };
}

export function displayNameForSlug(slug: string, fallback: string): string {
  return FIRST_CLASS_BY_SLUG.get(slug)?.name ?? fallback;
}

export function logoForSlug(slug: string): string | undefined {
  return FIRST_CLASS_BY_SLUG.get(slug)?.logo;
}

export function priorityForSlug(slug: string): number {
  return FIRST_CLASS_BY_SLUG.get(slug)?.priority ?? 1000;
}
