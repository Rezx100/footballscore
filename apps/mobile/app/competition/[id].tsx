import { useEffect, useMemo, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text } from 'react-native';

import { CompetitionScreen } from '@/screens';
import { MATCHES, PL_TABLE, getCompetition } from '@/lib/demo';
import { loadStandings } from '@/lib/api';
import { listMatches } from '@/lib/registry';
import type { StandingRow } from '@/lib/types';
import { useFeed, useFollow } from '@/providers';
import { useScorevaTheme } from '@/components/scoreva';

export default function CompetitionRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useScorevaTheme();
  const follow = useFollow();
  const feed = useFeed();
  const competition = getCompetition(id ?? '');
  const [table, setTable] = useState<StandingRow[]>(id === 'pl' ? PL_TABLE : []);

  useEffect(() => {
    if (!id) return;
    loadStandings(id).then((rows) => {
      if (rows && rows.length > 0) setTable(rows);
    });
  }, [id]);

  const pool = useMemo(() => {
    const live = feed.matches.filter((m) => m.leagueId === (id ?? ''));
    const demo = MATCHES.filter((m) => m.leagueId === (id ?? ''));
    const extra = listMatches().filter((m) => m.leagueId === (id ?? ''));
    const seen = new Set<string>();
    return [...live, ...extra, ...demo].filter((m) => {
      if (seen.has(m.id)) return false;
      seen.add(m.id);
      return true;
    });
  }, [feed.matches, id]);

  if (!competition) {
    return <Text style={{ color: theme.colors.text, padding: 24 }}>Competition not on the board.</Text>;
  }

  const fixtures = pool.filter((m) => m.status === 'ns' || m.status === 'live' || m.status === 'ht');
  const results = pool.filter((m) => m.status === 'ft');

  return (
    <CompetitionScreen
      competition={competition}
      fixtures={fixtures}
      results={results}
      table={table}
      followed={follow.isFollowingCompetition(competition.id)}
      onToggleFollow={() => follow.toggleCompetition(competition.id)}
      onOpenMatch={(m) => router.push(`/match/${m.id}`)}
      onOpenPlayer={(playerId) => router.push(`/player/${playerId}`)}
    />
  );
}
