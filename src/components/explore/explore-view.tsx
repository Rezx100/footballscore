import Link from "next/link";
import { LeagueMark } from "@/components/brand/league-mark";
import { FollowButton } from "@/components/follow/follow-button";
import { EmptyState, SearchField } from "@/components/scory/primitives";
import { FIRST_CLASS_BY_SLUG, FIRST_CLASS_LEAGUES } from "@/lib/espn/leagues";
import { catalogByCountry } from "@/lib/espn/catalog";
import { leagueHref, teamHref } from "@/lib/hrefs";
import { regionForSlug } from "@/lib/espn/leagues";
import type { CatalogLeague, Club } from "@/lib/types";
import type { FollowState } from "@/lib/follow";

export function ExploreView({
  catalog,
  clubs,
  follow,
  q,
}: {
  catalog: CatalogLeague[];
  clubs: Club[];
  follow: FollowState;
  q: string;
}) {
  const query = q.trim().toLowerCase();
  const leagues = query
    ? catalog.filter((league) => league.name.toLowerCase().includes(query) || league.slug.toLowerCase().includes(query))
    : catalog;
  const clubHits = query
    ? clubs.filter((club) => club.name.toLowerCase().includes(query) || club.short.toLowerCase().includes(query)).slice(0, 20)
    : [];
  const yours = catalog.filter((league) => follow.leagues.includes(league.slug));
  const world = FIRST_CLASS_LEAGUES;
  const grouped = catalogByCountry(leagues);

  return (
    <div className="px-4 pb-10 pt-3">
      <h1 className="text-[18px] font-semibold leading-6">Leagues</h1>
      <form action="/leagues" method="get" className="mt-3">
        <label className="sr-only" htmlFor="explore-q">
          Find leagues and clubs
        </label>
        <SearchField
          id="explore-q"
          name="q"
          defaultValue={q}
          placeholder="Find leagues and clubs"
        />
      </form>

      <div className="mt-3 h-rail flex gap-2">
        <span className="sport-pill">Football</span>
        <span className="day-chip bg-[var(--scory-bg-chip)]">All</span>
      </div>

      {clubHits.length ? (
        <section className="pt-5">
          <h2 className="mb-2 text-[16px] font-semibold">Clubs</h2>
          <ul className="space-y-2">
            {clubHits.map((club) => (
              <li key={`${club.leagueId}-${club.id}`}>
                <Link href={teamHref(club.leagueId, club.id)} className="scory-player-row">
                  <span className="min-w-0 flex-1 truncate text-[15px]">{club.name}</span>
                  <span className="text-[11px] text-[var(--muted)]">{club.short}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {query ? (
        <section className="pt-5">
          <h2 className="mb-3 text-[16px] font-semibold">Leagues</h2>
          {leagues.length ? (
            <ul className="space-y-2">
              {leagues.slice(0, 36).map((league) => (
                <LeagueRow key={league.slug} slug={league.slug} name={league.name} />
              ))}
            </ul>
          ) : (
            <EmptyState title="No competitions" body="No competitions matched that search." />
          )}
        </section>
      ) : (
        <>
          {yours.length ? (
            <section className="pt-5">
              <h2 className="mb-3 text-[16px] font-semibold">Yours</h2>
              <ul className="space-y-2">
                {yours.map((league) => (
                  <LeagueRow key={league.slug} slug={league.slug} name={league.name} />
                ))}
              </ul>
            </section>
          ) : null}

          <section className="pt-5">
            <h2 className="mb-3 text-[16px] font-semibold">World</h2>
            <ul className="space-y-2">
              {world.map((league) => (
                <LeagueRow key={league.slug} slug={league.slug} name={league.name} />
              ))}
            </ul>
          </section>

          <section className="pt-6">
            <h2 className="mb-2 text-[16px] font-semibold">All {catalog.length}</h2>
            <p className="mb-3 text-[13px] leading-[20px] text-[var(--muted)]">
              Every competition in the catalog, grouped by country.
            </p>
            {grouped.map((group) => (
              <details key={group.country} className="border-b border-[var(--scory-border-subtle)] py-2">
                <summary className="min-h-11 cursor-pointer py-2 text-[12px] tracking-[0.06em] text-[var(--muted)]">
                  {group.country} · {group.leagues.length}
                </summary>
                <ul className="pb-2">
                  {group.leagues.map((league) => (
                    <li key={league.slug} className="flex min-h-14 items-center justify-between gap-3 py-1.5">
                      <Link href={leagueHref(league.slug)} className="flex min-w-0 flex-1 items-center gap-3">
                        <LeagueMark slug={league.slug} name={league.name} logo={FIRST_CLASS_BY_SLUG.get(league.slug)?.logo} size={28} />
                        <span className="min-w-0">
                          <span className="block truncate text-[15px]">{league.name}</span>
                          <span className="text-[10px] tracking-[0.06em] text-[var(--muted)]">
                            {regionForSlug(league.slug).country}
                          </span>
                        </span>
                      </Link>
                      <FollowButton league={league.slug} compact />
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </section>
        </>
      )}
    </div>
  );
}

function LeagueRow({ slug, name }: { slug: string; name: string }) {
  const region = regionForSlug(slug);
  return (
    <li className="flex items-center justify-between gap-3">
      <Link href={leagueHref(slug)} className="scory-player-row flex-1">
        <LeagueMark slug={slug} name={name} logo={FIRST_CLASS_BY_SLUG.get(slug)?.logo} size={40} />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-medium">{name}</span>
          <span className="text-[11px] text-[var(--muted)]">{region.country}</span>
        </span>
      </Link>
      <FollowButton league={slug} compact />
    </li>
  );
}
