import { useMemo } from 'react';
import { useRouter } from 'expo-router';

import { FollowingScreen } from '@/screens';
import { MATCHES, TEAMS } from '@/lib/demo';
import { withLiveClock } from '@/lib/live';
import type { Team } from '@/lib/types';
import { useFollow, useLiveTick } from '@/providers';

export default function FollowingTab() {
  const router = useRouter();
  const follow = useFollow();
  const tick = useLiveTick();

  const teams = follow.follow.teams.map((id) => TEAMS[id]).filter((t): t is Team => Boolean(t));
  const liveMatches = useMemo(
    () =>
      MATCHES.map((m) => withLiveClock(m, tick)).filter(
        (m) =>
          (m.status === 'live' || m.status === 'ht') &&
          (follow.follow.teams.includes(m.home.id) ||
            follow.follow.teams.includes(m.away.id) ||
            follow.follow.matches.includes(m.id)),
      ),
    [follow.follow.matches, follow.follow.teams, tick],
  );

  return (
    <FollowingScreen
      followedTeams={teams}
      liveMatches={liveMatches}
      onOpenMatch={(m) => router.push(`/match/${m.id}`)}
      onOpenTeam={(t) => router.push(`/team/${t.id}`)}
      onExplore={() => router.push('/(tabs)/explore')}
    />
  );
}
