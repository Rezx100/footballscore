import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import {
  DualStats,
  FormationPitch,
  LiveTracker,
  MatchHeader,
  Screen,
  StandingsTable,
  Timeline,
  useScorevaTheme,
} from '@/components/scoreva';
import type { MatchDetail } from '@/lib/types';

type Tab = 'timeline' | 'lineups' | 'stats' | 'table';

const TABS: { key: Tab; label: string }[] = [
  { key: 'timeline', label: 'Timeline' },
  { key: 'lineups', label: 'Lineups' },
  { key: 'stats', label: 'Stats' },
  { key: 'table', label: 'Table' },
];

export interface MatchCentreScreenProps {
  detail: MatchDetail;
  followed?: boolean;
  spoiler?: boolean;
  hour12?: boolean;
  timeZone?: string;
  onToggleFollow?: () => void;
}

export function MatchCentreScreen({ match: _legacy, detail, followed, spoiler, hour12, timeZone, onToggleFollow }: MatchCentreScreenProps & { match?: MatchDetail['match'] }) {
  const theme = useScorevaTheme();
  const [tab, setTab] = useState<Tab>('timeline');
  const [keysOnly, setKeysOnly] = useState(true);
  const match = detail.match;
  const events = keysOnly ? detail.events.filter((e) => e.key || e.type !== 'comment') : detail.events;
  const commentary = keysOnly ? detail.commentary.filter((c) => c.key) : detail.commentary;

  return (
    <Screen
      noPadding
      header={
        <View>
          <MatchHeader match={match} hour12={hour12} timeZone={timeZone} />
          <View style={styles.trackWrap}>
            {match.status === 'live' || match.status === 'ht' ? (
              <LiveTracker match={match} delayed={spoiler} />
            ) : null}
          </View>
        </View>
      }
    >
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
        {tab === 'timeline' ? (
          <View style={styles.gap}>
            <View style={styles.filterRow}>
              <Pressable
                onPress={() => setKeysOnly(true)}
                style={[styles.chip, { borderColor: keysOnly ? theme.colors.volt : theme.colors.hairline }]}
              >
                <Text style={[styles.chipText, { color: keysOnly ? theme.colors.volt : theme.colors.textMuted }]}>Key</Text>
              </Pressable>
              <Pressable
                onPress={() => setKeysOnly(false)}
                style={[styles.chip, { borderColor: !keysOnly ? theme.colors.volt : theme.colors.hairline }]}
              >
                <Text style={[styles.chipText, { color: !keysOnly ? theme.colors.volt : theme.colors.textMuted }]}>All</Text>
              </Pressable>
              <Pressable onPress={onToggleFollow} style={[styles.chip, { borderColor: theme.colors.hairline }]}>
                <Text style={[styles.chipText, { color: theme.colors.text }]}>{followed ? 'Following' : 'Follow match'}</Text>
              </Pressable>
            </View>
            {events.length > 0 ? (
              <Timeline
                events={events.map((e) => ({
                  id: e.id,
                  minute: e.minute,
                  type: e.type === 'var' || e.type === 'comment' ? 'other' : e.type,
                  text: e.text,
                  side: e.side,
                }))}
              />
            ) : (
              <Text style={[styles.empty, { color: theme.colors.textMuted }]}>No play-by-play yet.</Text>
            )}
            {commentary.length > 0 ? (
              <View style={styles.gap}>
                <Text style={[styles.section, { fontFamily: theme.typography.title.fontFamily, color: theme.colors.text }]}>
                  Commentary
                </Text>
                {commentary.map((line) => (
                  <View key={line.id} style={[styles.comment, { borderColor: theme.colors.hairline }]}>
                    {line.minute != null ? (
                      <Text style={[styles.minute, { fontFamily: theme.typography.minute.fontFamily, color: theme.colors.textMuted }]}>
                        {line.minute}′
                      </Text>
                    ) : null}
                    <Text style={[styles.commentText, { fontFamily: theme.typography.body.fontFamily, color: theme.colors.text }]}>
                      {line.text}
                    </Text>
                  </View>
                ))}
              </View>
            ) : null}
          </View>
        ) : null}

        {tab === 'lineups' ? (
          <View style={styles.gap}>
            <Text style={[styles.section, { fontFamily: theme.typography.title.fontFamily, color: theme.colors.text }]}>
              {detail.homeLineup.team.short}
              {detail.homeLineup.formation ? ` · ${detail.homeLineup.formation}` : ''}
            </Text>
            <FormationPitch formation={detail.homeLineup.formation} players={detail.homeLineup.players} />
            <Text style={[styles.section, { fontFamily: theme.typography.title.fontFamily, color: theme.colors.text }]}>
              {detail.awayLineup.team.short}
              {detail.awayLineup.formation ? ` · ${detail.awayLineup.formation}` : ''}
            </Text>
            <FormationPitch formation={detail.awayLineup.formation} players={detail.awayLineup.players} />
            {detail.homeLineup.players.length === 0 && detail.awayLineup.players.length === 0 ? (
              <Text style={[styles.empty, { color: theme.colors.textMuted }]}>Lineups not in yet.</Text>
            ) : null}
            {detail.ratings.length > 0 ? (
              <View>
                <Text style={[styles.section, { fontFamily: theme.typography.title.fontFamily, color: theme.colors.text }]}>
                  Player ratings
                </Text>
                {detail.ratings.map((r) => (
                  <View key={r.playerId} style={[styles.ratingRow, { borderBottomColor: theme.colors.hairline }]}>
                    <Text style={[styles.ratingName, { fontFamily: theme.typography.ui.fontFamily, color: theme.colors.text }]}>
                      {r.name}
                    </Text>
                    <Text style={[styles.ratingVal, { fontFamily: theme.typography.score.fontFamily, color: theme.colors.volt }]}>
                      {r.rating.toFixed(1)}
                    </Text>
                  </View>
                ))}
              </View>
            ) : null}
          </View>
        ) : null}

        {tab === 'stats' ? (
          <View style={styles.gap}>
            {detail.stats.length > 0 ? (
              <DualStats rows={detail.stats} homeColor={match.home.color} awayColor={match.away.color} />
            ) : (
              <Text style={[styles.empty, { color: theme.colors.textMuted }]}>Numbers not in yet.</Text>
            )}
            <Text style={[styles.section, { fontFamily: theme.typography.title.fontFamily, color: theme.colors.text }]}>
              Head to head
            </Text>
            <Text style={[styles.empty, { color: theme.colors.textMuted }]}>{detail.h2h.summary}</Text>
            {detail.h2h.events.map((ev) => (
              <View key={ev.id} style={[styles.h2h, { borderColor: theme.colors.hairline }]}>
                <Text style={[styles.h2hDate, { fontFamily: theme.typography.caption.fontFamily, color: theme.colors.textMuted }]}>
                  {ev.date}
                </Text>
                <Text style={[styles.h2hScore, { fontFamily: theme.typography.ui.fontFamily, color: theme.colors.text }]}>
                  {ev.homeName} {ev.homeScore}–{ev.awayScore} {ev.awayName}
                </Text>
              </View>
            ))}
            {match.venue ? (
              <Text style={[styles.empty, { color: theme.colors.textMuted }]}>
                {match.venue}
                {match.referee ? ` · ${match.referee}` : ''}
              </Text>
            ) : null}
          </View>
        ) : null}

        {tab === 'table' ? (
          detail.table.length > 0 ? (
            <StandingsTable rows={detail.table} />
          ) : (
            <Text style={[styles.empty, { color: theme.colors.textMuted }]}>No table for this competition.</Text>
          )
        ) : null}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  trackWrap: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
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
    paddingBottom: 32,
  },
  gap: {
    gap: 12,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  chip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
  },
  empty: {
    fontSize: 15,
    paddingTop: 8,
  },
  comment: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    gap: 4,
  },
  minute: {
    fontSize: 12,
  },
  commentText: {
    fontSize: 15,
    lineHeight: 21,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  ratingName: {
    fontSize: 15,
  },
  ratingVal: {
    fontSize: 18,
  },
  h2h: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    gap: 4,
  },
  h2hDate: {
    fontSize: 11,
  },
  h2hScore: {
    fontSize: 14,
  },
});
