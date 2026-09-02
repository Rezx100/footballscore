import type { CSSProperties } from "react";
import { LeagueFlag } from "@/components/matches/league-flag";
import { MatchRow } from "@/components/matches/match-row";
import { leaguePaletteVars, paletteForLeague } from "@/lib/league-palette";
import type { MatchesQuery } from "@/lib/matches-query";
import type { LeagueGroup } from "@/lib/types";

export function LeagueGroupCard({
  group,
  query,
}: {
  group: LeagueGroup;
  query: MatchesQuery;
}) {
  const palette = paletteForLeague(group);

  return (
    <section
      className="league-section relative px-4"
      style={leaguePaletteVars(palette) as CSSProperties}
      data-league={group.id}
      data-league-palette={palette.label}
    >
      <div className="league-section__aura" aria-hidden="true" />
      <header className="relative z-[1] flex items-center gap-2.5 px-0.5 pb-2.5 pt-1">
        <span className="league-section__chip" aria-hidden="true" />
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
      <div className="relative z-[1] grid grid-cols-1 gap-2 sm:grid-cols-2">
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
