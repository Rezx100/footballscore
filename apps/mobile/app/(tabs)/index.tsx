import { useRouter } from 'expo-router';

import { HomeScreen } from '@/screens';
import { useFeed, useFollow, usePrefs } from '@/providers';

export default function LiveTab() {
  const router = useRouter();
  const { prefs } = usePrefs();
  const follow = useFollow();
  const feed = useFeed();

  return (
    <HomeScreen
      matches={feed.matches}
      days={feed.days}
      activeIso={feed.day}
      onSelectDay={feed.setDay}
      followedTeamIds={follow.follow.teams}
      followedMatchIds={follow.follow.matches}
      followedCompetitionIds={follow.follow.competitions}
      spoiler={prefs.spoiler}
      loading={feed.loading}
      source={feed.source}
      stale={feed.stale}
      hour12={prefs.hour12}
      timeZone={prefs.tz}
      onOpenMatch={(m) => router.push(`/match/${m.id}`)}
      onOpenSearch={() => router.push('/(tabs)/search')}
      onToggleFollow={(m) => follow.toggleMatch(m.id)}
    />
  );
}
