import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { useScorevaTheme } from '@/components/scoreva';

export default function NotFound() {
  const theme = useScorevaTheme();
  return (
    <>
      <Stack.Screen options={{ title: 'Missing' }} />
      <View style={[styles.wrap, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>This board is empty.</Text>
        <Link href="/(tabs)" style={{ color: theme.colors.live }}>
          Back to Live
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  title: { fontSize: 20, fontWeight: '600' },
});
