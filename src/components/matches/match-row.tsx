import Link from "next/link";
import { BoardFlap } from "@/components/brand/flap";
import { Crest } from "@/components/matches/crest";
import { matchesHref, type MatchesQuery } from "@/lib/matches-query";
import type { Match } from "@/lib/types";

function statusCopy(match: Match): string {
  if (match.status === "live") return match.minute ?? "LIVE";
  if (match.status === "ht") return "HT";
  if (match.status === "ft") return "FT";
  if (match.status === "ab") return "AB";
  if (match.status === "pp") return "PP";
  return match.kickoff;
}

function TimeCell({ match }: { match: Match }) {
  const live = match.status === "live" || match.status === "ht";
  const copy = statusCopy(match);
  if (live) {
    return (
      <span className="col-start-1 row-start-1 row-span-2 self-center">
        <BoardFlap tone="live" width={52} height={32}>
          <span className="live-clock font-board text-[11px] text-[var(--ink)]">{copy}</span>
        </BoardFlap>
      </span>
    );
  }
  return (
    <span className="col-start-1 row-start-1 row-span-2 self-center font-board text-[11px] text-[var(--muted)]">
      {copy}
    </span>
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
            : match.status === "ab"
              ? "abandoned"
              : "postponed";

  const decided =
    match.status === "ft" && match.homeScore != null && match.awayScore != null;
  const homeFade = decided && match.homeScore! < match.awayScore!;
  const awayFade = decided && match.awayScore! < match.homeScore!;
  const showScore = match.status === "live" || match.status === "ht" || match.status === "ft";

  return (
    <Link
      href={matchesHref({ ...query, match: match.id, tab: "matches" })}
      aria-current={selected ? "true" : undefined}
      aria-label={`${match.home.name} versus ${match.away.name}, ${result}`}
      className={`grid min-h-[3.5rem] grid-cols-[3.4rem_18px_minmax(0,1fr)_1.5rem] items-center gap-x-2.5 gap-y-1 px-5 py-2 ${
        selected ? "bg-[color-mix(in_srgb,var(--ink)_7%,transparent)]" : ""
      }`}
    >
      <TimeCell match={match} />
      <span className={homeFade ? "opacity-40" : undefined}>
        <Crest team={match.home} size={18} />
      </span>
      <span
        className={`font-cond min-w-0 truncate text-[15px] ${
          homeFade ? "text-[var(--muted)]" : "text-[var(--ink)]"
        }`}
      >
        {match.home.name}
      </span>
      <span
        className={`text-right font-board text-[18px] leading-none ${
          homeFade ? "text-[var(--muted)]" : "text-[var(--ink)]"
        }`}
      >
        {showScore ? (match.homeScore ?? "–") : ""}
      </span>
      <span className={awayFade ? "opacity-40" : undefined}>
        <Crest team={match.away} size={18} />
      </span>
      <span
        className={`font-cond min-w-0 truncate text-[15px] ${
          awayFade ? "text-[var(--muted)]" : "text-[var(--ink)]"
        }`}
      >
        {match.away.name}
      </span>
      <span
        className={`text-right font-board text-[18px] leading-none ${
          awayFade ? "text-[var(--muted)]" : "text-[var(--ink)]"
        }`}
      >
        {showScore ? (match.awayScore ?? "–") : ""}
      </span>
    </Link>
  );
}
