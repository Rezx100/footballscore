import Link from "next/link";
import { LeagueMark } from "@/components/brand/league-mark";
import { FollowButton } from "@/components/follow/follow-button";
import { SiteLockup } from "@/components/shell/page-shell";
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
    <>
      <header className="masthead px-4 pt-4 pb-4">
        <SiteLockup />
        <form action="/leagues" method="get" className="mt-4">
          <label className="sr-only" htmlFor="explore-q">
            Find leagues and clubs
          </label>
          <input
            id="explore-q"
            name="q"
            defaultValue={q}
            placeholder="Find leagues and clubs"
            className="h-10 w-full rounded-[8px] border border-[var(--line)] bg-[var(--elev)] px-3 font-cond text-[15px] outline-none placeholder:text-[var(--muted)] focus:border-[color-mix(in_srgb,var(--copper)_45%,transparent)]"
          />
        </form>
      </header>

      {clubHits.length ? (
        <section className="px-4 pt-4">
          <h2 className="font-cond mb-2 text-[16px]">Clubs</h2>
          <ul>
            {clubHits.map((club) => (
              <li key={`${club.leagueId}-${club.id}`}>
                <Link href={teamHref(club.leagueId, club.id)} className="flex min-h-14 items-center justify-between py-2">
                  <span className="font-cond text-[15px]">{club.name}</span>
                  <span className="font-board text-[10px] tracking-[0.06em] text-[var(--muted)]">{club.short}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {query ? (
        <section className="px-4 pt-5">
          <h2 className="font-cond mb-3 text-[16px]">Leagues</h2>
          {leagues.length ? (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
              {leagues.slice(0, 36).map((league) => (
                <IdentityCard key={league.slug} slug={league.slug} name={league.name} logo={FIRST_CLASS_BY_SLUG.get(league.slug)?.logo} />
              ))}
            </div>
          ) : (
            <p className="text-[14px] text-[var(--muted)]">No competitions matched that search.</p>
          )}
        </section>
      ) : (
        <>
          {yours.length ? (
            <section className="px-4 pt-5">
              <h2 className="font-cond mb-3 text-[16px]">Yours</h2>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {yours.map((league) => (
                  <IdentityCard key={league.slug} slug={league.slug} name={league.name} logo={FIRST_CLASS_BY_SLUG.get(league.slug)?.logo} featured />
                ))}
              </div>
            </section>
          ) : null}

          <section className="px-4 pt-5">
            <h2 className="font-cond mb-3 text-[16px]">World</h2>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
              {world.map((league) => (
                <IdentityCard key={league.slug} slug={league.slug} name={league.name} logo={league.logo} />
              ))}
            </div>
          </section>

          <section className="px-4 pt-6">
            <h2 className="font-cond mb-2 text-[16px]">All {catalog.length}</h2>
            <p className="mb-3 text-[13px] leading-[20px] text-[var(--muted)]">
              Every competition in the catalog, grouped by country.
            </p>
            {grouped.map((group) => (
              <details key={group.country} className="border-b border-[var(--line)] py-2">
                <summary className="font-board min-h-11 cursor-pointer py-2 text-[12px] tracking-[0.06em] text-[var(--muted)]">
                  {group.country} · {group.leagues.length}
                </summary>
                <ul className="pb-2">
                  {group.leagues.map((league) => (
                    <li key={league.slug} className="flex min-h-14 items-center justify-between gap-3 py-1.5">
                      <Link href={leagueHref(league.slug)} className="flex min-w-0 flex-1 items-center gap-3">
                        <LeagueMark slug={league.slug} name={league.name} logo={FIRST_CLASS_BY_SLUG.get(league.slug)?.logo} size={28} />
                        <span className="min-w-0">
                          <span className="font-cond block truncate text-[15px]">{league.name}</span>
                          <span className="font-board text-[10px] tracking-[0.06em] text-[var(--muted)]">
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
    </>
  );
}

function IdentityCard({
  slug,
  name,
  logo,
  featured = false,
}: {
  slug: string;
  name: string;
  logo?: string;
  featured?: boolean;
}) {
  const region = regionForSlug(slug);
  return (
    <article className="score-card flex flex-col rounded-[12px]">
      <Link href={leagueHref(slug)} className="flex min-h-14 flex-1 flex-col items-center px-2 pt-3 pb-1">
        <LeagueMark slug={slug} name={name} logo={logo} size={featured ? 56 : 48} />
        <span className="font-cond mt-2 line-clamp-2 text-center text-[13px] leading-[16px]">{name}</span>
        <span className="font-board mt-1 text-[10px] tracking-[0.06em] text-[var(--muted)]">{region.country}</span>
      </Link>
      <div className="flex justify-center pb-2.5 pt-1">
        <FollowButton league={slug} compact />
      </div>
    </article>
  );
}
