import { EmptyState } from "@/components/ui/blocks";
import { PageShell, SiteLockup } from "@/components/shell/page-shell";
import { TeamView } from "@/components/team/team-view";
import { getTeamPage } from "@/lib/espn/team-page";
import { serverPrefs } from "@/lib/server-state";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function TeamPage({
  params,
}: {
  params: Promise<{ league: string; id: string }>;
}) {
  const { league, id } = await params;
  const prefs = await serverPrefs();
  const page = await getTeamPage(decodeURIComponent(league), id, prefs);
  if (!page) {
    return (
      <PageShell masthead={<header className="px-4 pt-4"><SiteLockup /></header>}>
        <EmptyState title="Club not in the feed" body="ESPN did not return this club for that league." actionHref="/leagues" actionLabel="Explore leagues" />
      </PageShell>
    );
  }
  return (
    <PageShell>
      <TeamView page={page} league={decodeURIComponent(league)} />
    </PageShell>
  );
}
