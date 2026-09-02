import { LeagueFlag } from "@/components/matches/league-flag";
import { MatchRow } from "@/components/matches/match-row";
import type { MatchesQuery } from "@/lib/matches-query";
import type { LeagueGroup } from "@/lib/types";

export function LeagueGroupCard({
  group,
  query,
}: {
  group: LeagueGroup;
  query: MatchesQuery;
}) {
  return (
    <section>
      <header className="flex items-center gap-2 px-4 pt-5 pb-1.5">
        <LeagueFlag group={group} />
        <h2 className="text-[12px] font-medium text-[var(--muted)]">{group.name}</h2>
      </header>
      <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
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
