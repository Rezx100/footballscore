import Link from "next/link";
import { Crest } from "@/components/matches/crest";
import { BellGlyph, ChevronRightGlyph, ClockGlyph, PlusGlyph } from "@/components/matches/figma-icons";
import { Badge } from "@/components/scory/primitives";
import { matchHref, playerHref, teamHref } from "@/lib/hrefs";
import { isInPlay } from "@/lib/matches";
import type { Club, DualStat, Match, SquadPlayer, Team } from "@/lib/types";

export function LiveMatchCard({
  match,
  layout = "stack",
}: {
  match: Match;
  layout?: "rail" | "stack";
}) {
  const clock = match.status === "ht" ? "HT" : (match.minute ?? "LIVE");
  return (
    <Link
      href={matchHref(match.id, match.leagueId)}
      className={`scory-live-card scory-live-card--${layout}`}
      aria-label={`${match.home.name} versus ${match.away.name}, live ${clock}, ${match.homeScore ?? 0} to ${match.awayScore ?? 0}`}
    >
      <span className="scory-live-card__sheen" aria-hidden="true" />
      <span className="scory-live-card__mark" aria-hidden="true">
        {match.leagueName ?? match.leagueId}
      </span>
      <div className="relative z-[1] flex items-center justify-between">
        <Badge tone="live">
          <span className="live-dot inline-block size-1.5 rounded-full bg-white" />
          Live
        </Badge>
        <span className="flex items-center gap-1 text-[12px] font-medium leading-4">
          <ClockGlyph size={16} />
          {clock}
        </span>
      </div>
      <div className="relative z-[1] mt-2 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <div className="flex min-w-0 flex-col items-center gap-1">
          <Crest team={match.home} size={48} />
          <p className="w-full truncate text-center text-[11px] leading-[14px]">Home</p>
        </div>
        <p className="text-center text-[28px] font-bold leading-8 tabular-nums">
          {match.homeScore ?? 0}
          <span className="px-1.5 text-[20px] font-semibold text-white/80">:</span>
          {match.awayScore ?? 0}
        </p>
        <div className="flex min-w-0 flex-col items-center gap-1">
          <Crest team={match.away} size={48} />
          <p className="w-full truncate text-center text-[11px] leading-[14px]">Away</p>
        </div>
      </div>
      <div className="relative z-[1] mt-1 grid grid-cols-2 gap-2 text-[12px] font-medium leading-4">
        <p className="truncate text-center">{match.home.short}</p>
        <p className="truncate text-center">{match.away.short}</p>
      </div>
    </Link>
  );
}

export function FavoriteChip({
  club,
}: {
  club: Club;
}) {
  const team: Team = {
    id: club.id,
    name: club.name,
    short: club.short,
    color: club.color,
    logo: club.logo,
  };
  return (
    <Link href={teamHref(club.leagueId, club.id)} className="flex w-16 shrink-0 flex-col items-center gap-1">
      <Crest team={team} size={40} />
      <span className="w-full truncate text-center text-[11px] leading-[14px] text-[var(--scory-text-primary)]">
        {club.short}
      </span>
    </Link>
  );
}

export function FavoriteAddChip() {
  return (
    <Link href="/search" className="flex w-16 shrink-0 flex-col items-center gap-1">
      <span className="flex size-10 items-center justify-center rounded-full bg-[var(--scory-bg-chip)] text-[var(--scory-icon-muted)]">
        <PlusGlyph size={20} />
      </span>
      <span className="w-full text-center text-[11px] leading-[14px] text-[var(--scory-text-secondary)]">Add</span>
    </Link>
  );
}

export function UpcomingFixtureCard({ match }: { match: Match }) {
  const live = isInPlay(match);
  const scored = live || match.status === "ft";
  return (
    <Link href={matchHref(match.id, match.leagueId)} className="scory-fixture-card block">
      <p className="text-[12px] font-medium leading-4 text-[var(--scory-text-secondary)]">
        {match.leagueName ?? match.leagueId}
        {match.round ? ` · ${match.round}` : ""}
      </p>
      <p className="mt-1 text-[14px] font-semibold text-[var(--scory-text-primary)]">
        {live ? (match.minute ?? "LIVE") : match.status === "ft" ? "FT" : match.kickoff}
      </p>
      <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="flex min-w-0 flex-col items-center gap-2">
          <Crest team={match.home} size={48} />
          <p className="w-full truncate text-center text-[13px] font-medium">{match.home.name}</p>
        </div>
        <p className="text-[22px] font-bold tabular-nums">
          {scored ? (
            <>
              {match.homeScore ?? 0}
              <span className="px-1 text-[16px] text-[var(--scory-text-secondary)]">:</span>
              {match.awayScore ?? 0}
            </>
          ) : (
            "VS"
          )}
        </p>
        <div className="flex min-w-0 flex-col items-center gap-2">
          <Crest team={match.away} size={48} />
          <p className="w-full truncate text-center text-[13px] font-medium">{match.away.name}</p>
        </div>
      </div>
    </Link>
  );
}

export function DualStatBar({ stats }: { stats: DualStat[] }) {
  if (!stats.length) return null;
  return (
    <ul className="space-y-4">
      {stats.map((stat) => {
        const homeRaw = stat.homeValue ?? 0;
        const awayRaw = stat.awayValue ?? 0;
        const home = stat.pct && homeRaw <= 1 ? homeRaw * 100 : homeRaw;
        const away = stat.pct && awayRaw <= 1 ? awayRaw * 100 : awayRaw;
        const total = stat.pct ? 100 : home + away;
        const homePct = total > 0 ? Math.max(4, (home / total) * 100) : 0;
        const awayPct = total > 0 ? Math.max(4, (away / total) * 100) : 0;
        return (
          <li key={stat.key}>
            <div className="mb-1.5 flex items-center justify-between text-[12px]">
              <span className="tabular-nums text-[var(--scory-text-primary)]">{stat.home}</span>
              <span className="text-[var(--scory-text-secondary)]">{stat.label}</span>
              <span className="tabular-nums text-[var(--scory-text-primary)]">{stat.away}</span>
            </div>
            <div className="dual-bar">
              <span className="dual-bar__home h-full" style={{ width: `${homePct}%` }} />
              <span className="dual-bar__away h-full" style={{ width: `${awayPct}%` }} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function PlayerRow({
  player,
  league,
  teamId,
}: {
  player: SquadPlayer;
  league: string;
  teamId: string;
}) {
  return (
    <Link href={playerHref(player.id, league, teamId)} className="scory-player-row">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--scory-bg-surface)] text-[12px] font-semibold">
        {player.jersey ?? player.name.slice(0, 1)}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14px] font-medium leading-5">{player.name}</span>
        <span className="text-[12px] leading-4 text-[var(--scory-text-secondary)]">{player.position}</span>
      </span>
      <ChevronRightGlyph size={16} />
    </Link>
  );
}

export function TransferCard({
  player,
  from,
  to,
}: {
  player: string;
  from: string;
  to: string;
}) {
  return (
    <article className="scory-transfer-card">
      <p className="text-[16px] font-semibold leading-6">{player}</p>
      <p className="mt-3 text-[13px] text-[var(--scory-text-secondary)]">{from}</p>
      <p className="mt-1 text-[13px] text-[var(--scory-text-secondary)]">{to}</p>
    </article>
  );
}

export function NotifyBell() {
  return (
    <span className="text-[var(--scory-icon-default)]">
      <BellGlyph size={20} />
    </span>
  );
}
