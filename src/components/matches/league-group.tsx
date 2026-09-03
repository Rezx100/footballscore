import { LeagueFlag } from "@/components/matches/league-flag";
import { MatchRow } from "@/components/matches/match-row";
import type { MatchesQuery } from "@/lib/matches-query";
import type { LeagueGroup } from "@/lib/types";

/** Home / Scores list — neutral chrome. League brand color is reserved for league silo pages. */
export function LeagueGroupCard({
  group,
  query,
}: {
  group: LeagueGroup;
  query: MatchesQuery;
}) {
  return (
    <section className="px-4" data-league={group.id}>
      <header className="flex items-center gap-2.5 px-0.5 pb-2.5 pt-1">
        <LeagueFlag group={group} />
        <h2 className="font-cond min-w-0 flex-1 truncate text-[13px] tracking-[0.01em] text-[var(--ink)]">
          {group.name}
        </h2>
        <span
          className="font-board text-[11px] tracking-[0.08em] text-[var(--muted)]"
          aria-hidden="true"
        >
          {group.matches.length}
        </span>
      </header>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {group.matches.map((match) => (
          <MatchRow
            key={match.id}
            match={match}
            selected={query.match === match.id}
            query={query}
          />
        ))}
      </div>
    </section>
  );
}
