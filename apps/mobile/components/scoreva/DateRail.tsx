/**
 * DateRail — horizontal 7-day strip. Active day: volt underline + volt text over a ≤12%
 * volt wash. Never a solid volt pill (volt is a signal, not a fill).
 */
import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useScorevaTheme } from './theme';

export interface DateRailDay {
  /** ISO date, e.g. "2026-09-09". Used as the stable key. */
  iso: string;
  /** Short label, e.g. "Mon", "Tue". */
  label: string;
  /** Day-of-month, e.g. "09". */
  day: string;
  /** Count of live matches on this day, shown as a small volt dot badge when > 0. */
  liveCount?: number;
}

export interface DateRailProps {
  days: DateRailDay[];
  activeIso: string;
  onSelect: (iso: string) => void;
}

export function DateRail({ days, activeIso, onSelect }: DateRailProps) {
  const theme = useScorevaTheme();
  const voltWash = useMemo(() => 'rgba(215, 255, 60, 0.12)', []);

  return (
    <View style={[styles.wrap, { backgroundColor: theme.colors.surface }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {days.map((d) => {
          const active = d.iso === activeIso;
          return (
            <Pressable
              key={d.iso}
              onPress={() => onSelect(d.iso)}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              accessibilityLabel={`${d.label} ${d.day}${d.liveCount ? `, ${d.liveCount} live` : ''}`}
              style={[
                styles.tab,
                {
                  backgroundColor: active ? voltWash : 'transparent',
                  borderBottomColor: active ? theme.colors.volt : 'transparent',
                },
              ]}
            >
              <Text
                style={[
                  styles.label,
                  {
                    fontFamily: theme.typography.meta.fontFamily,
                    color: active ? theme.colors.volt : theme.colors.textMuted,
                  },
                ]}
              >
                {d.label}
              </Text>
              <Text
                style={[
                  styles.day,
                  {
                    fontFamily: theme.typography.ui.fontFamily,
                    color: active ? theme.colors.volt : theme.colors.text,
                  },
                ]}
              >
                {d.day}
              </Text>
              {d.liveCount ? (
                <View style={[styles.badge, { backgroundColor: theme.colors.volt }]} />
              ) : null}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingVertical: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderBottomWidth: 2,
    minWidth: 44,
  },
  label: {
    fontSize: 11,
  },
  day: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 2,
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 6,
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
});
