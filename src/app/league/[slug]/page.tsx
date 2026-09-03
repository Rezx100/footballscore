import { LeagueView, parseLeagueTab } from "@/components/league/league-view";
import { PageShell } from "@/components/shell/page-shell";
import { getLeaguePage } from "@/lib/espn/league-page";
import { leaguePaletteVars, paletteForLeague } from "@/lib/league-palette";
import { serverPrefs } from "@/lib/server-state";

export const dynamic = "force-dynamic";
export const revalidate = 30;

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
  const palette = paletteForLeague({ id: page.meta.slug, name: page.meta.name, country: page.meta.country });

  return (
    <PageShell siloVars={leaguePaletteVars(palette)}>
      <LeagueView page={page} tab={tab} teamFilter={team} />
    </PageShell>
  );
}
