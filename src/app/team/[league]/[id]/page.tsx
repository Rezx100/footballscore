import { AppShell } from "@/components/app-shell";
import { AppHeader } from "@/components/scory/chrome";
import { EmptyState } from "@/components/ui/blocks";
import { TeamView, parseTeamTab } from "@/components/team/team-view";
import { getTeamPage } from "@/lib/espn/team-page";
import { serverPrefs } from "@/lib/server-state";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function TeamPage({
  params,
  searchParams,
}: {
  params: Promise<{ league: string; id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { league, id } = await params;
  const query = await searchParams;
  const tab = parseTeamTab(Array.isArray(query.tab) ? query.tab[0] : query.tab);
  const prefs = await serverPrefs();
  const page = await getTeamPage(decodeURIComponent(league), id, prefs);
  if (!page) {
    return (
      <AppShell>
        <AppHeader />
        <EmptyState title="Club not in the feed" body="ESPN did not return this club for that league." actionHref="/leagues" actionLabel="Explore leagues" />
      </AppShell>
    );
  }
  return (
    <AppShell>
      <TeamView page={page} league={decodeURIComponent(league)} tab={tab} />
    </AppShell>
  );
}
