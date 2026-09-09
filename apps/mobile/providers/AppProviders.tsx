import type { ReactNode } from 'react';

import { ScorevaThemeProvider, type ScorevaColorScheme } from '@/components/scoreva';
import { AuthProvider } from './AuthProvider';
import { FollowProvider } from './FollowProvider';
import { PrefsProvider, usePrefs } from './PrefsProvider';

function ThemeBridge({ children }: { children: ReactNode }) {
  const { prefs } = usePrefs();
  const scheme: ScorevaColorScheme | undefined = prefs.scheme === 'system' ? undefined : prefs.scheme;
  return <ScorevaThemeProvider scheme={scheme}>{children}</ScorevaThemeProvider>;
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <PrefsProvider>
        <FollowProvider>
          <ThemeBridge>{children}</ThemeBridge>
        </FollowProvider>
      </PrefsProvider>
    </AuthProvider>
  );
}
