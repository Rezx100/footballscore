import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { DEFAULT_FOLLOW } from '@/lib/defaults';
import { supabase, supabaseConfigured } from '@/lib/supabase';
import type { FollowState } from '@/lib/types';

const KEY = 'scoreva:follow';

type FollowContextValue = {
  follow: FollowState;
  ready: boolean;
  isFollowingTeam: (id: string) => boolean;
  isFollowingCompetition: (id: string) => boolean;
  isFollowingMatch: (id: string) => boolean;
  toggleTeam: (id: string) => void;
  toggleCompetition: (id: string) => void;
  toggleMatch: (id: string) => void;
  setTeams: (ids: string[]) => void;
  setCompetitions: (ids: string[]) => void;
};

const FollowContext = createContext<FollowContextValue | null>(null);

function toggleId(list: string[], id: string): string[] {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}

export function FollowProvider({ children }: { children: ReactNode }) {
  const [follow, setFollow] = useState<FollowState>(DEFAULT_FOLLOW);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(KEY);
        if (raw && !cancelled) setFollow(JSON.parse(raw) as FollowState);
      } catch {
        // local follow graph
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const persist = useCallback(async (next: FollowState) => {
    await AsyncStorage.setItem(KEY, JSON.stringify(next));
    if (supabaseConfigured && supabase) {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        await supabase.from('user_follows').upsert({
          user_id: data.user.id,
          teams: next.teams,
          competitions: next.competitions,
          matches: next.matches,
          updated_at: new Date().toISOString(),
        });
      }
    }
  }, []);

  const write = useCallback((updater: (prev: FollowState) => FollowState) => {
    setFollow((prev) => {
      const next = updater(prev);
      persist(next).catch(() => {});
      return next;
    });
  }, [persist]);

  const value = useMemo<FollowContextValue>(
    () => ({
      follow,
      ready,
      isFollowingTeam: (id) => follow.teams.includes(id),
      isFollowingCompetition: (id) => follow.competitions.includes(id),
      isFollowingMatch: (id) => follow.matches.includes(id),
      toggleTeam: (id) => write((p) => ({ ...p, teams: toggleId(p.teams, id) })),
      toggleCompetition: (id) => write((p) => ({ ...p, competitions: toggleId(p.competitions, id) })),
      toggleMatch: (id) => write((p) => ({ ...p, matches: toggleId(p.matches, id) })),
      setTeams: (ids) => write((p) => ({ ...p, teams: ids })),
      setCompetitions: (ids) => write((p) => ({ ...p, competitions: ids })),
    }),
    [follow, ready, write],
  );

  return <FollowContext.Provider value={value}>{children}</FollowContext.Provider>;
}

export function useFollow() {
  const ctx = useContext(FollowContext);
  if (!ctx) throw new Error('useFollow must be used inside FollowProvider');
  return ctx;
}
