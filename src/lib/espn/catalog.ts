import persisted from "@/lib/espn/catalog.json";
import { FIRST_CLASS_BY_SLUG, displayNameForSlug, regionForSlug } from "@/lib/espn/leagues";
import { asArray, asString, isRecord } from "@/lib/espn/json";
import { fetchLeaguesCatalog } from "@/lib/espn/client";
import type { CatalogLeague } from "@/lib/types";

function fromPersisted(): CatalogLeague[] {
  return (persisted as CatalogLeague[]).map((item) => ({
    ...item,
    name: displayNameForSlug(item.slug, item.name),
  }));
}

function slugFromRef(ref: string): string | undefined {
  const match = ref.match(/\/leagues\/([^?/]+)/);
  return match ? decodeURIComponent(match[1]) : undefined;
}

export async function getCatalog(): Promise<CatalogLeague[]> {
  const live = await fetchLeaguesCatalog();
  if (!isRecord(live)) return fromPersisted();
  const items = asArray(live.items);
  if (items.length === 0) return fromPersisted();
  const bySlug = new Map(fromPersisted().map((item) => [item.slug, item]));
  const merged: CatalogLeague[] = [];
  for (const item of items) {
    if (!isRecord(item)) continue;
    const ref = asString(item.$ref);
    const slug = (ref ? slugFromRef(ref) : undefined) ?? asString(item.slug);
    if (!slug) continue;
    const known = bySlug.get(slug);
    const first = FIRST_CLASS_BY_SLUG.get(slug);
    merged.push({
      slug,
      name: first?.name ?? known?.name ?? slug,
      displayName: known?.displayName ?? first?.name ?? slug,
      abbreviation: known?.abbreviation,
      country: known?.country ?? regionForSlug(slug).country,
      isTournament: known?.isTournament,
      $ref: ref ?? known?.$ref ?? "",
    });
    bySlug.delete(slug);
  }
  for (const leftover of bySlug.values()) merged.push(leftover);
  merged.sort((a, b) => a.name.localeCompare(b.name));
  return merged;
}

export function catalogByCountry(list: CatalogLeague[]): { country: string; leagues: CatalogLeague[] }[] {
  const groups = new Map<string, CatalogLeague[]>();
  for (const league of list) {
    const country = regionForSlug(league.slug).country;
    const bucket = groups.get(country) ?? [];
    bucket.push(league);
    groups.set(country, bucket);
  }
  return [...groups.entries()]
    .map(([country, leagues]) => ({
      country,
      leagues: leagues.sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .sort((a, b) => a.country.localeCompare(b.country));
}
