/**
 * DualStats — home/away stat bars. Club-tint fill at accessible contrast on a hairline
 * track. Values in tabular Meta on both ends, never color alone conveying the comparison.
 */
import { StyleSheet, Text, View } from 'react-native';

import { useScorevaTheme } from './theme';

export interface DualStatRow {
  label: string;
  homeValue: number;
  awayValue: number;
  /** Format for display, e.g. add "%". Defaults to plain number. */
  format?: (n: number) => string;
}

export interface DualStatsProps {
  rows: DualStatRow[];
  homeColor: string;
  awayColor: string;
}

export function DualStats({ rows, homeColor, awayColor }: DualStatsProps) {
  const theme = useScorevaTheme();

  return (
    <View style={styles.list}>
      {rows.map((row) => {
        const total = row.homeValue + row.awayValue || 1;
        const homePct = (row.homeValue / total) * 100;
        const fmt = row.format ?? ((n: number) => `${n}`);
        return (
          <View key={row.label} style={styles.row}>
            <View style={styles.valueRow}>
              <Text
                style={[
                  styles.value,
                  { fontFamily: theme.typography.meta.fontFamily, color: theme.colors.text },
                ]}
              >
                {fmt(row.homeValue)}
              </Text>
              <Text
                style={[
                  styles.label,
                  { fontFamily: theme.typography.meta.fontFamily, color: theme.colors.textMuted },
                ]}
              >
                {row.label}
              </Text>
              <Text
                style={[
                  styles.value,
                  { fontFamily: theme.typography.meta.fontFamily, color: theme.colors.text },
                ]}
              >
                {fmt(row.awayValue)}
              </Text>
            </View>
            <View style={[styles.track, { backgroundColor: theme.colors.hairline }]}>
              <View style={[styles.fill, { width: `${homePct}%`, backgroundColor: homeColor }]} />
              <View
                style={[
                  styles.fill,
                  { width: `${100 - homePct}%`, backgroundColor: awayColor },
                ]}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 14,
  },
  row: {
    gap: 6,
  },
  valueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  value: {
    fontSize: 12,
    width: 40,
    fontVariant: ['tabular-nums'],
  },
  label: {
    fontSize: 12,
    flex: 1,
    textAlign: 'center',
  },
  track: {
    flexDirection: 'row',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});
