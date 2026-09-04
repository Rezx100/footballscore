import { asString, isRecord } from "@/lib/espn/json";

export function teamLogoUrl(id: string | undefined, explicit?: string): string | undefined {
  if (explicit) return explicit;
  if (!id) return undefined;
  return `https://a.espncdn.com/i/teamlogos/soccer/500/${id}.png`;
}

/**
 * Soccer headshots live on `athlete.headshot.href` in the site summary
 * (`rosters[].roster[].athlete`), team roster, and core/site athlete payloads.
 * ESPN only attaches that field when a photo exists. Guessing
 * `a.espncdn.com/i/headshots/soccer/players/full/{id}.png` 404s for most
 * footballers (Cunha, Fernandes, Salah) even though Lisandro Martínez works.
 */
export function headshotFromAthlete(node: Record<string, unknown>, _id?: string): string | undefined {
  const athlete = isRecord(node.athlete) && node.headshot == null ? node.athlete : node;
  const shot = athlete.headshot;
  if (isRecord(shot)) return asString(shot.href);
  return asString(shot);
}
