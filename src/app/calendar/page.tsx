import { AppShell } from "@/components/app-shell";
import { CalendarView } from "@/components/scory/calendar-month";
import { serverPrefs } from "@/lib/server-state";

export const dynamic = "force-dynamic";

export default async function CalendarPage() {
  const prefs = await serverPrefs();
  return (
    <AppShell>
      <CalendarView timeZone={prefs.tz} />
    </AppShell>
  );
}
