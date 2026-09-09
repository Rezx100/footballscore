import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import {
  DualStats,
  FormationPitch,
  MatchHeader,
  Screen,
  StandingsTable,
  Timeline,
  useScorevaTheme,
} from '@/components/scoreva';
import type { Match } from '@/components/scoreva';

import { DUAL_STATS, FORMATION_PLAYERS, HERO_MATCH, STANDINGS, TIMELINE_EVENTS } from './mocks';

type Tab = 'timeline' | 'lineups' | 'stats' | 'table';

const TABS: { key: Tab; label: string }[] = [
  { key: 'timeline', label: 'Timeline' },
  { key: 'lineups', label: 'Lineups' },
  { key: 'stats', label: 'Stats' },
  { key: 'table', label: 'Table' },
];

export interface MatchCentreScreenProps {
  match?: Match;
}

export function MatchCentreScreen({ match = HERO_MATCH }: MatchCentreScreenProps) {
  const theme = useScorevaTheme();
  const [tab, setTab] = useState<Tab>('timeline');

  return (
    <Screen noPadding header={<MatchHeader match={match} />}>
      <View style={[styles.segmented, { backgroundColor: theme.colors.card, borderColor: theme.colors.hairline }]}>
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

      <View style={styles.body}>
        {tab === 'timeline' ? <Timeline events={TIMELINE_EVENTS} /> : null}
        {tab === 'lineups' ? (
          <FormationPitch formation="4-3-3" players={FORMATION_PLAYERS} />
        ) : null}
        {tab === 'stats' ? (
          <DualStats rows={DUAL_STATS} homeColor={match.home.color} awayColor={match.away.color} />
        ) : null}
        {tab === 'table' ? <StandingsTable rows={STANDINGS} /> : null}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  segmented: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingHorizontal: 8,
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
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
});
