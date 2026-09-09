import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Mark, useScorevaTheme, Wordmark } from '@/components/scoreva';

interface Slide {
  title: string;
  body: string;
}

const SLIDES: Slide[] = [
  {
    title: 'The signal',
    body: 'One volt flare the instant a score changes. Everything else stays dark until it matters.',
  },
  {
    title: 'The bowl',
    body: 'Every match, every league, one night studio. Football only — no odds, no noise.',
  },
  {
    title: 'The ledger',
    body: 'Follow your clubs. Scoreva keeps the board; you decide what lights up.',
  },
];

export interface OnboardingScreenProps {
  onDone: () => void;
}

export function OnboardingScreen({ onDone }: OnboardingScreenProps) {
  const theme = useScorevaTheme();
  const [index, setIndex] = useState(0);
  const isLast = index === SLIDES.length - 1;
  const slide = SLIDES[index]!;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.night }]}>
      <View style={styles.brand}>
        <Mark size={40} variant="volt" />
        <Wordmark size={24} tone="bone" />
      </View>

      <View style={styles.body}>
        <Text style={[styles.title, { fontFamily: theme.typography.title.fontFamily, color: theme.colors.bone }]}>
          {slide.title}
        </Text>
        <Text style={[styles.copy, { fontFamily: theme.typography.body.fontFamily, color: theme.colors.mute }]}>
          {slide.body}
        </Text>
      </View>

      <View style={styles.dots}>
        {SLIDES.map((s, i) => (
          <View
            key={s.title}
            style={[
              styles.dot,
              { backgroundColor: i === index ? theme.colors.volt : theme.colors.hairline },
            ]}
          />
        ))}
      </View>

      <Pressable
        onPress={() => (isLast ? onDone() : setIndex((i) => i + 1))}
        accessibilityRole="button"
        style={[styles.cta, { borderColor: theme.colors.hairline }]}
      >
        <Text style={[styles.ctaText, { fontFamily: theme.typography.ui.fontFamily, color: theme.colors.bone }]}>
          {isLast ? 'Get started' : 'Next'}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  brand: {
    alignItems: 'center',
    gap: 12,
    marginTop: 24,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
  },
  copy: {
    fontSize: 16,
    lineHeight: 23,
    textAlign: 'center',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  cta: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
