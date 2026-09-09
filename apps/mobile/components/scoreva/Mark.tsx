/**
 * The Aperture — Scoreva's logomark. An elliptical stadium-bowl ring pierced by one
 * diagonal volt slash, the nova of a score changing. Never a football, never a filled disc.
 *
 * Built with plain View primitives (no react-native-svg dependency): the ring is a circle
 * squashed horizontally with `transform: scaleX`, which keeps the stroke crisp at the small
 * sizes this mark actually ships at (tab bar, header, splash). The pixel-exact vector lives
 * in `apps/mobile/assets/brand/` (see docs/scoreva/higgsfield-prompts.md, prompts A1–A4).
 */
import { StyleSheet, View } from 'react-native';

import { useScorevaTheme } from './theme';

export interface MarkProps {
  /** Overall bounding box size in points. Ring width is derived from this. */
  size?: number;
  /** `mono` renders the ring in the current theme's text color; `volt` renders it in volt. */
  variant?: 'mono' | 'volt';
  /** Explicit ring color override. Takes precedence over `variant`. */
  color?: string;
  /** Explicit slash color override. Defaults to volt (night-on-volt when `variant="volt"`). */
  slashColor?: string;
}

const ELLIPSE_ASPECT = 1.4;

export function Mark({ size = 28, variant = 'mono', color, slashColor }: MarkProps) {
  const theme = useScorevaTheme();
  const ringColor = color ?? (variant === 'volt' ? theme.colors.volt : theme.colors.text);
  const flashColor = slashColor ?? (variant === 'volt' ? theme.colors.night : theme.colors.volt);
  const strokeWidth = Math.max(1.5, size * 0.08);
  const ringDiameter = size * 0.86;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View
        style={[
          styles.ring,
          {
            width: ringDiameter,
            height: ringDiameter,
            borderRadius: ringDiameter / 2,
            borderWidth: strokeWidth,
            borderColor: ringColor,
            // Squash a circle vertically to get a flattened 1.4:1 ellipse without SVG.
            transform: [{ scaleY: 1 / ELLIPSE_ASPECT }],
          },
        ]}
      />
      <View
        style={[
          styles.slash,
          {
            width: strokeWidth * 1.15,
            height: size * 1.05,
            backgroundColor: flashColor,
            transform: [{ rotate: '20deg' }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
  },
  slash: {
    position: 'absolute',
    borderRadius: 1,
  },
});
