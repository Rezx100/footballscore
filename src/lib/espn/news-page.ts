import { fetchNews } from "@/lib/espn/client";
import { mapNewsFeed, sortNews } from "@/lib/espn/map-news";
import type { FollowState } from "@/lib/follow";
import type { NewsItem } from "@/lib/types";

const WORLD_SLUGS = ["eng.1", "esp.1", "ger.1", "ita.1", "fra.1", "uefa.champions", "usa.1", "fifa.world"];

export async function getNewsIndex(follow: FollowState): Promise<{ forYou: NewsItem[]; world: NewsItem[] }> {
  const extra = follow.leagues.filter((slug) => !WORLD_SLUGS.includes(slug)).slice(0, 8);
  const slugs = [...new Set([...WORLD_SLUGS, ...extra])];
  const results = await Promise.allSettled(slugs.map(async (slug) => ({ slug, items: mapNewsFeed(await fetchNews(slug), slug) })));
  const all: NewsItem[] = [];
  for (const result of results) {
    if (result.status === "fulfilled") all.push(...result.value.items);
  }
  const world = sortNews(all);
  const followedTeams = new Set(follow.teams.map((team) => team.id));
  const followedLeagues = new Set(follow.leagues);
  const forYou = world.filter(
    (item) =>
      (item.leagueSlug && followedLeagues.has(item.leagueSlug)) ||
      item.teamIds.some((id) => followedTeams.has(id)),
  );
  return { forYou, world };
}
