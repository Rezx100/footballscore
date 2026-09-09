import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

import { MatchCentreScreen } from '@/screens';
import { getMatchDetail } from '@/lib/demo';
import { withLiveClock } from '@/lib/live';
import { useFollow, useLiveTick, usePrefs } from '@/providers';
import { useScorevaTheme } from '@/components/scoreva';

export default function MatchRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useScorevaTheme();
  const tick = useLiveTick();
  const follow = useFollow();
  const { prefs } = usePrefs();
  const detail = getMatchDetail(id ?? '');

  if (!detail) {
    return <Text style={{ color: theme.colors.text, padding: 24 }}>Match not on the board.</Text>;
  }

  return (
    <MatchCentreScreen
      detail={{ ...detail, match: withLiveClock(detail.match, tick) }}
      followed={follow.isFollowingMatch(detail.match.id)}
      spoiler={prefs.spoiler}
      onToggleFollow={() => follow.toggleMatch(detail.match.id)}
    />
  );
}
