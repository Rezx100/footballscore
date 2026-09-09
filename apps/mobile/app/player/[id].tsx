import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

import { PlayerScreen } from '@/screens';
import { getPlayer } from '@/lib/demo';
import { useScorevaTheme } from '@/components/scoreva';

export default function PlayerRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useScorevaTheme();
  const player = getPlayer(id ?? '');
  if (!player) {
    return <Text style={{ color: theme.colors.text, padding: 24 }}>Player not on the board.</Text>;
  }
  return <PlayerScreen player={player} />;
}
