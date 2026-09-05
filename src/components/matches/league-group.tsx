import Link from "next/link";
import { ChevronDownGlyph } from "@/components/matches/figma-icons";
import { LeagueFlag } from "@/components/matches/league-flag";
import { MatchRow } from "@/components/matches/match-row";
import { leagueHref } from "@/lib/hrefs";
import type { MatchesQuery } from "@/lib/matches-query";
import type { LeagueGroup } from "@/lib/types";

function groupMeta(group: LeagueGroup): string {
  const round = group.matches.find((match) => match.round)?.round;
  return round || group.country;
}

export function LeagueGroupCard({
  group,
  query,
}: {
  group: LeagueGroup;
  query: MatchesQuery;
}) {
  return (
    <section className="flex w-full flex-col gap-2" data-league={group.id}>
      <header className="competition-header">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <LeagueFlag group={group} />
          <div className="flex min-w-0 flex-1 flex-col gap-[2px] overflow-hidden whitespace-nowrap">
            <Link
              href={leagueHref(group.id)}
              className="truncate text-[14px] font-medium leading-[20px] text-[var(--scory-text-primary,#ffffff)]"
            >
              {group.name}
            </Link>
            <p className="truncate text-[11px] font-normal leading-[14px] tracking-[0.1px] text-[var(--scory-text-secondary,#9ca3af)]">
              {groupMeta(group)}
            </p>
          </div>
        </div>
        <span className="shrink-0 text-[var(--scory-icon-default,#ffffff)]">
          <ChevronDownGlyph size={20} />
        </span>
      </header>
      <div className="grid grid-cols-1 gap-2">
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
