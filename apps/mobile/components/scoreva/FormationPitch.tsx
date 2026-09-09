/**
 * FormationPitch — schematic 4-3-3 (or any formation) panel. Hairline grid lines on a
 * studio panel, never a photo-real turf texture and never pitch green.
 */
import { StyleSheet, Text, View } from 'react-native';

import { useScorevaTheme } from './theme';

export interface FormationPlayer {
  id: string;
  number: number;
  initials: string;
  /** 0 (own goal line) to 1 (opponent goal line). */
  x: number;
  /** 0 (left touchline) to 1 (right touchline). */
  y: number;
}

export interface FormationPitchProps {
  players: FormationPlayer[];
  formation?: string;
  height?: number;
}

export function FormationPitch({ players, formation, height = 260 }: FormationPitchProps) {
  const theme = useScorevaTheme();

  return (
    <View style={[styles.panel, { backgroundColor: theme.colors.surface, borderColor: theme.colors.hairline }]}>
      {formation ? (
        <Text
          style={[
            styles.formationLabel,
            { fontFamily: theme.typography.caption.fontFamily, color: theme.colors.textMuted },
          ]}
        >
          {formation}
        </Text>
      ) : null}
      <View style={[styles.pitch, { height, borderColor: theme.colors.hairline }]}>
        <View style={[styles.halfLine, { backgroundColor: theme.colors.hairline }]} />
        <View style={[styles.centerCircle, { borderColor: theme.colors.hairline }]} />
        {players.map((p) => (
          <View
            key={p.id}
            style={[
              styles.chip,
              {
                left: `${p.y * 100}%`,
                top: `${(1 - p.x) * 100}%`,
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.hairline,
              },
            ]}
          >
            <Text
              style={[
                styles.chipText,
                { fontFamily: theme.typography.minute.fontFamily, color: theme.colors.text },
              ]}
            >
              {p.number}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  formationLabel: {
    fontSize: 11,
    textAlign: 'center',
    letterSpacing: 0.4,
  },
  pitch: {
    borderWidth: 1,
    borderRadius: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  halfLine: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 1,
  },
  centerCircle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    marginLeft: -28,
    marginTop: -28,
  },
  chip: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -14,
    marginTop: -14,
  },
  chipText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
