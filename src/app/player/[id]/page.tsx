import { AppShell } from "@/components/app-shell";
import { AppHeader } from "@/components/scory/chrome";
import { EmptyState, InfoRow } from "@/components/scory/primitives";
import { Crest } from "@/components/matches/crest";
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
      <AppShell>
        <AppHeader />
        <EmptyState
          title="Player not in the feed"
          body="ESPN did not return a coherent profile for this athlete. Names stay on the lineup."
          actionHref="/matches"
          actionLabel="Back to scores"
        />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <AppHeader />
      <div className="px-4 pb-10 pt-4">
        <p className="text-[11px] tracking-[0.08em] text-[var(--muted)]">{player.position}</p>
        <h1 className="mt-1 text-[24px] font-semibold leading-none">{player.name}</h1>
        <div className="mt-4">
          {player.jersey ? <InfoRow label="Number" value={`#${player.jersey}`} /> : null}
          {player.age ? <InfoRow label="Age" value={String(player.age)} /> : null}
          {player.citizenship ? <InfoRow label="Country" value={player.citizenship} /> : null}
          {player.height ? <InfoRow label="Height" value={player.height} /> : null}
        </div>
        {player.team && league ? (
          <div className="mt-5 flex items-center justify-between">
            <Link href={teamHref(league, player.team.id)} className="flex items-center gap-2">
              <Crest team={player.team} size={40} />
              <span className="text-[15px] font-medium">{player.team.name}</span>
            </Link>
            <FollowButton league={league} teamId={player.team.id} />
          </div>
        ) : null}
      </div>
    </AppShell>
  );
}
