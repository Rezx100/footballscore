import Link from "next/link";
import { FollowButton } from "@/components/follow/follow-button";
import { SiteLockup } from "@/components/shell/page-shell";
import { FIRST_CLASS_LEAGUES } from "@/lib/espn/leagues";
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
            className="h-10 w-full rounded-[10px] border border-[color-mix(in_srgb,var(--ink)_12%,transparent)] bg-[color-mix(in_srgb,var(--elev)_55%,transparent)] px-3 font-cond text-[15px] outline-none placeholder:text-[var(--muted)]"
          />
        </form>
      </header>
      <div className="pb-10">
        {clubHits.length ? (
          <section className="px-4 pt-4">
            <h2 className="font-cond mb-2 text-[16px]">Clubs</h2>
            <ul className="space-y-1">
              {clubHits.map((club) => (
                <li key={`${club.leagueId}-${club.id}`}>
                  <Link href={teamHref(club.leagueId, club.id)} className="font-cond flex justify-between py-2 text-[15px]">
                    {club.name}
                    <span className="font-board text-[10px] text-[var(--muted)]">{club.short}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {!query && yours.length ? (
          <section className="px-4 pt-5">
            <h2 className="font-cond mb-2 text-[16px]">Yours</h2>
            <ul>
              {yours.map((league) => (
                <LeagueRow key={league.slug} slug={league.slug} name={league.name} />
              ))}
            </ul>
          </section>
        ) : null}

        {!query ? (
          <section className="px-4 pt-5">
            <h2 className="font-cond mb-2 text-[16px]">World</h2>
            <ul>
              {world.map((league) => (
                <LeagueRow key={league.slug} slug={league.slug} name={league.name} />
              ))}
            </ul>
          </section>
        ) : null}

        <section className="px-4 pt-5">
          <h2 className="font-cond mb-2 text-[16px]">{query ? "Leagues" : `All ${catalog.length}`}</h2>
          {grouped.map((group) => (
            <details key={group.country} className="border-b border-[var(--line)] py-2" open={Boolean(query)}>
              <summary className="font-board cursor-pointer text-[12px] tracking-[0.06em] text-[var(--muted)]">
                {group.country} · {group.leagues.length}
              </summary>
              <ul className="mt-2">
                {group.leagues.map((league) => (
                  <LeagueRow key={league.slug} slug={league.slug} name={league.name} />
                ))}
              </ul>
            </details>
          ))}
        </section>
      </div>
    </>
  );
}

function LeagueRow({ slug, name }: { slug: string; name: string }) {
  const region = regionForSlug(slug);
  return (
    <li className="flex items-center justify-between gap-3 py-2">
      <Link href={leagueHref(slug)} className="font-cond min-w-0 flex-1 truncate text-[15px]">
        {name}
        <span className="font-board ml-2 text-[10px] tracking-[0.06em] text-[var(--muted)]">{region.country}</span>
      </Link>
      <FollowButton league={slug} />
    </li>
  );
}
