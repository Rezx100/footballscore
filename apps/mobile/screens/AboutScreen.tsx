import { StyleSheet, Text, View } from 'react-native';

import { Mark, Screen, Wordmark, useScorevaTheme } from '@/components/scoreva';

export function AboutScreen() {
  const theme = useScorevaTheme();
  return (
    <Screen>
      <View style={styles.brand}>
        <Mark size={48} variant="volt" />
        <Wordmark size={28} />
      </View>
      <Text style={[styles.body, { fontFamily: theme.typography.body.fontFamily, color: theme.colors.textMuted }]}>
        Scoreva is a football-only live scores product. The score is sacred. Honest data only. No odds, no stream paywalls, no invented numbers.
      </Text>
      <Text style={[styles.body, { fontFamily: theme.typography.body.fontFamily, color: theme.colors.textMuted }]}>
        Demo data ships so every screen works. Connect a football API key on the server (Supabase Edge Function football-proxy) when you want live coverage beyond ESPN’s public soccer board.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  brand: { alignItems: 'center', gap: 12, paddingVertical: 16 },
  body: { fontSize: 15, lineHeight: 21 },
});
