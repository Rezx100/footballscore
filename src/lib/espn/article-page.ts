import { fetchArticle } from "@/lib/espn/client";
import { mapArticle } from "@/lib/espn/map-news";
import type { NewsArticle } from "@/lib/types";

export async function getArticle(id: string): Promise<NewsArticle | null> {
  const raw = await fetchArticle(id);
  return mapArticle(raw);
}
