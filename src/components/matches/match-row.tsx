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
  const copy = statusCopy(match);

  if (live) {
    return (
      <span className="col-start-1 row-span-2 row-start-1 flex items-center gap-1.5 self-center">
        <span
          className="live-dot h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--copper)]"
          aria-hidden="true"
        />
        <span className="live-clock font-board text-[11px] tracking-[0.04em] text-[var(--copper)]">
          {copy}
        </span>
      </span>
    );
  }

  return (
    <span className="col-start-1 row-span-2 row-start-1 self-center font-board text-[11px] tracking-[0.02em] text-[var(--muted)]">
      {copy}
    </span>
  );
}

function TeamLine({
  team,
  score,
  showScore,
  fade,
  win,
}: {
  team: Match["home"];
  score: number | null | undefined;
  showScore: boolean;
  fade: boolean;
  win: boolean;
}) {
  return (
    <>
      <span className={`flex items-center justify-center ${fade ? "opacity-35" : ""}`}>
        <Crest team={team} size={22} />
      </span>
      <span
        className={`font-cond min-w-0 truncate text-[15px] tracking-[-0.01em] ${
          fade ? "text-[var(--muted)]" : "text-[var(--ink)]"
        }`}
      >
        {team.name}
      </span>
      <span
        className={`text-right font-board text-[20px] leading-none tabular-nums ${
          fade
            ? "text-[var(--muted)]"
            : win
              ? "text-[var(--ink)]"
              : "text-[var(--ink)]"
        } ${win ? "font-medium" : ""}`}
      >
        {showScore ? (score ?? "–") : ""}
      </span>
    </>
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
  const homeWin = decided && match.homeScore! > match.awayScore!;
  const awayWin = decided && match.awayScore! > match.homeScore!;
  const showScore = match.status === "live" || match.status === "ht" || match.status === "ft";
  const live = match.status === "live" || match.status === "ht";

  return (
    <Link
      href={matchesHref({ ...query, match: match.id, tab: "matches" })}
      aria-current={selected ? "true" : undefined}
      aria-label={`${match.home.name} versus ${match.away.name}, ${result}`}
      className={`match-row relative grid min-h-[4rem] grid-cols-[2.75rem_22px_minmax(0,1fr)_1.75rem] items-center gap-x-3 gap-y-1.5 px-4 py-3 transition-[background-color,box-shadow] duration-160 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
        selected
          ? "bg-[color-mix(in_srgb,var(--ink)_6%,transparent)]"
          : "hover:bg-[color-mix(in_srgb,var(--ink)_3.5%,transparent)]"
      } ${live ? "match-row--live" : ""}`}
    >
      {live ? (
        <span
          className="absolute inset-y-2 left-0 w-[2px] rounded-full bg-[var(--copper)]"
          aria-hidden="true"
        />
      ) : null}
      <StatusCell match={match} />
      <TeamLine
        team={match.home}
        score={match.homeScore}
        showScore={showScore}
        fade={homeFade}
        win={homeWin}
      />
      <TeamLine
        team={match.away}
        score={match.awayScore}
        showScore={showScore}
        fade={awayFade}
        win={awayWin}
      />
    </Link>
  );
}
