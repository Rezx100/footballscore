import { AppShell } from "@/components/app-shell";
import { AppHeader } from "@/components/scory/chrome";
import { EmptyState } from "@/components/ui/blocks";
import { MatchView, parsePanel } from "@/components/match/match-view";
import { getMatchDetail } from "@/lib/espn/match-page";
import { serverPrefs } from "@/lib/server-state";

export const dynamic = "force-dynamic";
export const revalidate = 15;

export default async function MatchPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const league = Array.isArray(query.league) ? query.league[0] : query.league;
  const panel = parsePanel(Array.isArray(query.panel) ? query.panel[0] : query.panel);
  const side = (Array.isArray(query.side) ? query.side[0] : query.side) === "away" ? "away" : "home";
  const prefs = await serverPrefs();

  if (!league) {
    return (
      <AppShell>
        <AppHeader />
        <EmptyState
          title="Competition missing"
          body="Open this match from Scores so we know which league ESPN should use."
          actionHref="/matches"
          actionLabel="Back to scores"
        />
      </AppShell>
    );
  }

  const detail = await getMatchDetail(league, id, prefs);
  if (!detail) {
    return (
      <AppShell>
        <AppHeader />
        <EmptyState
          title="Match not in the feed"
          body="ESPN did not return this fixture. It may have been removed or the id is stale."
          actionHref="/matches"
          actionLabel="Back to scores"
        />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <MatchView detail={detail} panel={panel} side={side} />
    </AppShell>
  );
}
