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
    <section className="overflow-hidden rounded-[var(--radius-card)] bg-[var(--surface)] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <header className="flex items-center gap-2 px-3 py-2.5">
        <LeagueFlag group={group} />
        <h2 className="text-[13px] font-semibold text-[var(--ink)]">{group.name}</h2>
      </header>
      <div className="divide-y divide-[var(--line)]">
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
