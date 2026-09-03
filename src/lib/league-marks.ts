import { FIRST_CLASS_BY_SLUG } from "@/lib/espn/leagues";

export function isFirstClassSlug(slug: string): boolean {
  return FIRST_CLASS_BY_SLUG.has(slug);
}

export function firstClassMarkSrc(slug: string): string | undefined {
  if (!FIRST_CLASS_BY_SLUG.has(slug)) return undefined;
  return `/icons/leagues/${slug}.png`;
}
