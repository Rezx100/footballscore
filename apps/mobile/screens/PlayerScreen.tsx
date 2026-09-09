import { StyleSheet, Text, View } from 'react-native';

import { Crest, Screen, useScorevaTheme } from '@/components/scoreva';
import { TEAMS } from '@/lib/demo';
import type { Player } from '@/lib/types';

export interface PlayerScreenProps {
  player: Player;
}

export function PlayerScreen({ player }: PlayerScreenProps) {
  const theme = useScorevaTheme();
  const team = TEAMS[player.teamId];
  const initials = player.shortName
    .split(' ')
    .map((p) => p.replace('.', '')[0])
    .join('')
    .toUpperCase();
  const stats = [
    { label: 'Goals', value: String(player.goals ?? 0) },
    { label: 'Assists', value: String(player.assists ?? 0) },
    { label: 'Apps', value: String(player.apps ?? 0) },
    { label: 'Yellow cards', value: String(player.yellows ?? 0) },
    { label: 'Red cards', value: String(player.reds ?? 0) },
  ];
  const recent = [player.rating ?? 7, 7.4, 6.9, 8.1, 7.2, 7.6];

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
          {player.name}
        </Text>
        <View style={styles.metaRow}>
          <Text style={[styles.meta, { fontFamily: theme.typography.meta.fontFamily, color: theme.colors.textMuted }]}>
            {player.position} · {team?.name ?? ''} · #{player.shirt}
          </Text>
          {team ? <Crest team={team} size="sm" tint="wash" /> : null}
        </View>
      </View>

      <Text style={[styles.sectionLabel, { fontFamily: theme.typography.title.fontFamily, color: theme.colors.text }]}>
        Season stats
      </Text>
      <View style={styles.grid}>
        <View style={[styles.tile, { backgroundColor: theme.colors.card, borderColor: theme.colors.hairline }]}>
          <Text style={[styles.tileValue, { fontFamily: theme.typography.score.fontFamily, color: theme.colors.volt }]}>
            {(player.rating ?? 0).toFixed(1)}
          </Text>
          <Text style={[styles.tileLabel, { fontFamily: theme.typography.meta.fontFamily, color: theme.colors.textMuted }]}>
            Avg rating
          </Text>
        </View>
        {stats.map((s) => (
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
        {recent.map((r, i) => (
          <View key={i} style={[styles.ratingChip, { backgroundColor: theme.colors.card, borderColor: theme.colors.hairline }]}>
            <Text style={[styles.ratingText, { fontFamily: theme.typography.minute.fontFamily, color: theme.colors.text }]}>
              {Number(r).toFixed(1)}
            </Text>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  identity: { alignItems: 'center', gap: 8, paddingTop: 8 },
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
  avatarText: { fontSize: 24, fontWeight: '700' },
  name: { fontSize: 22, fontWeight: '600' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  meta: { fontSize: 13 },
  sectionLabel: { fontSize: 18, fontWeight: '600', marginTop: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  tile: {
    width: '31%',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    gap: 4,
  },
  tileValue: { fontSize: 20, fontWeight: '600' },
  tileLabel: { fontSize: 11, textAlign: 'center' },
  ratingsRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  ratingChip: { borderWidth: 1, borderRadius: 8, paddingVertical: 8, paddingHorizontal: 10 },
  ratingText: { fontSize: 13, fontWeight: '600' },
});
