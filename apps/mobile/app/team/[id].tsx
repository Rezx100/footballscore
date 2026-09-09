import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text } from 'react-native';

import { TeamScreen } from '@/screens';
import { listMatches, lookupTeam } from '@/lib/registry';
import { useFollow } from '@/providers';
import { useScorevaTheme } from '@/components/scoreva';

export default function TeamRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useScorevaTheme();
  const follow = useFollow();
  const team = lookupTeam(id ?? '');
  if (!team) {
    return <Text style={{ color: theme.colors.text, padding: 24 }}>Club not on the board.</Text>;
  }

  const nextMatch = listMatches().find((m) => m.home.id === team.id || m.away.id === team.id);

  return (
    <TeamScreen
      team={team}
      nextMatch={nextMatch}
      followed={follow.isFollowingTeam(team.id)}
      onToggleFollow={() => follow.toggleTeam(team.id)}
      onOpenMatch={(m) => router.push(`/match/${m.id}`)}
      onOpenPlayer={(p) => router.push(`/player/${p.id}`)}
    />
  );
}
