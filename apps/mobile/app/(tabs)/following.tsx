import { useMemo } from 'react';
import { useRouter } from 'expo-router';

import { FollowingScreen } from '@/screens';
import { lookupTeam } from '@/lib/registry';
import { isLiveStatus } from '@/lib/live';
import type { Team } from '@/lib/types';
import { useFeed, useFollow } from '@/providers';

export default function FollowingTab() {
  const router = useRouter();
  const follow = useFollow();
  const feed = useFeed();

  const teams = follow.follow.teams.map((id) => lookupTeam(id)).filter((t): t is Team => Boolean(t));
  const liveMatches = useMemo(
    () =>
      feed.matches.filter(
        (m) =>
          isLiveStatus(m.status) &&
          (follow.follow.teams.includes(m.home.id) ||
            follow.follow.teams.includes(m.away.id) ||
            follow.follow.matches.includes(m.id) ||
            follow.follow.competitions.includes(m.leagueId)),
      ),
    [feed.matches, follow.follow.competitions, follow.follow.matches, follow.follow.teams],
  );

  return (
    <FollowingScreen
      followedTeams={teams}
      liveMatches={liveMatches}
      followedCompetitions={follow.follow.competitions.length}
      onOpenMatch={(m) => router.push(`/match/${m.id}`)}
      onOpenTeam={(t) => router.push(`/team/${t.id}`)}
      onExplore={() => router.push('/(tabs)/explore')}
    />
  );
}
