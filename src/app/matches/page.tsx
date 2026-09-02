import { MatchesScreen } from "@/components/matches/matches-screen";
import { PhoneShell } from "@/components/phone-shell";
import { parseMatchesQuery } from "@/lib/matches-query";

export default async function MatchesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = parseMatchesQuery(await searchParams);

  return (
    <PhoneShell>
      <MatchesScreen query={query} />
    </PhoneShell>
  );
}
