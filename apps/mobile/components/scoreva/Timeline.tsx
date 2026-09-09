/**
 * Timeline — match centre's default panel. Newest event first. Goal rows carry a thin
 * ember rail (never a full-bleed red card); cards use semantic chip colors; substitutions
 * stay quiet.
 */
import { StyleSheet, Text, View } from 'react-native';

import { useScorevaTheme } from './theme';

export type TimelineEventType = 'goal' | 'yellow-card' | 'red-card' | 'substitution' | 'other';

export interface TimelineEvent {
  id: string;
  minute: number;
  type: TimelineEventType;
  text: string;
  side?: 'home' | 'away';
}

export interface TimelineProps {
  events: TimelineEvent[];
}

function dotColor(type: TimelineEventType, theme: ReturnType<typeof useScorevaTheme>): string {
  switch (type) {
    case 'goal':
      return theme.colors.ember;
    case 'red-card':
      return theme.colors.cardRed;
    case 'yellow-card':
      return theme.colors.cardAmber;
    default:
      return theme.colors.textMuted;
  }
}

export function Timeline({ events }: TimelineProps) {
  const theme = useScorevaTheme();
  const sorted = [...events].sort((a, b) => b.minute - a.minute);

  return (
    <View style={styles.list}>
      {sorted.map((event) => {
        const accent = dotColor(event.type, theme);
        const isGoal = event.type === 'goal';
        return (
          <View
            key={event.id}
            style={[
              styles.row,
              isGoal && {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.hairline,
                borderWidth: 1,
                borderRadius: 12,
              },
            ]}
          >
            <View style={[styles.rail, { backgroundColor: isGoal ? accent : theme.colors.hairline }]} />
            <Text
              style={[
                styles.minute,
                { fontFamily: theme.typography.minute.fontFamily, color: theme.colors.textMuted },
              ]}
            >
              {event.minute}&apos;
            </Text>
            <View style={[styles.dot, { backgroundColor: accent }]} />
            <Text
              style={[
                styles.text,
                {
                  fontFamily: theme.typography.body.fontFamily,
                  color: isGoal ? theme.colors.text : theme.colors.textMuted,
                },
              ]}
            >
              {event.text}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    position: 'relative',
  },
  rail: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    borderRadius: 1.5,
  },
  minute: {
    fontSize: 12,
    width: 28,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  text: {
    flex: 1,
    fontSize: 15,
    lineHeight: 21,
  },
});
