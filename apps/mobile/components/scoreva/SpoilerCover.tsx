/**
 * SpoilerCover — frosted panel over a hidden score. Ice eye-off icon + label, tap to
 * reveal. No swipe-to-peek gimmick.
 */
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { useScorevaTheme } from './theme';

export interface SpoilerCoverProps {
  children: React.ReactNode;
  /** Controlled reveal state. Omit to manage internally. */
  revealed?: boolean;
  onReveal?: () => void;
  label?: string;
}

export function SpoilerCover({ children, revealed, onReveal, label = 'Score hidden' }: SpoilerCoverProps) {
  const theme = useScorevaTheme();
  const [internalRevealed, setInternalRevealed] = useState(false);
  const isRevealed = revealed ?? internalRevealed;

  const handlePress = () => {
    setInternalRevealed(true);
    onReveal?.();
  };

  if (isRevealed) return <>{children}</>;

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={`${label}. Tap to reveal.`}
      style={[styles.cover, { backgroundColor: theme.colors.card, borderColor: theme.colors.hairline }]}
    >
      <View style={styles.hidden} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        {children}
      </View>
      <View style={[styles.frost, { backgroundColor: theme.colors.card }]}>
        <SymbolView
          name={{ ios: 'eye.slash', android: 'visibility_off', web: 'visibility_off' }}
          tintColor={theme.colors.ice}
          size={22}
        />
        <Text
          style={[
            styles.label,
            { fontFamily: theme.typography.ui.fontFamily, color: theme.colors.ice },
          ]}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cover: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  hidden: {
    opacity: 0,
  },
  frost: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    opacity: 0.96,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
});
