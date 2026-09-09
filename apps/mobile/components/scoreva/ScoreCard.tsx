/**
 * ScoreCard — the signature match row. Home over away, stacked, reserved tabular score
 * column. Status caption sits above the score, never a trailing icon/TV column.
 *
 * ```
 * [● 67′]                         LIVE
 * [crest] Arsenal          ARS    2
 * [crest] Chelsea          CHE    1
 * ```
 */
import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';

import { Crest } from './Crest';
import { LivePulse } from './LivePulse';
import { useScorevaTheme } from './theme';
import type { Match } from './types';

export interface ScoreCardProps {
  match: Match;
  followed?: boolean;
  onPress?: (match: Match) => void;
  onToggleFollow?: (match: Match) => void;
}

function statusCaption(match: Match): string | null {
  switch (match.status) {
    case 'ht':
      return 'HT';
    case 'ft':
      return 'FT';
    case 'pp':
      return 'PP';
    case 'ab':
      return 'AB';
    case 'ns': {
      const d = new Date(match.kickoffIso);
      if (Number.isNaN(d.getTime())) return null;
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    default:
      return null;
  }
}

function ScoreDigit({ value, flash }: { value: number | undefined; flash: boolean }) {
  const theme = useScorevaTheme();
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!flash) return;
    anim.setValue(1);
    Animated.timing(anim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [flash, anim]);

  const color = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.text, theme.colors.ember],
  });

  return (
    <Animated.Text
      style={[
        styles.score,
        { fontFamily: theme.typography.score.fontFamily, color },
      ]}
    >
      {value ?? '-'}
    </Animated.Text>
  );
}

function TeamRow({
  team,
  score,
  muted,
  flash,
  rail,
}: {
  team: Match['home'];
  score: number | undefined;
  muted: boolean;
  flash: boolean;
  rail: boolean;
}) {
  const theme = useScorevaTheme();
  return (
    <View style={styles.teamRow}>
      {rail ? (
        <View style={[styles.rail, { backgroundColor: team.color }]} />
      ) : null}
      <Crest team={team} size="sm" tint="wash" />
      <Text
        style={[
          styles.teamName,
          {
            fontFamily: theme.typography.ui.fontFamily,
            color: muted ? theme.colors.textMuted : theme.colors.text,
          },
        ]}
        numberOfLines={1}
      >
        {team.name}
      </Text>
      <Text
        style={[
          styles.teamShort,
          { fontFamily: theme.typography.minute.fontFamily, color: theme.colors.textMuted },
        ]}
      >
        {team.short}
      </Text>
      <ScoreDigit value={score} flash={flash} />
    </View>
  );
}

export function ScoreCard({ match, followed, onPress, onToggleFollow }: ScoreCardProps) {
  const theme = useScorevaTheme();
  const caption = statusCaption(match);
  const isLive = match.status === 'live';
  const isFt = match.status === 'ft';

  const prevScores = useRef<{ home?: number; away?: number }>({
    home: match.homeScore,
    away: match.awayScore,
  });
  const [flashHome, setFlashHome] = useState(false);
  const [flashAway, setFlashAway] = useState(false);

  useEffect(() => {
    const prev = prevScores.current;
    const homeIncreased =
      match.homeScore != null && prev.home != null && match.homeScore > prev.home;
    const awayIncreased =
      match.awayScore != null && prev.away != null && match.awayScore > prev.away;

    if (homeIncreased || awayIncreased) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      if (homeIncreased) setFlashHome(true);
      if (awayIncreased) setFlashAway(true);
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

  const homeWon = isFt && (match.homeScore ?? 0) > (match.awayScore ?? 0);
  const awayWon = isFt && (match.awayScore ?? 0) > (match.homeScore ?? 0);

  return (
    <Pressable
      onPress={() => onPress?.(match)}
      onLongPress={() => onToggleFollow?.(match)}
      accessibilityRole="button"
      accessibilityLabel={`${match.home.name} vs ${match.away.name}, ${
        isLive ? `live, minute ${match.minute}` : caption ?? ''
      }, score ${match.homeScore ?? '-'} to ${match.awayScore ?? '-'}`}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.hairline,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <View style={styles.statusRow}>
        {isLive ? (
          <LivePulse minute={match.minute} label={false} />
        ) : (
          <Text
            style={[
              styles.caption,
              { fontFamily: theme.typography.caption.fontFamily, color: theme.colors.textMuted },
            ]}
          >
            {caption}
          </Text>
        )}
        <Text
          style={[
            styles.caption,
            {
              fontFamily: theme.typography.caption.fontFamily,
              color: isLive ? theme.colors.live : theme.colors.textMuted,
            },
          ]}
        >
          {isLive ? 'LIVE' : followed ? '★ FOLLOWING' : match.leagueName ?? ''}
        </Text>
      </View>

      <TeamRow
        team={match.home}
        score={match.homeScore}
        muted={awayWon}
        flash={flashHome}
        rail
      />
      <TeamRow team={match.away} score={match.awayScore} muted={homeWon} flash={flashAway} rail={false} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    gap: 6,
    minHeight: 92,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  caption: {
    fontSize: 11,
    letterSpacing: 0.3,
  },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    position: 'relative',
    paddingLeft: 4,
  },
  rail: {
    position: 'absolute',
    left: -12,
    top: 0,
    bottom: 0,
    width: 3,
    borderRadius: 1.5,
  },
  teamName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
  },
  teamShort: {
    fontSize: 12,
    width: 32,
    textAlign: 'right',
  },
  score: {
    fontSize: 20,
    fontWeight: '600',
    width: 28,
    textAlign: 'right',
  },
});
