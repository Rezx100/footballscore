import { useRouter } from 'expo-router';

import { ExploreScreen } from '@/screens';
import { useFollow } from '@/providers';

export default function ExploreTab() {
  const router = useRouter();
  const follow = useFollow();
  return (
    <ExploreScreen
      followedIds={follow.follow.competitions}
      onOpenCompetition={(c) => router.push(`/competition/${c.id}`)}
      onToggleFollow={(id) => follow.toggleCompetition(id)}
    />
  );
}
