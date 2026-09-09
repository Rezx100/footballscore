/**
 * Screen — page chrome. Safe-area canvas, optional sticky header slot, 16px horizontal
 * pad. Dark theme first-class; respects light tokens via useScorevaTheme.
 */
import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useScorevaTheme } from './theme';

export interface ScreenProps {
  children: ReactNode;
  /** Sticky slot rendered above the scroll content, e.g. a masthead or MatchHeader. */
  header?: ReactNode;
  scroll?: boolean;
  /** Disable the default 16px horizontal padding, e.g. for full-bleed date rails. */
  noPadding?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export function Screen({
  children,
  header,
  scroll = true,
  noPadding,
  contentContainerStyle,
}: ScreenProps) {
  const theme = useScorevaTheme();
  const contentStyle: StyleProp<ViewStyle>[] = [
    !noPadding && styles.padded,
    scroll && styles.scrollPad,
    contentContainerStyle,
  ];

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]} edges={['top']}>
      {header ? (
        <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>{header}</View>
      ) : null}
      {scroll ? (
        <ScrollView style={styles.body} contentContainerStyle={contentStyle}>
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.body, contentStyle]}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  header: {
    zIndex: 1,
  },
  body: {
    flex: 1,
  },
  padded: {
    paddingHorizontal: 16,
  },
  scrollPad: {
    paddingBottom: 32,
    gap: 12,
  },
});
