import { AppShell } from "@/components/app-shell";
import { MatchesScreen } from "@/components/matches/matches-screen";
import { getMatchesForDay } from "@/lib/espn/matches";
import { parseMatchesQuery } from "@/lib/matches-query";

export const dynamic = "force-dynamic";
export const revalidate = 30;

export default async function MatchesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = parseMatchesQuery(await searchParams);
  const { groups, error } = await getMatchesForDay(query.day);

  return (
    <AppShell>
      <MatchesScreen query={query} groups={groups} error={error} />
    </AppShell>
  );
}
