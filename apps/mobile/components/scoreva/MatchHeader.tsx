/**
 * MatchHeader — sticky match-centre scoreboard. Large crests, score-lg tabular pair,
 * LivePulse status. Goal flash tints only the just-scored digit ember, never a full-bleed
 * red banner.
 */
import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';

import { Crest } from './Crest';
import { LivePulse } from './LivePulse';
import { useScorevaTheme } from './theme';
import type { Match } from './types';
import { formatKickoff } from '@/lib/dates';

export interface MatchHeaderProps {
  match: Match;
  hour12?: boolean;
  timeZone?: string;
}

function ScoreLg({ value, flash }: { value: number | undefined; flash: boolean }) {
  const theme = useScorevaTheme();
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!flash) return;
    anim.setValue(1);
    Animated.timing(anim, { toValue: 0, duration: 400, useNativeDriver: false }).start();
  }, [flash, anim]);

  const color = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.text, theme.colors.ember],
  });

  return (
    <Animated.Text
      style={[styles.score, { fontFamily: theme.typography.scoreLg.fontFamily, color }]}
    >
      {value ?? 0}
    </Animated.Text>
  );
}

function statusText(match: Match, hour12: boolean, timeZone?: string): string {
  switch (match.status) {
    case 'ht':
      return 'HT';
    case 'ft':
      return 'FT';
    case 'pp':
      return 'Postponed';
    case 'ab':
      return 'Abandoned';
    case 'ns': {
      const time = formatKickoff(match.kickoffIso, hour12, timeZone);
      return time ? `Kick-off ${time}` : 'Kick-off';
    }
    default:
      return '';
  }
}

export function MatchHeader({ match, hour12 = false, timeZone }: MatchHeaderProps) {
  const theme = useScorevaTheme();
  const isLive = match.status === 'live';
  const prevScores = useRef({ home: match.homeScore, away: match.awayScore });
  const [flashHome, setFlashHome] = useState(false);
  const [flashAway, setFlashAway] = useState(false);

  useEffect(() => {
    const prev = prevScores.current;
    const homeUp = match.homeScore != null && prev.home != null && match.homeScore > prev.home;
    const awayUp = match.awayScore != null && prev.away != null && match.awayScore > prev.away;
    if (homeUp || awayUp) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      setFlashHome(homeUp);
      setFlashAway(awayUp);
      const t = setTimeout(() => {
        setFlashHome(false);
        setFlashAway(false);
      }, 420);
      prevScores.current = { home: match.homeScore, away: match.awayScore };
      return () => clearTimeout(t);
    }
    prevScores.current = { home: match.homeScore, away: match.awayScore };
    return undefined;
  }, [match.homeScore, match.awayScore]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      {match.leagueName ? (
        <Text
          style={[
            styles.league,
            { fontFamily: theme.typography.meta.fontFamily, color: theme.colors.textMuted },
          ]}
        >
          {match.leagueName}
        </Text>
      ) : null}

      <View style={styles.row}>
        <View style={styles.side}>
          <Crest team={match.home} size="lg" tint="wash" />
          <Text
            style={[
              styles.teamName,
              { fontFamily: theme.typography.title.fontFamily, color: theme.colors.text },
            ]}
            numberOfLines={1}
          >
            {match.home.name}
          </Text>
        </View>

        <View style={styles.center}>
          {isLive ? (
            <LivePulse minute={match.minute} />
          ) : (
            <Text
              style={[
                styles.status,
                { fontFamily: theme.typography.caption.fontFamily, color: theme.colors.textMuted },
              ]}
            >
              {statusText(match, hour12, timeZone)}
            </Text>
          )}
          <View style={styles.scoreRow}>
            <ScoreLg value={match.homeScore} flash={flashHome} />
            <Text
              style={[
                styles.dash,
                { fontFamily: theme.typography.scoreLg.fontFamily, color: theme.colors.textMuted },
              ]}
            >
              –
            </Text>
            <ScoreLg value={match.awayScore} flash={flashAway} />
          </View>
        </View>

        <View style={styles.side}>
          <Crest team={match.away} size="lg" tint="wash" />
          <Text
            style={[
              styles.teamName,
              { fontFamily: theme.typography.title.fontFamily, color: theme.colors.text },
            ]}
            numberOfLines={1}
          >
            {match.away.name}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 12,
  },
  league: {
    fontSize: 12,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  side: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  teamName: {
    fontSize: 15,
    textAlign: 'center',
  },
  center: {
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
  },
  status: {
    fontSize: 11,
    letterSpacing: 0.3,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  score: {
    fontSize: 34,
    fontWeight: '600',
    minWidth: 40,
    textAlign: 'center',
  },
  dash: {
    fontSize: 24,
  },
});
