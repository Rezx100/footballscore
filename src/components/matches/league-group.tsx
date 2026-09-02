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
      <header className="flex items-center gap-2 px-5 pt-6 pb-2">
        <LeagueFlag group={group} />
        <h2 className="font-cond text-[12px] text-[var(--muted)]">{group.name}</h2>
      </header>
      <div className="divide-y divide-[var(--line)] border-t border-[var(--line)]">
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
