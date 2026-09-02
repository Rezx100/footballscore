/**
 * League atmospheric palettes — Apple Sports rhythm (header wash per league),
 * Medal-dark friendly hex. Brand-true where leagues have a known identity;
 * country / confederation fallbacks for everything else.
 */

export type LeaguePalette = {
  /** Mid brand hue used in section aura */
  mid: string;
  /** Deep night tone for gradient roots */
  deep: string;
  /** Brighter accent for chips / live-adjacent league cues */
  accent: string;
  label: string;
};

const BY_SLUG: Record<string, LeaguePalette> = {
  // Big five
  "eng.1": { mid: "#5B2C8A", deep: "#2A1142", accent: "#9B5DE5", label: "Premier League purple" },
  "esp.1": { mid: "#E85D04", deep: "#5C2200", accent: "#F48C06", label: "LaLiga orange" },
  "ger.1": { mid: "#D20515", deep: "#4A050A", accent: "#FF3B4A", label: "Bundesliga red" },
  "ita.1": { mid: "#024994", deep: "#011B38", accent: "#3D8BDB", label: "Serie A blue" },
  "fra.1": { mid: "#122B5C", deep: "#071224", accent: "#DAE025", label: "Ligue 1 navy" },

  // UEFA / FIFA
  "uefa.champions": { mid: "#0B2A6B", deep: "#040E28", accent: "#4C8DFF", label: "UCL star-blue" },
  "uefa.europa": { mid: "#F68E27", deep: "#5C2E05", accent: "#FFB35A", label: "UEL orange" },
  "uefa.europa.conf": { mid: "#1B8A4A", deep: "#07351C", accent: "#3DDB7A", label: "UECL green" },
  "uefa.super_cup": { mid: "#1A4A8C", deep: "#071A33", accent: "#5BA0FF", label: "Super Cup blue" },
  "uefa.nations": { mid: "#0E3D6E", deep: "#051828", accent: "#4EA1FF", label: "Nations League blue" },
  "fifa.world": { mid: "#326295", deep: "#0F2238", accent: "#6BB0E8", label: "World Cup blue" },
  "fifa.cwc": { mid: "#8B6914", deep: "#2E2205", accent: "#E0B84A", label: "Club World Cup gold" },

  // Domestic cups / 2nd tiers
  "eng.2": { mid: "#1D4E89", deep: "#0A1F38", accent: "#5BA3E0", label: "Championship blue" },
  "eng.fa": { mid: "#C8102E", deep: "#3F0510", accent: "#FF4D6A", label: "FA Cup red" },
  "eng.league_cup": { mid: "#7A1F2B", deep: "#2A0A10", accent: "#E05A6A", label: "EFL Cup maroon" },

  // Americas
  "usa.1": { mid: "#C8102E", deep: "#3A0610", accent: "#1A6BB5", label: "MLS red" },
  "usa.nwsl": { mid: "#E31C79", deep: "#4A0A28", accent: "#FF6BB5", label: "NWSL magenta" },
  "mex.1": { mid: "#006847", deep: "#01281C", accent: "#CE1126", label: "Liga MX green" },
  "bra.1": { mid: "#009B3A", deep: "#013A16", accent: "#FEDD00", label: "Brasileirão green" },
  "arg.1": { mid: "#74ACDF", deep: "#1A3A55", accent: "#F6B40E", label: "Argentina sky" },
  "conmebol.libertadores": { mid: "#0B3D2E", deep: "#031812", accent: "#C9A227", label: "Libertadores green-gold" },
  "conmebol.sudamericana": { mid: "#C45C26", deep: "#3A1808", accent: "#F0A060", label: "Sudamericana copper" },
  "concacaf.leagues.cup": { mid: "#00A0E3", deep: "#013A52", accent: "#5AD0FF", label: "Leagues Cup cyan" },
  "concacaf.champions": { mid: "#0033A0", deep: "#001433", accent: "#4D7FFF", label: "Champions Cup blue" },

  // Rest of world first-class
  "ned.1": { mid: "#F36C21", deep: "#4A1E05", accent: "#FF9A5A", label: "Eredivisie orange" },
  "por.1": { mid: "#006600", deep: "#012401", accent: "#FF0000", label: "Primeira green" },
  "sco.1": { mid: "#1B4F72", deep: "#071B28", accent: "#5DADE2", label: "SPFL blue" },
  "ksa.1": { mid: "#006C35", deep: "#012816", accent: "#C4A35A", label: "Saudi green" },
  "jpn.1": { mid: "#E60012", deep: "#4A0408", accent: "#FF5A60", label: "J1 red" },
  "aus.1": { mid: "#F36C00", deep: "#4A2200", accent: "#FF9A40", label: "A-League orange" },
};

