import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Crest, EmptyState, LiveTracker, Screen, useScorevaTheme } from '@/components/scoreva';
import type { Match, Team } from '@/lib/types';

export interface FollowingScreenProps {
  followedTeams?: Team[];
  liveMatches?: Match[];
  onOpenMatch?: (match: Match) => void;
  onOpenTeam?: (team: Team) => void;
  onExplore?: () => void;
}

export function FollowingScreen({
  followedTeams = [],
  liveMatches = [],
  onOpenMatch,
  onOpenTeam,
  onExplore,
}: FollowingScreenProps) {
  const theme = useScorevaTheme();

  if (followedTeams.length === 0) {
    return (
      <Screen>
        <EmptyState
          title="Nothing followed yet"
          body="Follow a club to see their scores here first."
          actionLabel="Explore competitions"
          onAction={onExplore}
        />
      </Screen>
    );
  }

  return (
    <Screen>
      <Text style={[styles.title, { fontFamily: theme.typography.title.fontFamily, color: theme.colors.text }]}>
        Following
      </Text>
      {liveMatches.length > 0 ? (
        <View style={styles.liveList}>
          {liveMatches.map((m) => (
            <LiveTracker key={m.id} match={m} onPress={onOpenMatch} />
          ))}
        </View>
      ) : null}
      <View style={styles.clubList}>
        {followedTeams.map((team) => (
          <Pressable
            key={team.id}
            onPress={() => onOpenTeam?.(team)}
            style={[styles.clubRow, { borderBottomColor: theme.colors.hairline }]}
          >
            <Crest team={team} size="md" tint="rail" />
            <Text style={[styles.clubName, { fontFamily: theme.typography.ui.fontFamily, color: theme.colors.text }]}>
              {team.name}
            </Text>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: '600', marginTop: 4 },
  liveList: { gap: 8 },
  clubList: { marginTop: 8 },
  clubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  clubName: { fontSize: 15 },
});
