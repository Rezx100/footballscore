import { StyleSheet, Text, View } from 'react-native';

import { LiveTracker, Screen, useScorevaTheme } from '@/components/scoreva';
import { MATCHES } from '@/lib/demo';
import { withLiveClock } from '@/lib/live';

export function WidgetPreviewScreen() {
  const theme = useScorevaTheme();
  const live = MATCHES.filter((m) => m.status === 'live' || m.status === 'ht').map((m) => withLiveClock(m));

  return (
    <Screen>
      <Text style={[styles.title, { fontFamily: theme.typography.title.fontFamily, color: theme.colors.text }]}>
        Widgets
      </Text>
      <Text style={[styles.body, { fontFamily: theme.typography.body.fontFamily, color: theme.colors.textMuted }]}>
        Home-screen widgets and Live Activities ship in the EAS production build. Expo Go shows the same compact tracker the widget uses.
      </Text>
      {live.map((m) => (
        <LiveTracker key={m.id} match={m} />
      ))}
      <View style={[styles.spec, { borderColor: theme.colors.hairline, backgroundColor: theme.colors.card }]}>
        <Text style={[styles.specTitle, { fontFamily: theme.typography.ui.fontFamily, color: theme.colors.text }]}>
          iOS
        </Text>
        <Text style={[styles.hint, { color: theme.colors.textMuted }]}>
          WidgetKit medium score board + Live Activity Dynamic Island. Shared App Group writes the followed live match every 8s.
        </Text>
        <Text style={[styles.specTitle, { fontFamily: theme.typography.ui.fontFamily, color: theme.colors.text }]}>
          Android
        </Text>
        <Text style={[styles.hint, { color: theme.colors.textMuted }]}>
          Glance widgets: timeline, compact score, and commentary. Pin from the widget picker after an EAS build.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: '600' },
  body: { fontSize: 15, lineHeight: 21 },
  spec: { borderWidth: 1, borderRadius: 12, padding: 14, gap: 8 },
  specTitle: { fontSize: 15, marginTop: 4 },
  hint: { fontSize: 13, lineHeight: 19 },
});
