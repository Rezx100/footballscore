import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { Screen, useScorevaTheme } from '@/components/scoreva';

interface CompetitionSummary {
  id: string;
  name: string;
  country: string;
}

const COMPETITIONS: CompetitionSummary[] = [
  { id: 'pl', name: 'Premier League', country: 'England' },
  { id: 'll', name: 'La Liga', country: 'Spain' },
  { id: 'sa', name: 'Serie A', country: 'Italy' },
  { id: 'bl', name: 'Bundesliga', country: 'Germany' },
  { id: 'ucl', name: 'Champions League', country: 'Europe' },
];

export interface ExploreScreenProps {
  onOpenCompetition?: (competition: CompetitionSummary) => void;
}

export function ExploreScreen({ onOpenCompetition }: ExploreScreenProps) {
  const theme = useScorevaTheme();

  return (
    <Screen>
      <Text style={[styles.title, { fontFamily: theme.typography.title.fontFamily, color: theme.colors.text }]}>
        Explore
      </Text>

      {COMPETITIONS.map((c) => (
        <Pressable
          key={c.id}
          onPress={() => onOpenCompetition?.(c)}
          style={[styles.row, { backgroundColor: theme.colors.card, borderColor: theme.colors.hairline }]}
        >
          <View style={[styles.badge, { borderColor: theme.colors.hairline }]}>
            <Text style={[styles.badgeText, { fontFamily: theme.typography.ui.fontFamily, color: theme.colors.text }]}>
              {c.name.slice(0, 2).toUpperCase()}
            </Text>
          </View>
          <View style={styles.rowCopy}>
            <Text style={[styles.rowTitle, { fontFamily: theme.typography.ui.fontFamily, color: theme.colors.text }]}>
              {c.name}
            </Text>
            <Text style={[styles.rowSubtitle, { fontFamily: theme.typography.meta.fontFamily, color: theme.colors.textMuted }]}>
              {c.country}
            </Text>
          </View>
          <SymbolView
            name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
            tintColor={theme.colors.textMuted}
            size={16}
          />
        </Pressable>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
  badge: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  rowCopy: {
    flex: 1,
    gap: 2,
  },
  rowTitle: {
    fontSize: 15,
  },
  rowSubtitle: {
    fontSize: 12,
  },
});
