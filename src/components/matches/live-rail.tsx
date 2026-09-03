import Link from "next/link";
import { Crest } from "@/components/matches/crest";
import { matchHref } from "@/lib/hrefs";
import type { Match } from "@/lib/types";

export function LiveRail({ matches }: { matches: Match[] }) {
  if (!matches.length) return null;
  return (
    <div className="live-rail border-b border-[var(--line)] px-4 py-2">
      <p className="sr-only">Live matches</p>
      <div className="h-rail flex gap-2">
        {matches.map((match) => (
          <Link
            key={`${match.leagueId}-${match.id}`}
            href={matchHref(match.id, match.leagueId)}
            className="flex shrink-0 items-center gap-2 rounded-[10px] bg-[var(--elev)] px-2.5 py-2"
            aria-label={`${match.home.name} versus ${match.away.name}, live ${match.minute ?? ""}`}
          >
            <Crest team={match.home} size={16} />
            <span className="font-board text-[12px] text-[var(--copper)]">
              {match.homeScore ?? "–"}–{match.awayScore ?? "–"}
            </span>
            <Crest team={match.away} size={16} />
            <span className="live-clock font-board text-[10px] text-[var(--copper)]">{match.minute ?? "LIVE"}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
