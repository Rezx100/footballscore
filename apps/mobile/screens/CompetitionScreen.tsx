import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen, StandingsTable, useScorevaTheme } from '@/components/scoreva';

import { STANDINGS } from './mocks';

type Tab = 'table' | 'fixtures' | 'results';

const TABS: { key: Tab; label: string }[] = [
  { key: 'table', label: 'Table' },
  { key: 'fixtures', label: 'Fixtures' },
  { key: 'results', label: 'Results' },
];

export interface CompetitionScreenProps {
  name?: string;
}

export function CompetitionScreen({ name = 'Premier League' }: CompetitionScreenProps) {
  const theme = useScorevaTheme();
  const [tab, setTab] = useState<Tab>('table');

  return (
    <Screen
      noPadding
      header={
        <View style={styles.header}>
          <Text style={[styles.title, { fontFamily: theme.typography.title.fontFamily, color: theme.colors.text }]}>
            {name}
          </Text>
          <View style={styles.segmented}>
            {TABS.map((t) => {
              const active = t.key === tab;
              return (
                <Pressable key={t.key} onPress={() => setTab(t.key)} style={styles.segment}>
                  <Text
                    style={[
                      styles.segmentText,
                      {
                        fontFamily: theme.typography.ui.fontFamily,
                        color: active ? theme.colors.text : theme.colors.textMuted,
                        borderBottomColor: active ? theme.colors.volt : 'transparent',
                      },
                    ]}
                  >
                    {t.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      }
    >
      <View style={styles.body}>
        {tab === 'table' ? (
          <StandingsTable rows={STANDINGS} />
        ) : (
          <Text style={[styles.empty, { fontFamily: theme.typography.body.fontFamily, color: theme.colors.textMuted }]}>
            No {tab} yet.
          </Text>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 8,
  },
  segmented: {
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '600',
    paddingBottom: 8,
    borderBottomWidth: 2,
  },
  body: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  empty: {
    fontSize: 15,
    textAlign: 'center',
    paddingTop: 32,
  },
});
