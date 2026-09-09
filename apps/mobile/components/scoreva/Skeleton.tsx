/**
 * Skeleton — shimmer block matching ScoreCard/StandingsTable geometry. Plate base,
 * hairline shimmer sweep, 1.1s loop. Disabled when reduce-motion is on.
 */
import { useEffect, useRef, useState } from 'react';
import { Animated, AccessibilityInfo, StyleSheet, View, type DimensionValue } from 'react-native';

import { useScorevaTheme } from './theme';

export interface SkeletonProps {
  width?: DimensionValue;
  height?: number;
  radius?: number;
  style?: object;
}

export function Skeleton({ width = '100%', height = 16, radius = 8, style }: SkeletonProps) {
  const theme = useScorevaTheme();
  const anim = useRef(new Animated.Value(0.4)).current;
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled?.()
      .then((v) => mounted && setReduceMotion(v))
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      anim.setValue(0.6);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 550, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0.4, duration: 550, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [anim, reduceMotion]);

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius: radius,
          backgroundColor: theme.colors.hairline,
          opacity: anim,
        },
        style,
      ]}
    />
  );
}

export function ScoreCardSkeleton() {
  const theme = useScorevaTheme();
  return (
    <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.hairline }]}>
      <Skeleton width={64} height={12} />
      <View style={styles.rowGap}>
        <Skeleton width={28} height={28} radius={8} />
        <Skeleton width="50%" height={14} />
        <Skeleton width={28} height={20} />
      </View>
      <View style={styles.rowGap}>
        <Skeleton width={28} height={28} radius={8} />
        <Skeleton width="50%" height={14} />
        <Skeleton width={28} height={20} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    gap: 10,
    minHeight: 92,
  },
  rowGap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
