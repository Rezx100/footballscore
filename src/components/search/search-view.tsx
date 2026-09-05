import Link from "next/link";
import { AppHeader } from "@/components/scory/chrome";
import { EmptyState, SearchField, UnderlineTabs } from "@/components/scory/primitives";
import { NewsCard } from "@/components/news/news-card";
import { Crest } from "@/components/matches/crest";
import { LeagueMark } from "@/components/brand/league-mark";
import { FIRST_CLASS_BY_SLUG } from "@/lib/espn/leagues";
import { leagueHref, searchHref, teamHref } from "@/lib/hrefs";
import type { CatalogLeague, Club, NewsItem } from "@/lib/types";

export type SearchTab = "trending" | "teams" | "players" | "leagues";

export function parseSearchTab(value: string | undefined): SearchTab {
  return value === "teams" || value === "players" || value === "leagues" ? value : "trending";
}

export function SearchView({
  q,
  tab,
  news,
  clubs,
  leagues,
}: {
  q: string;
  tab: SearchTab;
  news: NewsItem[];
  clubs: Club[];
  leagues: CatalogLeague[];
}) {
  const query = q.trim().toLowerCase();
  const newsHits = query
    ? news.filter((item) => item.headline.toLowerCase().includes(query))
    : news.slice(0, 12);
  const clubHits = query
    ? clubs.filter((club) => club.name.toLowerCase().includes(query) || club.short.toLowerCase().includes(query))
    : clubs.slice(0, 16);
  const leagueHits = query
    ? leagues.filter(
        (league) =>
          league.name.toLowerCase().includes(query) ||
          league.displayName.toLowerCase().includes(query) ||
          league.slug.toLowerCase().includes(query),
      )
    : leagues.slice(0, 16);

  const tabs = [
    { value: "trending", label: "Trending", href: searchHref(q, "trending") },
    { value: "teams", label: "Teams", href: searchHref(q, "teams") },
    { value: "players", label: "Players", href: searchHref(q, "players") },
    { value: "leagues", label: "Leagues", href: searchHref(q, "leagues") },
  ];

  return (
    <div className="bg-[var(--bg)] text-[var(--ink)]">
      <AppHeader />
      <div className="px-4 pt-3">
        <form action="/search" method="get">
          {tab !== "trending" ? <input type="hidden" name="tab" value={tab} /> : null}
          <label className="sr-only" htmlFor="scory-search">
            Search teams, leagues, players
          </label>
          <SearchField
            id="scory-search"
            name="q"
            defaultValue={q}
            placeholder="Search teams, leagues, players"
          />
        </form>
        <div className="mt-3">
          <UnderlineTabs items={tabs} value={tab} />
        </div>
      </div>
      <div className="px-4 pb-10 pt-4">
        {tab === "trending" ? (
          newsHits.length ? (
            <div className="space-y-2">
              {newsHits.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <EmptyState title="No headlines" body="Nothing in the ESPN news feed matched that search." />
          )
        ) : null}

        {tab === "teams" ? (
          clubHits.length ? (
            <ul className="space-y-2">
              {clubHits.map((club) => (
                <li key={`${club.leagueId}-${club.id}`}>
                  <Link href={teamHref(club.leagueId, club.id)} className="scory-player-row">
                    <Crest
                      team={{ id: club.id, name: club.name, short: club.short, color: club.color, logo: club.logo }}
                      size={40}
                    />
                    <span className="min-w-0 flex-1 truncate text-[14px] font-medium">{club.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState title="No teams" body="Try another club name, or browse leagues." actionHref="/leagues" actionLabel="Leagues" />
          )
        ) : null}

        {tab === "players" ? (
          <EmptyState
            title="No player search"
            body="ESPN has no player search in this app. Open a club squad to find players."
            actionHref="/leagues"
            actionLabel="Browse clubs"
          />
        ) : null}

        {tab === "leagues" ? (
          leagueHits.length ? (
            <ul className="space-y-2">
              {leagueHits.map((league) => (
                <li key={league.slug}>
                  <Link href={leagueHref(league.slug)} className="scory-player-row">
                    <LeagueMark
                      slug={league.slug}
                      name={league.name}
                      logo={FIRST_CLASS_BY_SLUG.get(league.slug)?.logo}
                      size={40}
                    />
                    <span className="min-w-0 flex-1 truncate text-[14px] font-medium">{league.displayName || league.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState title="No leagues" body="Nothing in the catalog matched that search." />
          )
        ) : null}
      </div>
    </div>
  );
}
