import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Screen, useScorevaTheme } from '@/components/scoreva';
import { useAuth } from '@/providers';

export function AccountScreen() {
  const theme = useScorevaTheme();
  const { session, configured, signIn, signUp, signOut } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  return (
    <Screen>
      <Text style={[styles.title, { fontFamily: theme.typography.title.fontFamily, color: theme.colors.text }]}>
        Account
      </Text>
      <Text style={[styles.body, { fontFamily: theme.typography.body.fontFamily, color: theme.colors.textMuted }]}>
        Explore without an account. Sign in only if you want favorites and notification prefs to sync.
      </Text>
      {!configured ? (
        <Text style={[styles.body, { color: theme.colors.textMuted }]}>
          Add EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY to enable sync. Local favorites already persist on this device.
        </Text>
      ) : null}
      {session ? (
        <View style={styles.gap}>
          <Text style={[styles.body, { color: theme.colors.text }]}>{session.user.email}</Text>
          <Pressable onPress={() => signOut()} style={[styles.cta, { borderColor: theme.colors.hairline }]}>
            <Text style={[styles.ctaText, { color: theme.colors.text }]}>Sign out</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.gap}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor={theme.colors.textMuted}
            autoCapitalize="none"
            keyboardType="email-address"
            style={[styles.input, { borderColor: theme.colors.hairline, color: theme.colors.text }]}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor={theme.colors.textMuted}
            secureTextEntry
            style={[styles.input, { borderColor: theme.colors.hairline, color: theme.colors.text }]}
          />
          <Pressable
            onPress={async () => setMessage(await signIn(email, password))}
            style={[styles.cta, { borderColor: theme.colors.hairline }]}
          >
            <Text style={[styles.ctaText, { color: theme.colors.text }]}>Sign in</Text>
          </Pressable>
          <Pressable
            onPress={async () => setMessage(await signUp(email, password))}
            style={[styles.cta, { borderColor: theme.colors.hairline }]}
          >
            <Text style={[styles.ctaText, { color: theme.colors.text }]}>Create account</Text>
          </Pressable>
          {message ? <Text style={[styles.body, { color: theme.colors.ember }]}>{message}</Text> : null}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: '600' },
  body: { fontSize: 15, lineHeight: 21 },
  gap: { gap: 10 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    height: 44,
    paddingHorizontal: 12,
    fontSize: 15,
  },
  cta: { borderWidth: 1, borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
  ctaText: { fontSize: 15, fontWeight: '600' },
});
