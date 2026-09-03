import Link from "next/link";
import type { CSSProperties } from "react";
import { FollowButton } from "@/components/follow/follow-button";
import { ShareButton } from "@/components/follow/share-button";
import { Crest } from "@/components/matches/crest";
import { leagueHref, matchHref, teamHref } from "@/lib/hrefs";
import type { Match } from "@/lib/types";

function statusCopy(match: Match): string {
  if (match.status === "live") return match.minute ?? "LIVE";
  if (match.status === "ht") return "HT";
  if (match.status === "ft") return "FT";
  if (match.status === "ab") return "AB";
  if (match.status === "pp") return "PP";
  return match.kickoff;
}

export function StickyScoreboard({
  match,
  competition,
  round,
}: {
  match: Match;
  competition?: string;
  round?: string;
}) {
  const live = match.status === "live" || match.status === "ht";
  const showScore = match.status === "live" || match.status === "ht" || match.status === "ft";
  return (
    <div
      className="sticky top-0 z-20 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_92%,transparent)] px-4 py-3 backdrop-blur-md"
      style={{ "--home-tint": match.home.color, "--away-tint": match.away.color } as CSSProperties}
    >
      <div className="relative overflow-hidden rounded-[12px] px-3 py-3">
        <span
          className="pointer-events-none absolute inset-y-2 left-0 w-[3px] rounded-full"
          style={{ background: `linear-gradient(to bottom, ${match.home.color}, ${match.away.color})` }}
        />
        <div className="flex items-center justify-between gap-3 pl-2">
          <div className="min-w-0">
            {competition ? (
              <Link href={leagueHref(match.leagueId)} className="font-board text-[10px] tracking-[0.08em] text-[var(--muted)]">
                {competition}
                {round ? ` · ${round}` : ""}
              </Link>
            ) : null}
            <p
              className={`font-board mt-1 text-[11px] tracking-[0.06em] ${live ? "live-clock text-[var(--copper)]" : "text-[var(--muted)]"}`}
              aria-label={live ? `live ${match.minute ?? ""}` : statusCopy(match)}
            >
              {statusCopy(match)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FollowButton league={match.leagueId} teamId={match.home.id} label="Home" />
            <FollowButton league={match.leagueId} teamId={match.away.id} label="Away" />
            <ShareButton title={`${match.home.name} vs ${match.away.name}`} url={matchHref(match.id, match.leagueId)} />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3 pl-2">
          <Link href={teamHref(match.leagueId, match.home.id)} className="flex min-w-0 flex-col items-start gap-2">
            <Crest team={match.home} size={48} />
            <span className="font-cond truncate text-[16px] leading-tight">{match.home.name}</span>
          </Link>
          <p className="font-board score-digit text-[32px] leading-none">
            {showScore ? `${match.homeScore ?? "–"}–${match.awayScore ?? "–"}` : match.kickoff}
          </p>
          <Link href={teamHref(match.leagueId, match.away.id)} className="flex min-w-0 flex-col items-end gap-2 text-right">
            <Crest team={match.away} size={48} />
            <span className="font-cond truncate text-[16px] leading-tight">{match.away.name}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
