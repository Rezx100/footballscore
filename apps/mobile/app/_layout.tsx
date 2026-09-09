import { Outfit_600SemiBold, Outfit_700Bold } from '@expo-google-fonts/outfit';
import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { IBMPlexMono_500Medium, IBMPlexMono_600SemiBold } from '@expo-google-fonts/ibm-plex-mono';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useScorevaTheme } from '@/components/scoreva';
import { AppProviders } from '@/providers';
import 'react-native-reanimated';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Outfit_600SemiBold,
    Outfit_700Bold,
    Inter_400Regular,
    Inter_600SemiBold,
    IBMPlexMono_500Medium,
    IBMPlexMono_600SemiBold,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded && Platform.OS !== 'web') {
    return null;
  }

  return (
    <AppProviders>
      <RootNav />
    </AppProviders>
  );
}

function RootNav() {
  const theme = useScorevaTheme();
  return (
    <>
      <StatusBar style={theme.scheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
          headerStyle: { backgroundColor: theme.colors.surface },
          headerTintColor: theme.colors.text,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="match/[id]"
          options={{ headerShown: true, title: '', headerShadowVisible: false, headerBackTitle: 'Live' }}
        />
        <Stack.Screen
          name="competition/[id]"
          options={{ headerShown: true, title: '', headerShadowVisible: false, headerBackTitle: 'Back' }}
        />
        <Stack.Screen
          name="team/[id]"
          options={{ headerShown: true, title: '', headerShadowVisible: false, headerBackTitle: 'Back' }}
        />
        <Stack.Screen
          name="player/[id]"
          options={{ headerShown: true, title: '', headerShadowVisible: false, headerBackTitle: 'Back' }}
        />
        <Stack.Screen
          name="notifications"
          options={{ headerShown: true, title: '', headerShadowVisible: false, headerBackTitle: 'More' }}
        />
        <Stack.Screen
          name="widgets"
          options={{ headerShown: true, title: '', headerShadowVisible: false, headerBackTitle: 'More' }}
        />
        <Stack.Screen
          name="account"
          options={{ headerShown: true, title: '', headerShadowVisible: false, headerBackTitle: 'More' }}
        />
        <Stack.Screen
          name="about"
          options={{ headerShown: true, title: '', headerShadowVisible: false, headerBackTitle: 'More' }}
        />
      </Stack>
    </>
  );
}
