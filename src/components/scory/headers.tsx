import Link from "next/link";
import { Crest } from "@/components/matches/crest";
import { BackGlyph } from "@/components/matches/figma-icons";
import { FollowButton } from "@/components/follow/follow-button";
import { ShareButton } from "@/components/follow/share-button";
import { KickoffCountdown } from "@/components/scory/countdown";
import { Badge } from "@/components/scory/primitives";
import { UnderlineTabs } from "@/components/scory/primitives";
import { matchHref, teamHref } from "@/lib/hrefs";
import { isInPlay } from "@/lib/matches";
import type { Match, Team } from "@/lib/types";

export function TeamDetailHeader({
  club,
  league,
  country,
  players,
  tabs,
  tab,
  backHref = "/leagues",
}: {
  club: Team & { leagueId?: string };
  league: string;
  country?: string;
  players?: number;
  tabs: { href: string; label: string; value: string }[];
  tab: string;
  backHref?: string;
}) {
  return (
    <header className="team-hero">
      <div className="flex items-center justify-between">
        <Link
          href={backHref}
          aria-label="Back"
          className="scory-icon-btn scory-icon-btn--soft"
        >
          <BackGlyph size={20} />
        </Link>
        <ShareButton
          title={club.name}
          url={teamHref(league, club.id)}
          variant="icon"
        />
      </div>
      <div className="mt-3 flex flex-col items-center gap-2 pb-3">
        <Crest team={club} size={64} />
        <h1 className="text-center text-[24px] font-semibold leading-8">{club.name}</h1>
        <FollowButton league={league} teamId={club.id} variant="heart" />
        <div className="flex items-center gap-2 text-[12px] leading-4">
          {players != null ? <span>{players} Players</span> : null}
          {country ? (
            <span className="rounded-full bg-black/20 px-2 py-0.5">{country}</span>
          ) : null}
        </div>
      </div>
      <UnderlineTabs items={tabs} value={tab} />
    </header>
  );
}

export function MatchHero({
  match,
  competition,
  round,
}: {
  match: Match;
  competition?: string;
  round?: string;
}) {
  const live = isInPlay(match);
  const finished = match.status === "ft";
  const title = [competition ?? match.leagueName, round].filter(Boolean).join(" · ");

  if (live || finished) {
    return (
      <header className="match-hero">
        <div className="flex items-center justify-between">
          <Badge tone={live ? "live" : "ft"}>{live ? "Live" : "FT"}</Badge>
          <ShareButton
            title={`${match.home.name} vs ${match.away.name}`}
            url={matchHref(match.id, match.leagueId)}
            variant="icon"
          />
        </div>
        {title ? <p className="mt-3 text-center text-[12px] text-white/80">{title}</p> : null}
        <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <Link href={teamHref(match.leagueId, match.home.id)} className="flex min-w-0 flex-col items-center gap-2">
            <Crest team={match.home} size={56} />
            <span className="w-full truncate text-center text-[13px] font-medium">{match.home.name}</span>
          </Link>
          <div className="text-center">
            <p className="text-[32px] font-bold leading-9 tabular-nums">
              {match.homeScore ?? 0}
              <span className="px-1.5 text-[22px] font-semibold text-white/70">:</span>
              {match.awayScore ?? 0}
            </p>
            <p className="mt-1 text-[12px] font-medium">{live ? (match.minute ?? "LIVE") : "Full time"}</p>
          </div>
          <Link href={teamHref(match.leagueId, match.away.id)} className="flex min-w-0 flex-col items-center gap-2">
            <Crest team={match.away} size={56} />
            <span className="w-full truncate text-center text-[13px] font-medium">{match.away.name}</span>
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="match-hero">
      <div className="flex items-center justify-end">
        <ShareButton
          title={`${match.home.name} vs ${match.away.name}`}
          url={matchHref(match.id, match.leagueId)}
          variant="icon"
        />
      </div>
      {title ? <p className="text-center text-[12px] text-white/80">{title}</p> : null}
      <p className="mt-2 text-center text-[14px] font-medium">Kick off in</p>
      <KickoffCountdown iso={match.kickoffIso} />
      <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <Link href={teamHref(match.leagueId, match.home.id)} className="flex min-w-0 flex-col items-center gap-2">
          <Crest team={match.home} size={56} />
          <span className="w-full truncate text-center text-[13px] font-medium">{match.home.name}</span>
        </Link>
        <p className="text-[18px] font-semibold tracking-[0.2em] text-white/80">VS</p>
        <Link href={teamHref(match.leagueId, match.away.id)} className="flex min-w-0 flex-col items-center gap-2">
          <Crest team={match.away} size={56} />
          <span className="w-full truncate text-center text-[13px] font-medium">{match.away.name}</span>
        </Link>
      </div>
    </header>
  );
}
