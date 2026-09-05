import { AppShell } from "@/components/app-shell";
import { LiveView } from "@/components/live/live-view";
import { getMatchesForDay } from "@/lib/espn/matches";
import { serverFollow, serverPrefs } from "@/lib/server-state";

export const dynamic = "force-dynamic";
export const revalidate = 15;
export const maxDuration = 20;

export default async function LivePage() {
  const [prefs, follow] = await Promise.all([serverPrefs(), serverFollow()]);
  const { groups } = await getMatchesForDay("today", prefs);
  return (
    <AppShell>
      <LiveView groups={groups} follow={follow} />
    </AppShell>
  );
}
