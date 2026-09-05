import { AppShell } from "@/components/app-shell";
import { LeagueView, parseLeagueTab } from "@/components/league/league-view";
import { getLeaguePage } from "@/lib/espn/league-page";
import { serverPrefs } from "@/lib/server-state";

export const dynamic = "force-dynamic";
export const revalidate = 30;
export const maxDuration = 20;

export default async function LeaguePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  const tab = parseLeagueTab(Array.isArray(query.tab) ? query.tab[0] : query.tab);
  const date = Array.isArray(query.date) ? query.date[0] : query.date;
  const team = Array.isArray(query.team) ? query.team[0] : query.team;
  const prefs = await serverPrefs();
  const page = await getLeaguePage(decodeURIComponent(slug), prefs, date, team);

  return (
    <AppShell>
      <LeagueView page={page} tab={tab} teamFilter={team} />
    </AppShell>
  );
}
