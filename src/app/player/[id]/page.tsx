import { EmptyState } from "@/components/ui/blocks";
import { Crest } from "@/components/matches/crest";
import { PageShell, SiteLockup } from "@/components/shell/page-shell";
import { FollowButton } from "@/components/follow/follow-button";
import { getPlayerPage } from "@/lib/espn/player-page";
import { teamHref } from "@/lib/hrefs";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 300;

export default async function PlayerPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const league = Array.isArray(query.league) ? query.league[0] : query.league;
  const team = Array.isArray(query.team) ? query.team[0] : query.team;
  const player = await getPlayerPage(id, league, team);

  if (!player) {
    return (
      <PageShell masthead={<header className="px-4 pt-4"><SiteLockup /></header>}>
        <EmptyState
          title="Player not in the feed"
          body="ESPN did not return a coherent profile for this athlete. Names stay on the lineup."
          actionHref="/matches"
          actionLabel="Back to scores"
        />
      </PageShell>
    );
  }

  return (
    <PageShell
      masthead={
        <header className="px-4 pt-4 pb-2">
          <SiteLockup />
        </header>
      }
    >
      <div className="px-4 pb-10 pt-4">
        <p className="font-board text-[11px] tracking-[0.08em] text-[var(--muted)]">{player.position}</p>
        <h1 className="font-cond mt-1 text-[24px] leading-none">{player.name}</h1>
        <p className="font-board mt-2 text-[13px] text-[var(--muted)]">
          {[player.jersey ? `#${player.jersey}` : null, player.age ? `${player.age}` : null, player.citizenship, player.height]
            .filter(Boolean)
            .join(" · ")}
        </p>
        {player.team && league ? (
          <div className="mt-5 flex items-center justify-between">
            <Link href={teamHref(league, player.team.id)} className="flex items-center gap-2">
              <Crest team={player.team} size={28} />
              <span className="font-cond text-[15px]">{player.team.name}</span>
            </Link>
            <FollowButton league={league} teamId={player.team.id} />
          </div>
        ) : null}
      </div>
    </PageShell>
  );
}
