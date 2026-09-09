import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';

import { DEFAULT_PREFS } from '@/lib/defaults';
import { supabase, supabaseConfigured } from '@/lib/supabase';
import type { AppPrefs, NotificationKind } from '@/lib/types';

const KEY = 'scoreva:prefs';

type PrefsContextValue = {
  prefs: AppPrefs;
  ready: boolean;
  setPrefs: (patch: Partial<AppPrefs>) => void;
  setNotification: (kind: NotificationKind, value: boolean) => void;
};

const PrefsContext = createContext<PrefsContextValue | null>(null);

function deviceTz(): string {
  try {
    return Localization.getCalendars()[0]?.timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'UTC';
  } catch {
    return 'UTC';
  }
}

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [prefs, setState] = useState<AppPrefs>({ ...DEFAULT_PREFS, tz: deviceTz() });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(KEY);
        if (raw && !cancelled) {
          const parsed = JSON.parse(raw) as Partial<AppPrefs>;
          setState((prev) => ({ ...prev, ...parsed, notifications: { ...prev.notifications, ...parsed.notifications } }));
        }
      } catch {
        // local prefs only
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const persist = useCallback(async (next: AppPrefs) => {
    await AsyncStorage.setItem(KEY, JSON.stringify(next));
    if (supabaseConfigured && supabase) {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        await supabase.from('user_prefs').upsert({
          user_id: data.user.id,
          prefs: next,
          updated_at: new Date().toISOString(),
        });
      }
    }
  }, []);

  const setPrefs = useCallback((patch: Partial<AppPrefs>) => {
    setState((prev) => {
      const next = { ...prev, ...patch, notifications: patch.notifications ? { ...prev.notifications, ...patch.notifications } : prev.notifications };
      persist(next).catch(() => {});
      return next;
    });
  }, [persist]);

  const setNotification = useCallback((kind: NotificationKind, value: boolean) => {
    setState((prev) => {
      const next = { ...prev, notifications: { ...prev.notifications, [kind]: value } };
      persist(next).catch(() => {});
      return next;
    });
  }, [persist]);

  const value = useMemo(() => ({ prefs, ready, setPrefs, setNotification }), [prefs, ready, setPrefs, setNotification]);
  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
}

export function usePrefs() {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error('usePrefs must be used inside PrefsProvider');
  return ctx;
}
