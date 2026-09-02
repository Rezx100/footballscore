import Link from "next/link";
import { Crest } from "@/components/matches/crest";
import { TvIcon } from "@/components/matches/icons";
import { matchesHref, type MatchesQuery } from "@/lib/matches-query";
import type { Match } from "@/lib/types";

function CenterCell({ match }: { match: Match }) {
  if (match.status === "live" || match.status === "ht") {
    return (
      <div className="flex w-[72px] shrink-0 flex-col items-center leading-none">
        <span className="text-[11px] font-semibold text-[var(--live)]">
          {match.status === "ht" ? "HT" : match.minute}
        </span>
        <span className="mt-1 text-[15px] font-bold tabular-nums text-[var(--ink)]">
          {match.homeScore} - {match.awayScore}
        </span>
      </div>
    );
  }

  if (match.status === "ft") {
    return (
      <div className="flex w-[72px] shrink-0 flex-col items-center leading-none">
        <span className="rounded-full bg-[#EFEFEF] px-1.5 py-[2px] text-[10px] font-semibold tracking-wide text-[var(--muted)]">
          FT
        </span>
        <span className="mt-1 text-[15px] font-bold tabular-nums text-[var(--ink)]">
          {match.homeScore} - {match.awayScore}
        </span>
      </div>
    );
  }

  if (match.status === "pp") {
    return (
      <div className="flex w-[72px] shrink-0 flex-col items-center">
        <span className="rounded-full bg-[#EFEFEF] px-1.5 py-[2px] text-[10px] font-semibold text-[var(--muted)]">
          PP
        </span>
        <span className="mt-1 text-[13px] text-[var(--muted)]">—</span>
      </div>
    );
  }

  return (
    <div className="flex w-[72px] shrink-0 items-center justify-center">
      <span className="text-[13px] font-semibold tabular-nums text-[var(--ink)]">
        {match.kickoff}
      </span>
    </div>
  );
}

export function MatchRow({
  match,
  selected,
  query,
}: {
  match: Match;
  selected: boolean;
  query: MatchesQuery;
}) {
  const result =
    match.status === "ns"
      ? `kicks off at ${match.kickoff}`
      : match.status === "live"
        ? `live ${match.minute}, ${match.homeScore} to ${match.awayScore}`
        : match.status === "ft"
          ? `full time ${match.homeScore} to ${match.awayScore}`
          : match.status === "ht"
            ? `half time ${match.homeScore} to ${match.awayScore}`
            : "postponed";

  return (
    <Link
      href={matchesHref({ ...query, match: match.id, tab: "matches" })}
      aria-current={selected ? "true" : undefined}
      aria-label={`${match.home.name} versus ${match.away.name}, ${result}`}
      className={`flex w-full items-center gap-1.5 px-3 py-2.5 text-left no-underline transition-colors ${
        selected ? "bg-[#F3FBF6]" : "bg-white hover:bg-[#FAFAFA] active:bg-[#F4F4F5]"
      }`}
    >
      <span className="min-w-0 flex-1 truncate text-right text-[13px] font-medium text-[var(--ink)]">
        {match.home.name}
      </span>
      <Crest team={match.home} />
      <CenterCell match={match} />
      <Crest team={match.away} />
      <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-[var(--ink)]">
        {match.away.name}
      </span>
      <span className="w-4 shrink-0 text-[var(--muted)]">
        {match.hasTv ? <TvIcon className="h-3.5 w-3.5" /> : null}
      </span>
    </Link>
  );
}
