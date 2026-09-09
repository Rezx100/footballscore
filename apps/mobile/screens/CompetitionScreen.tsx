import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen, ScoreCard, StandingsTable, useScorevaTheme } from '@/components/scoreva';
import { PL_TABLE, TOP_SCORERS } from '@/lib/demo';
import type { Competition, Match, StandingRow } from '@/lib/types';

type Tab = 'table' | 'fixtures' | 'results' | 'scorers';

const TABS: { key: Tab; label: string }[] = [
  { key: 'table', label: 'Table' },
  { key: 'fixtures', label: 'Fixtures' },
  { key: 'results', label: 'Results' },
  { key: 'scorers', label: 'Scorers' },
];

export interface CompetitionScreenProps {
  competition: Competition;
  fixtures?: Match[];
  results?: Match[];
  table?: StandingRow[];
  followed?: boolean;
  onToggleFollow?: () => void;
  onOpenMatch?: (match: Match) => void;
  onOpenPlayer?: (id: string) => void;
}

export function CompetitionScreen({
  competition,
  fixtures = [],
  results = [],
  table: tableProp,
  followed,
  onToggleFollow,
  onOpenMatch,
  onOpenPlayer,
}: CompetitionScreenProps) {
  const theme = useScorevaTheme();
  const [tab, setTab] = useState<Tab>('table');
  const table = tableProp ?? (competition.id === 'pl' ? PL_TABLE : []);

  return (
    <Screen
      noPadding
      header={
        <View style={styles.header}>
          <Text style={[styles.title, { fontFamily: theme.typography.title.fontFamily, color: theme.colors.text }]}>
            {competition.name}
          </Text>
          <Pressable onPress={onToggleFollow} style={[styles.follow, { borderColor: theme.colors.hairline }]}>
            <Text style={[styles.followText, { color: theme.colors.text }]}>{followed ? 'Following' : 'Follow'}</Text>
          </Pressable>
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
          table.length > 0 ? (
            <StandingsTable rows={table} />
          ) : (
            <Text style={[styles.empty, { color: theme.colors.textMuted }]}>Table not in for this competition yet.</Text>
          )
        ) : null}
        {tab === 'fixtures' ? (
          fixtures.length > 0 ? (
            <View style={styles.gap}>
              {fixtures.map((m) => (
                <ScoreCard key={m.id} match={m} onPress={onOpenMatch} />
              ))}
            </View>
          ) : (
            <Text style={[styles.empty, { color: theme.colors.textMuted }]}>No upcoming fixtures on file.</Text>
          )
        ) : null}
        {tab === 'results' ? (
          results.length > 0 ? (
            <View style={styles.gap}>
              {results.map((m) => (
                <ScoreCard key={m.id} match={m} onPress={onOpenMatch} />
              ))}
            </View>
          ) : (
            <Text style={[styles.empty, { color: theme.colors.textMuted }]}>No results on file.</Text>
          )
        ) : null}
        {tab === 'scorers' ? (
          <View style={styles.gap}>
            {TOP_SCORERS.map((row, i) => (
              <Pressable
                key={row.player.id}
                onPress={() => onOpenPlayer?.(row.player.id)}
                style={[styles.scorer, { borderColor: theme.colors.hairline, backgroundColor: theme.colors.card }]}
              >
                <Text style={[styles.pos, { fontFamily: theme.typography.minute.fontFamily, color: theme.colors.textMuted }]}>
                  {i + 1}
                </Text>
                <Text style={[styles.scorerName, { fontFamily: theme.typography.ui.fontFamily, color: theme.colors.text }]}>
                  {row.player.shortName}
                </Text>
                <Text style={[styles.scorerStat, { fontFamily: theme.typography.score.fontFamily, color: theme.colors.text }]}>
                  {row.goals}
                </Text>
                <Text style={[styles.scorerAssist, { fontFamily: theme.typography.minute.fontFamily, color: theme.colors.textMuted }]}>
                  {row.assists} A
                </Text>
              </Pressable>
            ))}
          </View>
        ) : null}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { paddingTop: 8 },
  title: { fontSize: 20, fontWeight: '600', textAlign: 'center', paddingVertical: 8 },
  follow: {
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 8,
  },
  followText: { fontSize: 13, fontWeight: '600' },
  segmented: { flexDirection: 'row', paddingHorizontal: 8 },
  segment: { flex: 1, alignItems: 'center', paddingVertical: 10 },
  segmentText: { fontSize: 13, fontWeight: '600', paddingBottom: 8, borderBottomWidth: 2 },
  body: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32 },
  empty: { fontSize: 15, textAlign: 'center', paddingTop: 32 },
  gap: { gap: 10 },
  scorer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
  pos: { width: 20, fontSize: 12 },
  scorerName: { flex: 1, fontSize: 15 },
  scorerStat: { fontSize: 18, width: 28, textAlign: 'right' },
  scorerAssist: { fontSize: 12, width: 36, textAlign: 'right' },
});
