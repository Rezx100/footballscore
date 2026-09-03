"use client";

import Link from "next/link";
import { FollowButton } from "@/components/follow/follow-button";
import { useFollow } from "@/components/follow/follow-provider";
import { SiteLockup } from "@/components/shell/page-shell";
import { FIRST_CLASS_LEAGUES } from "@/lib/espn/leagues";
import { leagueHref, teamHref } from "@/lib/hrefs";
import type { CatalogLeague, Club } from "@/lib/types";

export function FollowingView({
  catalog,
  clubs,
  q,
}: {
  catalog: CatalogLeague[];
  clubs: Club[];
  q: string;
}) {
  const { follow } = useFollow();
  const query = q.trim().toLowerCase();
  const followedLeagues = catalog.filter((league) => follow.leagues.includes(league.slug));
  const followedTeams = clubs.filter((club) =>
    follow.teams.some((team) => team.league === club.leagueId && team.id === club.id),
  );
  const suggested = FIRST_CLASS_LEAGUES.filter((league) => !follow.leagues.includes(league.slug));
  const leagueHits = query
    ? catalog.filter((league) => league.name.toLowerCase().includes(query)).slice(0, 12)
    : [];
  const clubHits = query
    ? clubs.filter((club) => club.name.toLowerCase().includes(query)).slice(0, 12)
    : [];

  return (
    <>
      <header className="masthead px-4 pt-4 pb-4">
        <SiteLockup />
        <h1 className="font-cond mt-5 text-[20px]">Following</h1>
        <form action="/following" method="get">
          <label className="sr-only" htmlFor="follow-q">
            Add leagues and clubs
          </label>
          <input
            id="follow-q"
            name="q"
            defaultValue={q}
            placeholder="Add leagues and clubs"
            className="mt-3 h-10 w-full rounded-[10px] border border-[var(--line)] bg-[var(--elev)] px-3 font-cond text-[15px] outline-none"
          />
        </form>
      </header>
      <div className="px-4 pb-10">
        {query ? (
          <section className="pt-4">
            <h2 className="font-cond mb-2 text-[16px]">Add</h2>
            {leagueHits.map((league) => (
              <div key={league.slug} className="flex items-center justify-between py-2">
                <Link href={leagueHref(league.slug)} className="font-cond text-[15px]">
                  {league.name}
                </Link>
                <FollowButton league={league.slug} />
              </div>
            ))}
            {clubHits.map((club) => (
              <div key={`${club.leagueId}-${club.id}`} className="flex items-center justify-between py-2">
                <Link href={teamHref(club.leagueId, club.id)} className="font-cond text-[15px]">
                  {club.name}
                </Link>
                <FollowButton league={club.leagueId} teamId={club.id} />
              </div>
            ))}
            {!leagueHits.length && !clubHits.length ? (
              <p className="text-[14px] text-[var(--muted)]">Nothing matched that search.</p>
            ) : null}
          </section>
        ) : null}

        <section className="pt-5">
          <h2 className="font-cond mb-2 text-[16px]">Yours</h2>
          {!followedLeagues.length && !followedTeams.length ? (
            <p className="text-[14px] text-[var(--muted)]">Follow a league or club and it rises on Scores.</p>
          ) : null}
          {followedLeagues.map((league) => (
            <div key={league.slug} className="flex items-center justify-between py-2">
              <Link href={leagueHref(league.slug)} className="font-cond text-[15px]">
                {league.name}
              </Link>
              <FollowButton league={league.slug} />
            </div>
          ))}
          {followedTeams.map((club) => (
            <div key={`${club.leagueId}-${club.id}`} className="flex items-center justify-between py-2">
              <Link href={teamHref(club.leagueId, club.id)} className="font-cond text-[15px]">
                {club.name}
              </Link>
              <FollowButton league={club.leagueId} teamId={club.id} />
            </div>
          ))}
        </section>

        <section className="pt-5">
          <h2 className="font-cond mb-2 text-[16px]">Suggested</h2>
          {suggested.map((league) => (
            <div key={league.slug} className="flex items-center justify-between py-2">
              <Link href={leagueHref(league.slug)} className="font-cond text-[15px]">
                {league.name}
              </Link>
              <FollowButton league={league.slug} />
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
