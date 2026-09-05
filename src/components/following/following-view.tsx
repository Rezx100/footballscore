"use client";

import Link from "next/link";
import { FollowButton } from "@/components/follow/follow-button";
import { useFollow } from "@/components/follow/follow-provider";
import { FavoriteAddChip, FavoriteChip } from "@/components/scory/cards";
import { EmptyState, SearchField } from "@/components/scory/primitives";
import { LeagueGroupCard } from "@/components/matches/league-group";
import { FIRST_CLASS_LEAGUES } from "@/lib/espn/leagues";
import { leagueHref, teamHref } from "@/lib/hrefs";
import { matchesForFollow } from "@/lib/matches";
import { DEFAULT_MATCHES_QUERY } from "@/lib/matches-query";
import type { CatalogLeague, Club, LeagueGroup } from "@/lib/types";

export function FollowingView({
  catalog,
  clubs,
  q,
  groups,
}: {
  catalog: CatalogLeague[];
  clubs: Club[];
  q: string;
  groups: LeagueGroup[];
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
  const upcoming = matchesForFollow(groups, follow);

  return (
    <div className="px-4 pb-10 pt-3">
      <h1 className="text-[18px] font-semibold leading-6">Following</h1>
      <div className="mt-3 h-rail flex items-start gap-3">
        {followedTeams.map((club) => (
          <FavoriteChip key={`${club.leagueId}-${club.id}`} club={club} />
        ))}
        <FavoriteAddChip />
      </div>
      <form action="/following" method="get" className="mt-4">
        <label className="sr-only" htmlFor="follow-q">
          Add leagues and clubs
        </label>
        <SearchField id="follow-q" name="q" defaultValue={q} placeholder="Add leagues and clubs" />
      </form>

      {query ? (
        <section className="pt-5">
          <h2 className="mb-2 text-[16px] font-semibold">Add</h2>
          {leagueHits.map((league) => (
            <div key={league.slug} className="flex items-center justify-between py-2">
              <Link href={leagueHref(league.slug)} className="text-[15px]">
                {league.name}
              </Link>
              <FollowButton league={league.slug} />
            </div>
          ))}
          {clubHits.map((club) => (
            <div key={`${club.leagueId}-${club.id}`} className="flex items-center justify-between py-2">
              <Link href={teamHref(club.leagueId, club.id)} className="text-[15px]">
                {club.name}
              </Link>
              <FollowButton league={club.leagueId} teamId={club.id} />
            </div>
          ))}
          {!leagueHits.length && !clubHits.length ? (
            <EmptyState title="Nothing matched" body="Try another club or competition name." />
          ) : null}
        </section>
      ) : null}

      <section className="pt-5">
        <h2 className="mb-2 text-[16px] font-semibold">Upcoming</h2>
        {upcoming.length ? (
          <div className="flex flex-col gap-2">
            {upcoming.map((group) => (
              <LeagueGroupCard key={group.id} group={group} query={DEFAULT_MATCHES_QUERY} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No upcoming matches"
            body="Follow teams and leagues to see their fixtures here."
            actionHref="/search"
            actionLabel="Find clubs"
          />
        )}
      </section>

      <section className="pt-5">
        <h2 className="mb-2 text-[16px] font-semibold">Yours</h2>
        {!followedLeagues.length && !followedTeams.length ? (
          <p className="text-[14px] text-[var(--muted)]">Follow a league or club and it rises on Scores.</p>
        ) : null}
        {followedLeagues.map((league) => (
          <div key={league.slug} className="flex items-center justify-between py-2">
            <Link href={leagueHref(league.slug)} className="text-[15px]">
              {league.name}
            </Link>
            <FollowButton league={league.slug} />
          </div>
        ))}
        {followedTeams.map((club) => (
          <div key={`${club.leagueId}-${club.id}`} className="flex items-center justify-between py-2">
            <Link href={teamHref(club.leagueId, club.id)} className="text-[15px]">
              {club.name}
            </Link>
            <FollowButton league={club.leagueId} teamId={club.id} />
          </div>
        ))}
      </section>

      <section className="pt-5">
        <h2 className="mb-2 text-[16px] font-semibold">Suggested</h2>
        {suggested.map((league) => (
          <div key={league.slug} className="flex items-center justify-between py-2">
            <Link href={leagueHref(league.slug)} className="text-[15px]">
              {league.name}
            </Link>
            <FollowButton league={league.slug} />
          </div>
        ))}
      </section>
    </div>
  );
}
