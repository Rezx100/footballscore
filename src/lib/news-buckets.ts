import type { NewsItem } from "@/lib/types";

export type NewsBucket = "latest" | "transfers" | "injuries" | "opinion";

export function newsBucket(item: NewsItem): Exclude<NewsBucket, "latest"> | "other" {
  const headline = item.headline.toLowerCase();
  if (/transfer|loan|sign(?:ed|s|ing)?|join(?:s|ed)|deal|contract|bid/.test(headline)) return "transfers";
  if (/injur|ruled out|doubt|hamstring|fitness|knock|out for/.test(headline)) return "injuries";
  if (/opinion|column|view:|analysis|comment/.test(headline)) return "opinion";
  return "other";
}

export function filterNews(items: NewsItem[], bucket: NewsBucket): NewsItem[] {
  if (bucket === "latest") return items;
  return items.filter((item) => newsBucket(item) === bucket);
}