/** Country / confederation fallbacks when slug is not first-class mapped */
const BY_PREFIX: Record<string, LeaguePalette> = {
  eng: { mid: "#6B2D5B", deep: "#2A1024", accent: "#C17A3A", label: "England fallback" },
  esp: { mid: "#C45C26", deep: "#3A1808", accent: "#F0A060", label: "Spain fallback" },
  ger: { mid: "#A01820", deep: "#3A080C", accent: "#E05058", label: "Germany fallback" },
  ita: { mid: "#1A4A8C", deep: "#071A33", accent: "#5BA0FF", label: "Italy fallback" },
  fra: { mid: "#1A2A5C", deep: "#080F24", accent: "#C4A574", label: "France fallback" },
  usa: { mid: "#9B1B1B", deep: "#2E0808", accent: "#1A6BB5", label: "USA fallback" },
  mex: { mid: "#1A5C40", deep: "#081C14", accent: "#CE1126", label: "Mexico fallback" },
  bra: { mid: "#1A6B38", deep: "#082816", accent: "#C4A35A", label: "Brazil fallback" },
  arg: { mid: "#4A7A9B", deep: "#142838", accent: "#C4A35A", label: "Argentina fallback" },
  chi: { mid: "#8B1E2D", deep: "#2E0A10", accent: "#D4A017", label: "Chile fallback" },
  col: { mid: "#FCD116", deep: "#3A3005", accent: "#003893", label: "Colombia fallback" },
  uru: { mid: "#5B8DB8", deep: "#1A3045", accent: "#C4A35A", label: "Uruguay fallback" },
  ned: { mid: "#C45C18", deep: "#3A1805", accent: "#FF9A5A", label: "Netherlands fallback" },
  por: { mid: "#1A5C28", deep: "#081C10", accent: "#C8102E", label: "Portugal fallback" },
  sco: { mid: "#1A4A6B", deep: "#081828", accent: "#5BA0FF", label: "Scotland fallback" },
  bel: { mid: "#8B1E2D", deep: "#2E0A10", accent: "#F5D76E", label: "Belgium fallback" },
  tur: { mid: "#8B1E2D", deep: "#2E0A10", accent: "#E05058", label: "Turkey fallback" },
  jpn: { mid: "#A01820", deep: "#3A080C", accent: "#E05058", label: "Japan fallback" },
  aus: { mid: "#C45C18", deep: "#3A1805", accent: "#FF9A5A", label: "Australia fallback" },
  ksa: { mid: "#1A5C38", deep: "#081C14", accent: "#C4A35A", label: "Saudi fallback" },
  uefa: { mid: "#1A3A6B", deep: "#081428", accent: "#5BA0FF", label: "UEFA fallback" },
  fifa: { mid: "#2A5080", deep: "#0C1C30", accent: "#6BB0E8", label: "FIFA fallback" },
  conmebol: { mid: "#1A4A38", deep: "#081C14", accent: "#C9A227", label: "CONMEBOL fallback" },
  concacaf: { mid: "#1A5A7A", deep: "#081C28", accent: "#5AD0FF", label: "CONCACAF fallback" },
  caf: { mid: "#1A6B38", deep: "#082816", accent: "#F0A060", label: "CAF fallback" },
  afc: { mid: "#8B3A1E", deep: "#2E1408", accent: "#F0A060", label: "AFC fallback" },
};

const DEFAULT_PALETTE: LeaguePalette = {
  mid: "#6B3D1C",
  deep: "#2A1810",
  accent: "#C17A3A",
  label: "Medal copper default",
};

const CURATED_HASH: LeaguePalette[] = [
  { mid: "#5B2C8A", deep: "#2A1142", accent: "#9B5DE5", label: "hash purple" },
  { mid: "#1A5C58", deep: "#08201E", accent: "#3DDBB8", label: "hash teal" },
  { mid: "#8B3A1E", deep: "#2E1408", accent: "#F0A060", label: "hash rust" },
  { mid: "#1A4A8C", deep: "#071A33", accent: "#5BA0FF", label: "hash blue" },
  { mid: "#6B2D5B", deep: "#2A1024", accent: "#E05AB0", label: "hash plum" },
  { mid: "#4A5C1A", deep: "#1C2408", accent: "#B8D43D", label: "hash olive" },
];

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i += 1) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h;
}

export function paletteForLeague(input: {
  id: string;
  name?: string;
  country?: string;
  flag?: string;
}): LeaguePalette {
  const slug = input.id.toLowerCase();
  if (BY_SLUG[slug]) return BY_SLUG[slug];

  // Partial slug matches (e.g. bra.2 → brazil fallback via prefix)
  const prefix = slug.split(".")[0] ?? slug;
  if (BY_PREFIX[prefix]) return BY_PREFIX[prefix];

  // Name heuristics for ESPN oddities
  const name = (input.name ?? "").toLowerCase();
  if (name.includes("premier league")) return BY_SLUG["eng.1"];
  if (name.includes("laliga") || name.includes("la liga")) return BY_SLUG["esp.1"];
  if (name.includes("bundesliga")) return BY_SLUG["ger.1"];
  if (name.includes("serie a")) return BY_SLUG["ita.1"];
  if (name.includes("ligue 1")) return BY_SLUG["fra.1"];
  if (name.includes("champions league")) return BY_SLUG["uefa.champions"];
  if (name.includes("europa league")) return BY_SLUG["uefa.europa"];
  if (name.includes("brasileir")) return BY_SLUG["bra.1"];
  if (name.includes("leagues cup")) return BY_SLUG["concacaf.leagues.cup"];
  if (name.includes("libertadores")) return BY_SLUG["conmebol.libertadores"];
  if (name.includes("mls") || name === "major league soccer") return BY_SLUG["usa.1"];

  if (input.flag && BY_PREFIX[input.flag]) return BY_PREFIX[input.flag];

  return CURATED_HASH[hashSlug(slug) % CURATED_HASH.length] ?? DEFAULT_PALETTE;
}

export function leaguePaletteVars(palette: LeaguePalette): Record<string, string> {
  return {
    "--league": palette.mid,
    "--league-deep": palette.deep,
    "--league-accent": palette.accent,
  };
}
