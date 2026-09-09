/**
 * Crest — a geometric monogram shield, never a circle crop, never a real club badge.
 *
 * The shield shape is built from two plain View primitives (no react-native-svg dependency):
 * a rounded-top rectangle plus a CSS-triangle "point" beneath it. Club color is applied as
 * either a ≤12% wash across the whole shield or a 3px leading rail — never a full-bleed fill.
 */
import { StyleSheet, Text, View } from 'react-native';

import { useScorevaTheme } from './theme';
import type { Team } from './types';

export type CrestSize = 'sm' | 'md' | 'lg';

const SIZES: Record<CrestSize, number> = { sm: 20, md: 28, lg: 44 };

export interface CrestProps {
  team: Pick<Team, 'name' | 'short' | 'color'>;
  size?: CrestSize;
  /** `wash` tints the whole shield at low opacity; `rail` adds a 3px leading rail only. */
  tint?: 'wash' | 'rail' | 'none';
}

function initialsFor(team: Pick<Team, 'name' | 'short'>): string {
  if (team.short) return team.short.slice(0, 2).toUpperCase();
  const parts = team.name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0] + parts[parts.length - 1]![0]).toUpperCase();
}

export function Crest({ team, size = 'md', tint = 'wash' }: CrestProps) {
  const theme = useScorevaTheme();
  const w = SIZES[size];
  const bodyHeight = w * 0.78;
  const pointHeight = w * 0.42;
  const railWidth = Math.max(2, w * 0.09);

  const baseFill = theme.colors.card;
  const washFill = tint === 'wash' ? withAlpha(team.color, 0.12) : baseFill;

  return (
    <View style={[styles.container, { width: w, height: bodyHeight + pointHeight }]}>
      <View
        style={[
          styles.body,
          {
            width: w,
            height: bodyHeight,
            backgroundColor: washFill,
            borderColor: theme.colors.hairline,
            borderTopLeftRadius: w * 0.22,
            borderTopRightRadius: w * 0.22,
            borderWidth: 1,
            borderBottomWidth: 0,
          },
        ]}
      />
      <View
        style={[
          styles.point,
          {
            borderLeftWidth: w / 2,
            borderRightWidth: w / 2,
            borderTopWidth: pointHeight,
            borderTopColor: washFill,
          },
        ]}
      />
      {tint === 'rail' ? (
        <View
          style={[
            styles.rail,
            { width: railWidth, height: bodyHeight, backgroundColor: team.color },
          ]}
        />
      ) : null}
      <Text
        style={[
          styles.initials,
          {
            fontFamily: theme.typography.ui.fontFamily,
            fontSize: w * 0.36,
            color: theme.colors.text,
            top: bodyHeight * 0.16,
          },
        ]}
        numberOfLines={1}
      >
        {initialsFor(team)}
      </Text>
    </View>
  );
}

function withAlpha(hex: string, alpha: number): string {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return hex;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  body: {
    position: 'absolute',
    top: 0,
  },
  point: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    bottom: 0,
  },
  rail: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderTopLeftRadius: 3,
  },
  initials: {
    position: 'absolute',
    fontWeight: '700',
    textAlign: 'center',
  },
});
