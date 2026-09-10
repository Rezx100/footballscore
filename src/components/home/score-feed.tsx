import Link from "next/link";
import { AppHeader } from "@/components/scory/chrome";
import { FavoriteAddChip, FavoriteChip, LiveMatchCard } from "@/components/scory/cards";
import { EmptyState } from "@/components/scory/primitives";
import { DayHead } from "@/components/matches/day-head";
import { LeagueGroupCard } from "@/components/matches/league-group";
import { liveHref } from "@/lib/hrefs";
import type { FollowState } from "@/lib/follow";
import { collectLiveMatches, groupIsFinished, sortGroups } from "@/lib/matches";
import { DEFAULT_MATCHES_QUERY, type MatchesQuery } from "@/lib/matches-query";
import type { Club, LeagueGroup } from "@/lib/types";

export function ScoreFeed({
  query,
  groups,
  error,
  follow,
  clubs,
  timeZone,
}: {
  query: MatchesQuery;
  groups: LeagueGroup[];
  error?: string | null;
  follow: FollowState;
  clubs: Club[];
  timeZone: string;
}) {
  const ordered = sortGroups(groups, follow);
  const open = ordered.filter((group) => !groupIsFinished(group));
  const finished = ordered.filter(groupIsFinished);
  const live = collectLiveMatches(groups, follow);

  return (
    <div className="bg-[var(--bg)] text-[var(--ink)]">
      <AppHeader query={query} />
      <section className="px-4 pt-3">
        <h2 className="sr-only">Favorites</h2>
        <div className="h-rail flex items-start gap-3">
          {clubs.map((club) => (
            <FavoriteChip key={`${club.leagueId}-${club.id}`} club={club} />
          ))}
          <FavoriteAddChip />
        </div>
      </section>
      {live.length ? (
        <section className="pt-4">
          <div className="mb-2 flex items-center justify-between px-4">
            <h2 className="text-[16px] font-semibold leading-6">Live</h2>
            <Link href={liveHref()} className="text-[12px] font-medium text-[var(--scory-text-brand)]">
              See all
            </Link>
          </div>
          <div className="h-rail flex gap-3 px-4">
            {live.map((match) => (
              <LiveMatchCard key={`${match.leagueId}-${match.id}`} match={match} layout="rail" />
            ))}
          </div>
        </section>
      ) : null}
      <DayHead
        query={query}
        timeZone={timeZone}
        hrefForDay={(day) => (day === "today" ? "/" : `/?day=${day}`)}
      />
      <div className="px-4 pb-10 pt-1">
        {error ? (
          <EmptyState title="Scores unavailable" body={error} actionHref="/" actionLabel="Retry" />
        ) : open.length === 0 && finished.length === 0 ? (
          <EmptyState
            title="No matches today"
            body="Follow teams and leagues to see their fixtures here."
            actionHref="/following"
            actionLabel="Following"
          />
        ) : (
          <div className="flex flex-col gap-2">
            {open.map((group) => (
              <LeagueGroupCard key={group.id} group={group} query={query} />
            ))}
            {finished.map((group) => (
              <LeagueGroupCard key={group.id} group={group} query={query} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export const HOME_QUERY: MatchesQuery = DEFAULT_MATCHES_QUERY;
