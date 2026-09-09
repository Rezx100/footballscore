/**
 * "Scoreva" wordmark lockup — Outfit Bold with a trailing volt spark, never a full stop.
 */
import { StyleSheet, Text, View } from 'react-native';

import { useScorevaTheme } from './theme';

export interface WordmarkProps {
  size?: number;
  tone?: 'bone' | 'ink' | 'volt';
  /** Show the trailing volt spark dot after the final "a". Default true. */
  spark?: boolean;
}

const INK = '#0E1014';

export function Wordmark({ size = 20, tone, spark = true }: WordmarkProps) {
  const theme = useScorevaTheme();
  const resolvedTone =
    tone === 'volt' ? theme.colors.volt : tone === 'ink' ? INK : theme.colors.text;

  return (
    <View style={styles.row}>
      <Text
        style={[
          styles.text,
          {
            fontFamily: theme.typography.wordmark.fontFamily,
            letterSpacing: theme.typography.wordmark.letterSpacing,
            fontSize: size,
            lineHeight: size * 1.2,
            color: resolvedTone,
          },
        ]}
      >
        Scoreva
      </Text>
      {spark ? (
        <View
          style={[
            styles.spark,
            {
              width: Math.max(3, size * 0.16),
              height: Math.max(3, size * 0.16),
              borderRadius: Math.max(3, size * 0.16) / 2,
              backgroundColor: theme.colors.volt,
              marginLeft: size * 0.06,
              marginBottom: size * 0.14,
            },
          ]}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  text: {
    fontWeight: '700',
  },
  spark: {},
});
