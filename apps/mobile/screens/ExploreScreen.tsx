import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { Screen, useScorevaTheme } from '@/components/scoreva';
import { COMPETITIONS } from '@/lib/demo';
import type { Competition } from '@/lib/types';

export interface ExploreScreenProps {
  followedIds?: string[];
  onOpenCompetition?: (competition: Competition) => void;
  onToggleFollow?: (id: string) => void;
}

export function ExploreScreen({ followedIds = [], onOpenCompetition, onToggleFollow }: ExploreScreenProps) {
  const theme = useScorevaTheme();

  return (
    <Screen>
      <Text style={[styles.title, { fontFamily: theme.typography.title.fontFamily, color: theme.colors.text }]}>
        Explore
      </Text>
      {COMPETITIONS.map((c) => {
        const followed = followedIds.includes(c.id);
        return (
          <Pressable
            key={c.id}
            onPress={() => onOpenCompetition?.(c)}
            onLongPress={() => onToggleFollow?.(c.id)}
            style={[styles.row, { backgroundColor: theme.colors.card, borderColor: followed ? theme.colors.volt : theme.colors.hairline }]}
          >
            <View style={[styles.badge, { borderColor: theme.colors.hairline, backgroundColor: `${c.color}22` }]}>
              <Text style={[styles.badgeText, { fontFamily: theme.typography.ui.fontFamily, color: theme.colors.text }]}>
                {c.short}
              </Text>
            </View>
            <View style={styles.rowCopy}>
              <Text style={[styles.rowTitle, { fontFamily: theme.typography.ui.fontFamily, color: theme.colors.text }]}>
                {c.name}
              </Text>
              <Text style={[styles.rowSubtitle, { fontFamily: theme.typography.meta.fontFamily, color: theme.colors.textMuted }]}>
                {c.country} · {c.season}
              </Text>
            </View>
            <SymbolView
              name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
              tintColor={theme.colors.textMuted}
              size={16}
            />
          </Pressable>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: '600', marginTop: 4 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
  badge: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { fontSize: 11, fontWeight: '700' },
  rowCopy: { flex: 1, gap: 2 },
  rowTitle: { fontSize: 15 },
  rowSubtitle: { fontSize: 12 },
});
