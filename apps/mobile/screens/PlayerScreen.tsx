import { StyleSheet, Text, View } from 'react-native';

import { Crest, Screen, useScorevaTheme } from '@/components/scoreva';
import type { Team } from '@/components/scoreva';

import { TEAMS } from './mocks';

export interface PlayerScreenProps {
  name?: string;
  position?: string;
  shirtNumber?: number;
  team?: Team;
  rating?: number;
}

const STATS = [
  { label: 'Goals', value: '14' },
  { label: 'Assists', value: '6' },
  { label: 'Apps', value: '22' },
  { label: 'Yellow cards', value: '3' },
  { label: 'Red cards', value: '0' },
];

const RECENT_RATINGS = [8.1, 7.4, 6.9, 8.6, 7.2, 7.9];

export function PlayerScreen({
  name = 'B. Saka',
  position = 'Forward',
  shirtNumber = 7,
  team = TEAMS.arsenal,
  rating = 7.4,
}: PlayerScreenProps) {
  const theme = useScorevaTheme();
  const initials = name
    .split(' ')
    .map((p) => p.replace('.', '')[0])
    .join('')
    .toUpperCase();

  return (
    <Screen>
      <View style={styles.identity}>
        <View style={[styles.avatar, { backgroundColor: theme.colors.card, borderColor: theme.colors.hairline }]}>
          <View style={[styles.ratingArc, { borderColor: theme.colors.volt }]} />
          <Text style={[styles.avatarText, { fontFamily: theme.typography.title.fontFamily, color: theme.colors.text }]}>
            {initials}
          </Text>
        </View>
        <Text style={[styles.name, { fontFamily: theme.typography.title.fontFamily, color: theme.colors.text }]}>
          {name}
        </Text>
        <View style={styles.metaRow}>
          <Text style={[styles.meta, { fontFamily: theme.typography.meta.fontFamily, color: theme.colors.textMuted }]}>
            {position} · {team.name} · #{shirtNumber}
          </Text>
          <Crest team={team} size="sm" tint="wash" />
        </View>
      </View>

      <Text style={[styles.sectionLabel, { fontFamily: theme.typography.title.fontFamily, color: theme.colors.text }]}>
        Season stats
      </Text>
      <View style={styles.grid}>
        <View style={[styles.tile, { backgroundColor: theme.colors.card, borderColor: theme.colors.hairline }]}>
          <Text style={[styles.tileValue, { fontFamily: theme.typography.score.fontFamily, color: theme.colors.volt }]}>
            {rating.toFixed(1)}
          </Text>
          <Text style={[styles.tileLabel, { fontFamily: theme.typography.meta.fontFamily, color: theme.colors.textMuted }]}>
            Avg rating
          </Text>
        </View>
        {STATS.map((s) => (
          <View key={s.label} style={[styles.tile, { backgroundColor: theme.colors.card, borderColor: theme.colors.hairline }]}>
            <Text style={[styles.tileValue, { fontFamily: theme.typography.score.fontFamily, color: theme.colors.text }]}>
              {s.value}
            </Text>
            <Text style={[styles.tileLabel, { fontFamily: theme.typography.meta.fontFamily, color: theme.colors.textMuted }]}>
              {s.label}
            </Text>
          </View>
        ))}
      </View>

      <Text style={[styles.sectionLabel, { fontFamily: theme.typography.title.fontFamily, color: theme.colors.text }]}>
        Recent ratings
      </Text>
      <View style={styles.ratingsRow}>
        {RECENT_RATINGS.map((r, i) => (
          <View key={i} style={[styles.ratingChip, { backgroundColor: theme.colors.card, borderColor: theme.colors.hairline }]}>
            <Text style={[styles.ratingText, { fontFamily: theme.typography.minute.fontFamily, color: theme.colors.text }]}>
              {r.toFixed(1)}
            </Text>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  identity: {
    alignItems: 'center',
    gap: 8,
    paddingTop: 8,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  ratingArc: {
    position: 'absolute',
    top: -1,
    left: -1,
    right: -1,
    bottom: -1,
    borderRadius: 45,
    borderWidth: 2,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    transform: [{ rotate: '-45deg' }],
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  meta: {
    fontSize: 13,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tile: {
    width: '31%',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    gap: 4,
  },
  tileValue: {
    fontSize: 20,
    fontWeight: '600',
  },
  tileLabel: {
    fontSize: 11,
    textAlign: 'center',
  },
  ratingsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  ratingChip: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
