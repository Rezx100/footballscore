/**
 * LivePulse — volt dot + tabular minute, pulsing 1.2s. The only place volt loops.
 * Disabled automatically when the OS reduce-motion setting is on.
 */
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View, AccessibilityInfo } from 'react-native';

import { useScorevaTheme } from './theme';

export interface LivePulseProps {
  /** Match minute, e.g. 67. Omit for HT/FT/PP/AB captions instead (use a plain Text there). */
  minute?: number;
  /** Show the "LIVE" word next to the dot. Default true. */
  label?: boolean;
  size?: number;
}

export function LivePulse({ minute, label = true, size = 6 }: LivePulseProps) {
  const theme = useScorevaTheme();
  const opacity = useRef(new Animated.Value(1)).current;
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
      opacity.setValue(1);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity, reduceMotion]);

  const minuteLabel = minute != null ? `${minute}'` : undefined;

  return (
    <View
      style={styles.row}
      accessible
      accessibilityLabel={minuteLabel ? `Live, minute ${minute}` : 'Live'}
      accessibilityRole="text"
      importantForAccessibility="yes"
    >
      <View importantForAccessibility="no-hide-descendants" style={styles.row}>
      <Animated.View
        style={[
          styles.dot,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: theme.colors.live,
            opacity,
          },
        ]}
      />
      {label ? (
        <Text
          style={[
            styles.label,
            { fontFamily: theme.typography.caption.fontFamily, color: theme.colors.live },
          ]}
        >
          LIVE
        </Text>
      ) : null}
      {minuteLabel ? (
        <Text
          style={[
            styles.minute,
            { fontFamily: theme.typography.minute.fontFamily, color: theme.colors.live },
          ]}
        >
          {minuteLabel}
        </Text>
      ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {},
  label: {
    fontSize: 11,
    letterSpacing: 0.4,
  },
  minute: {
    fontSize: 12,
  },
});
