/**
 * LiveTracker — compact Live-Activity-style bar. Crest pair, tabular score, LivePulse
 * minute, thin volt progress underline for elapsed match time. Dock top or bottom from
 * the parent; this component only renders the bar itself.
 */
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Crest } from './Crest';
import { LivePulse } from './LivePulse';
import { useScorevaTheme } from './theme';
import type { Match } from './types';

export interface LiveTrackerProps {
  match: Match;
  /** Full-time reference in minutes, used for the elapsed progress underline. Default 90. */
  fullTimeMinutes?: number;
  /** Spoiler/delayed mode: replaces the score with an ice "delayed" marker. */
  delayed?: boolean;
  onPress?: (match: Match) => void;
}

export function LiveTracker({ match, fullTimeMinutes = 90, delayed, onPress }: LiveTrackerProps) {
  const theme = useScorevaTheme();
  const progress = Math.min(1, (match.minute ?? 0) / fullTimeMinutes);

  return (
    <Pressable
      onPress={onPress ? () => onPress(match) : undefined}
      style={[styles.bar, { backgroundColor: theme.colors.surface, borderColor: theme.colors.hairline }]}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={`${match.home.short} vs ${match.away.short}, live, minute ${match.minute}`}
    >
      <View style={styles.content}>
        <Crest team={match.home} size="sm" tint="rail" />
        <Text style={[styles.score, { fontFamily: theme.typography.score.fontFamily, color: theme.colors.text }]}>
          {delayed ? '· ·' : `${match.homeScore ?? 0}–${match.awayScore ?? 0}`}
        </Text>
        <Crest team={match.away} size="sm" tint="rail" />
        <View style={styles.minuteWrap}>
          {delayed ? (
            <Text style={[styles.delayed, { color: theme.colors.ice, fontFamily: theme.typography.minute.fontFamily }]}>
              delayed
            </Text>
          ) : (
            <LivePulse minute={match.minute} label={false} />
          )}
        </View>
      </View>
      <View style={[styles.track, { backgroundColor: theme.colors.hairline }]}>
        <View
          style={[styles.fill, { width: `${progress * 100}%`, backgroundColor: theme.colors.volt }]}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  score: {
    fontSize: 15,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
  minuteWrap: {
    marginLeft: 'auto',
  },
  delayed: {
    fontSize: 11,
  },
  track: {
    height: 2,
    marginTop: 8,
    borderRadius: 1,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});
