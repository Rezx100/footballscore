import Link from "next/link";
import type { CSSProperties } from "react";
import { Crest } from "@/components/matches/crest";
import { matchHref } from "@/lib/hrefs";
import type { Match, Team } from "@/lib/types";

function statusCopy(match: Match): string {
  if (match.status === "live") return match.minute ?? "LIVE";
  if (match.status === "ht") return "HT";
  if (match.status === "ft") return "FT";
  if (match.status === "ab") return "AB";
  if (match.status === "pp") return "PP";
  return match.kickoff;
}

function metaRight(match: Match): string | null {
  if (match.status === "live") return "LIVE";
  if (match.status === "ht") return "HALF";
  return null;
}

function TeamRow({
  team,
  score,
  showScore,
  fade,
  win,
}: {
  team: Team;
  score: number | null | undefined;
  showScore: boolean;
  fade: boolean;
  win: boolean;
}) {
  return (
    <div className="grid grid-cols-[24px_minmax(0,1fr)_auto] items-center gap-x-2.5">
      <span className={`flex items-center justify-center ${fade ? "opacity-40" : ""}`}>
        <Crest team={team} size={24} />
      </span>
      <div className="min-w-0">
        <p
          className={`font-cond truncate text-[15px] leading-tight tracking-[-0.01em] ${
            fade ? "text-[var(--muted)]" : "text-[var(--ink)]"
          }`}
        >
          {team.name}
        </p>
        <p className="font-board mt-0.5 text-[10px] tracking-[0.08em] text-[var(--muted)]">
          {team.short}
        </p>
      </div>
      <span
        className={`score-digit min-w-[1.25rem] text-right font-board text-[22px] leading-none ${
          fade ? "text-[var(--muted)]" : "text-[var(--ink)]"
        } ${win ? "font-medium" : ""}`}
      >
        {showScore ? (score ?? "–") : ""}
      </span>
    </div>
  );
}

export function MatchRow({
  match,
  selected = false,
}: {
  match: Match;
  selected?: boolean;
  query?: unknown;
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
  const copy = statusCopy(match);
  const right = metaRight(match);

  return (
    <Link
      href={matchHref(match.id, match.leagueId)}
      aria-current={selected ? "true" : undefined}
      aria-label={`${match.home.name} versus ${match.away.name}, ${result}`}
      className={`score-card group relative block overflow-hidden rounded-[12px] transition-[transform,background-color,border-color] duration-160 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
        selected ? "score-card--selected" : ""
      } ${live ? "score-card--live" : ""}`}
      style={
        {
          "--home-tint": match.home.color || "#8a8278",
          "--away-tint": match.away.color || "#8a8278",
        } as CSSProperties
      }
    >
      <span className="score-card__wash" aria-hidden="true" />
      <span className="score-card__rail" aria-hidden="true" />

      <div className="relative z-[1] px-3.5 py-3">
        <div className="mb-2.5 flex items-center justify-between gap-3">
          <span className="flex min-w-0 items-center gap-1.5">
            {live ? (
              <span
                className="live-dot h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--copper)]"
                aria-hidden="true"
              />
            ) : null}
            <span
              className={`font-board text-[11px] tracking-[0.06em] ${
                live ? "live-clock text-[var(--copper)]" : "text-[var(--muted)]"
              }`}
            >
              {copy}
            </span>
          </span>
          {right ? (
            <span className="font-board shrink-0 text-[10px] tracking-[0.12em] text-[var(--copper)]">
              {right}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-2.5">
          <TeamRow
            team={match.home}
            score={match.homeScore}
            showScore={showScore}
            fade={homeFade}
            win={homeWin}
          />
          <TeamRow
            team={match.away}
            score={match.awayScore}
            showScore={showScore}
            fade={awayFade}
            win={awayWin}
          />
        </div>
      </div>
    </Link>
  );
}
