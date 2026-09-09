import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

import { MatchCentreScreen } from '@/screens';
import { loadMatchDetail } from '@/lib/api';
import { withLiveClock } from '@/lib/live';
import type { MatchDetail } from '@/lib/types';
import { useFollow, useLiveTick, usePrefs } from '@/providers';
import { EmptyState, ScoreCardSkeleton, useScorevaTheme } from '@/components/scoreva';

export default function MatchRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useScorevaTheme();
  const tick = useLiveTick();
  const follow = useFollow();
  const { prefs } = usePrefs();
  const [detail, setDetail] = useState<MatchDetail | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = () =>
      loadMatchDetail(id ?? '').then((row) => {
        if (!cancelled) {
          setDetail(row);
          setReady(true);
        }
      });
    load();
    const timer = setInterval(load, 8_000);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [id]);

  if (!ready) {
    return (
      <View style={{ padding: 16, gap: 12, backgroundColor: theme.colors.background, flex: 1 }}>
        <ScoreCardSkeleton />
        <ScoreCardSkeleton />
      </View>
    );
  }
  if (!detail) {
    return <EmptyState title="Match not on the board" body="This fixture is not in the current feed." />;
  }

  return (
    <MatchCentreScreen
      detail={{ ...detail, match: withLiveClock(detail.match, tick) }}
      followed={follow.isFollowingMatch(detail.match.id)}
      spoiler={prefs.spoiler}
      hour12={prefs.hour12}
      timeZone={prefs.tz}
      onToggleFollow={() => follow.toggleMatch(detail.match.id)}
    />
  );
}
