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
    <section className="mx-4 overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--surface)]">
      <header className="flex items-center gap-2.5 px-4 pt-3.5 pb-2.5">
        <LeagueFlag group={group} />
        <h2 className="font-cond text-[12px] tracking-[0.02em] text-[var(--muted)]">
          {group.name}
        </h2>
      </header>
      <div className="divide-y divide-[color-mix(in_srgb,var(--line)_70%,transparent)] border-t border-[color-mix(in_srgb,var(--line)_70%,transparent)]">
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
