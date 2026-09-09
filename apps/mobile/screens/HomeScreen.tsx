import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { DateRail, Screen, ScoreCard, useScorevaTheme, Wordmark } from '@/components/scoreva';
import type { Match } from '@/components/scoreva';

import { buildDateRailDays, MOCK_MATCHES } from './mocks';

export interface HomeScreenProps {
  matches?: Match[];
  followedIds?: string[];
  onOpenMatch?: (match: Match) => void;
  onOpenSearch?: () => void;
}

export function HomeScreen({
  matches = MOCK_MATCHES,
  followedIds = [],
  onOpenMatch,
  onOpenSearch,
}: HomeScreenProps) {
  const theme = useScorevaTheme();
  const days = buildDateRailDays();
  const [activeIso, setActiveIso] = useState(days[3]!.iso);

  const live = matches.filter((m) => m.status === 'live');
  const rest = matches.filter((m) => m.status !== 'live');

  return (
    <Screen
      noPadding
      header={
        <View>
          <View style={[styles.masthead, { paddingTop: 8 }]}>
            <Wordmark size={20} />
            <Pressable onPress={onOpenSearch} accessibilityRole="button" accessibilityLabel="Search">
              <SymbolView
                name={{ ios: 'magnifyingglass', android: 'search', web: 'search' }}
                tintColor={theme.colors.text}
                size={22}
              />
            </Pressable>
          </View>
          <DateRail days={days} activeIso={activeIso} onSelect={setActiveIso} />
        </View>
      }
    >
      <View style={styles.section}>
        {live.length > 0 ? (
          <>
            <Text
              style={[styles.sectionLabel, { fontFamily: theme.typography.title.fontFamily, color: theme.colors.text }]}
            >
              Live
            </Text>
            {live.map((m) => (
              <ScoreCard key={m.id} match={m} followed={followedIds.includes(m.id)} onPress={onOpenMatch} />
            ))}
          </>
        ) : null}

        <Text
          style={[styles.sectionLabel, { fontFamily: theme.typography.title.fontFamily, color: theme.colors.text }]}
        >
          Premier League
        </Text>
        {rest.map((m) => (
          <ScoreCard key={m.id} match={m} followed={followedIds.includes(m.id)} onPress={onOpenMatch} />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  masthead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  section: {
    gap: 12,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 4,
  },
});
