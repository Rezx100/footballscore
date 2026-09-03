import { asArray, asString, isRecord } from "@/lib/espn/json";
import { mapNewsArticles } from "@/lib/espn/map-summary";
import type { NewsArticle, NewsItem } from "@/lib/types";

const ALLOWED = new Set(["P", "A", "STRONG", "EM", "B", "I", "BR", "H2", "H3", "H4", "UL", "OL", "LI", "BLOCKQUOTE"]);

function stripDisallowed(html: string): string {
  const withoutJunk = html
    .replace(/<video\d*>/gi, "")
    .replace(/<\/video\d*>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object[\s\S]*?<\/object>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/on\w+="[^"]*"/gi, "")
    .replace(/on\w+='[^']*'/gi, "");
  return withoutJunk.replace(/<\/?([a-zA-Z0-9]+)([^>]*)>/g, (full, tag: string, attrs: string) => {
    const upper = tag.toUpperCase();
    if (upper === "BR") return "<br />";
    if (!ALLOWED.has(upper) && upper !== "A") return "";
    if (upper === "A") {
      const href = attrs.match(/href\s*=\s*["']([^"']+)["']/i)?.[1];
      if (!href || href.toLowerCase().startsWith("javascript:")) return "";
      return full.startsWith("</") ? "</a>" : `<a href="${href}">`;
    }
    return full.startsWith("</") ? `</${tag.toLowerCase()}>` : `<${tag.toLowerCase()}>`;
  });
}

export function mapArticle(raw: unknown): NewsArticle | null {
  if (!isRecord(raw)) return null;
  const headline = asArray(raw.headlines).find(isRecord) ?? (asString(raw.headline) ? raw : undefined);
  if (!isRecord(headline)) return null;
  const items = mapNewsArticles({ articles: [headline] });
  const base = items[0];
  if (!base) return null;
  const related = mapNewsArticles({ articles: asArray(headline.related) });
  const story = asString(headline.story);
  return {
    ...base,
    description: base.description ?? asString(headline.description),
    storyHtml: story ? stripDisallowed(story) : undefined,
    related,
  };
}

export function sortNews(items: NewsItem[]): NewsItem[] {
  const seen = new Set<string>();
  return items
    .filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    })
    .sort((a, b) => (b.published || "").localeCompare(a.published || ""));
}

export function mapNewsFeed(raw: unknown, leagueSlug?: string): NewsItem[] {
  return mapNewsArticles(raw, leagueSlug);
}
