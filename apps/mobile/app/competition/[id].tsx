import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text } from 'react-native';

import { CompetitionScreen } from '@/screens';
import { MATCHES, getCompetition } from '@/lib/demo';
import { useFollow } from '@/providers';
import { useScorevaTheme } from '@/components/scoreva';

export default function CompetitionRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useScorevaTheme();
  const follow = useFollow();
  const competition = getCompetition(id ?? '');
  if (!competition) {
    return <Text style={{ color: theme.colors.text, padding: 24 }}>Competition not on the board.</Text>;
  }

  const fixtures = MATCHES.filter((m) => m.leagueId === competition.id && (m.status === 'ns' || m.status === 'live' || m.status === 'ht'));
  const results = MATCHES.filter((m) => m.leagueId === competition.id && m.status === 'ft');

  return (
    <CompetitionScreen
      competition={competition}
      fixtures={fixtures}
      results={results}
      followed={follow.isFollowingCompetition(competition.id)}
      onToggleFollow={() => follow.toggleCompetition(competition.id)}
      onOpenMatch={(m) => router.push(`/match/${m.id}`)}
      onOpenPlayer={(playerId) => router.push(`/player/${playerId}`)}
    />
  );
}
