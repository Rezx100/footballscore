import { StyleSheet, Text, View } from 'react-native';

import { Crest, EmptyState, LiveTracker, Screen, useScorevaTheme } from '@/components/scoreva';
import type { Match, Team } from '@/components/scoreva';

import { HERO_MATCH, TEAMS } from './mocks';

export interface FollowingScreenProps {
  followedTeams?: Team[];
  liveMatches?: Match[];
  onOpenMatch?: (match: Match) => void;
}

export function FollowingScreen({
  followedTeams = [TEAMS.arsenal, TEAMS.liverpool],
  liveMatches = [HERO_MATCH],
  onOpenMatch,
}: FollowingScreenProps) {
  const theme = useScorevaTheme();

  if (followedTeams.length === 0) {
    return (
      <Screen>
        <EmptyState title="Nothing followed yet" body="Follow a club to see their scores here first." />
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
          <View key={team.id} style={[styles.clubRow, { borderBottomColor: theme.colors.hairline }]}>
            <Crest team={team} size="md" tint="rail" />
            <Text style={[styles.clubName, { fontFamily: theme.typography.ui.fontFamily, color: theme.colors.text }]}>
              {team.name}
            </Text>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 4,
  },
  liveList: {
    gap: 8,
  },
  clubList: {
    marginTop: 8,
  },
  clubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  clubName: {
    fontSize: 15,
  },
});
