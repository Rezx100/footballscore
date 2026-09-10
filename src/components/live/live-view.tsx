import { AppHeader } from "@/components/scory/chrome";
import { LiveMatchCard } from "@/components/scory/cards";
import { EmptyState } from "@/components/scory/primitives";
import type { FollowState } from "@/lib/follow";
import { collectLiveMatches } from "@/lib/matches";
import type { LeagueGroup } from "@/lib/types";

export function LiveView({ groups, follow }: { groups: LeagueGroup[]; follow: FollowState }) {
  const live = collectLiveMatches(groups, follow);
  return (
    <div className="bg-[var(--bg)] text-[var(--ink)]">
      <AppHeader />
      <div className="px-4 pb-10 pt-3">
        <h1 className="text-[18px] font-semibold leading-6">Live Matches</h1>
        {live.length ? (
          <div className="mt-3 flex flex-col gap-3">
            {live.map((match) => (
              <LiveMatchCard key={`${match.leagueId}-${match.id}`} match={match} layout="stack" />
            ))}
          </div>
        ) : (
          <div className="mt-4">
            <EmptyState
              title="No live matches"
              body="Nothing is in play in the ESPN football feed right now."
              actionHref="/matches"
              actionLabel="See upcoming"
            />
          </div>
        )}
      </div>
    </div>
  );
}
