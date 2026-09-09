import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Session } from '@supabase/supabase-js';

import { supabase, supabaseConfigured } from '@/lib/supabase';

type AuthContextValue = {
  session: Session | null;
  configured: boolean;
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session ?? null));
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => data.subscription.unsubscribe();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      configured: supabaseConfigured,
      signIn: async (email, password) => {
        if (!supabase) return 'Add EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY to sync an account.';
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return error?.message ?? null;
      },
      signUp: async (email, password) => {
        if (!supabase) return 'Add EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY to sync an account.';
        const { error } = await supabase.auth.signUp({ email, password });
        return error?.message ?? null;
      },
      signOut: async () => {
        await supabase?.auth.signOut();
      },
    }),
    [session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
