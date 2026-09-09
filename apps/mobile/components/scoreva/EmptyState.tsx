/**
 * EmptyState — title + body + one text action. Honest copy, no invented content. Optional
 * `imageSource` composes with a Higgsfield editorial still (see docs/scoreva/higgsfield-prompts.md).
 */
import { Image, Pressable, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native';

import { useScorevaTheme } from './theme';

export interface EmptyStateProps {
  title: string;
  body: string;
  actionLabel?: string;
  onAction?: () => void;
  imageSource?: ImageSourcePropType;
}

export function EmptyState({ title, body, actionLabel, onAction, imageSource }: EmptyStateProps) {
  const theme = useScorevaTheme();

  return (
    <View style={styles.container}>
      {imageSource ? (
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
      ) : null}
      <Text
        style={[
          styles.title,
          { fontFamily: theme.typography.title.fontFamily, color: theme.colors.text },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.body,
          { fontFamily: theme.typography.body.fontFamily, color: theme.colors.textMuted },
        ]}
      >
        {body}
      </Text>
      {actionLabel && onAction ? (
        <Pressable onPress={onAction} accessibilityRole="button">
          <Text
            style={[
              styles.action,
              { fontFamily: theme.typography.ui.fontFamily, color: theme.colors.live },
            ]}
          >
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
    gap: 8,
  },
  image: {
    width: 160,
    height: 220,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  body: {
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
  },
  action: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 8,
  },
});
