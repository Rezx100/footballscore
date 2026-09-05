import Link from "next/link";
import { Crest } from "@/components/matches/crest";
import { BellGlyph } from "@/components/matches/figma-icons";
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

function TeamRow({ team }: { team: Team }) {
  return (
    <div className="flex w-full items-center gap-[10px]">
      <Crest team={team} size={24} />
      <p className="min-w-0 flex-1 truncate text-[14px] font-normal leading-[20px] text-[var(--scory-text-primary,#ffffff)]">
        {team.name}
      </p>
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

  const copy = statusCopy(match);

  return (
    <Link
      href={matchHref(match.id, match.leagueId)}
      aria-current={selected ? "true" : undefined}
      aria-label={`${match.home.name} versus ${match.away.name}, ${result}`}
      className={`score-card flex h-[84px] w-full items-center justify-between gap-0 overflow-hidden rounded-[12px] bg-[var(--scory-bg-chip,#1f2937)] p-3 ${
        selected ? "score-card--selected" : ""
      }`}
    >
      <p className="shrink-0 whitespace-nowrap text-[16px] font-semibold leading-[20px] text-[var(--scory-text-primary,#ffffff)]">
        {copy}
      </p>
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <TeamRow team={match.home} />
        <TeamRow team={match.away} />
      </div>
      <span className="shrink-0 text-[var(--scory-icon-default,#ffffff)]">
        <BellGlyph size={20} />
      </span>
    </Link>
  );
}
