import Link from "next/link";
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

function StatusCell({ match }: { match: Match }) {
  const live = match.status === "live" || match.status === "ht";
  return (
    <span
      className={`col-start-4 row-start-1 row-span-2 self-center text-right text-[11px] font-semibold tabular-nums ${
        live ? "live-clock text-[var(--live)]" : "text-[var(--muted)]"
      }`}
    >
      {statusCopy(match)}
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
      className={`grid min-h-16 grid-cols-[20px_minmax(0,1fr)_1.75rem_4.5rem] items-center gap-x-2.5 gap-y-1 border-l-2 px-4 py-2.5 ${
        selected
          ? "border-[var(--ink)] bg-[color-mix(in_srgb,var(--ink)_8%,transparent)]"
          : "border-transparent hover:bg-[color-mix(in_srgb,var(--ink)_5%,transparent)]"
      }`}
    >
      <span className={homeFade ? "opacity-40" : undefined}>
        <Crest team={match.home} />
      </span>
      <span
        className={`min-w-0 truncate text-[15px] font-medium ${
          homeFade ? "text-[var(--muted)]" : "text-[var(--ink)]"
        }`}
      >
        {match.home.name}
      </span>
      <span
        className={`text-right text-[20px] font-bold tabular-nums leading-none ${
          homeFade ? "text-[var(--muted)]" : "text-[var(--ink)]"
        }`}
      >
        {showScore ? (match.homeScore ?? "–") : ""}
      </span>
      <StatusCell match={match} />
      <span className={awayFade ? "opacity-40" : undefined}>
        <Crest team={match.away} />
      </span>
      <span
        className={`min-w-0 truncate text-[15px] font-medium ${
          awayFade ? "text-[var(--muted)]" : "text-[var(--ink)]"
        }`}
      >
        {match.away.name}
      </span>
      <span
        className={`text-right text-[20px] font-bold tabular-nums leading-none ${
          awayFade ? "text-[var(--muted)]" : "text-[var(--ink)]"
        }`}
      >
        {showScore ? (match.awayScore ?? "–") : ""}
      </span>
    </Link>
  );
}
