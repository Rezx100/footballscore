import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { MATCHES } from '@/lib/demo';
import { loadDayFeed, type FeedResult } from '@/lib/api';
import { rememberMatches } from '@/lib/registry';
import { buildDateRail, dayKey, todayKey } from '@/lib/dates';
import { withLiveClock } from '@/lib/live';
import type { Match } from '@/lib/types';
import { useLiveTick } from './useLiveTick';
import { usePrefs } from './PrefsProvider';

type FeedContextValue = {
  day: string;
  setDay: (iso: string) => void;
  matches: Match[];
  source: FeedResult['source'];
  stale?: boolean;
  loading: boolean;
  days: ReturnType<typeof buildDateRail>;
};

const FeedContext = createContext<FeedContextValue | null>(null);

export function FeedProvider({ children }: { children: ReactNode }) {
  const { prefs } = usePrefs();
  const tick = useLiveTick();
  const [day, setDay] = useState(() => todayKey(prefs.tz));
  const [feed, setFeed] = useState<FeedResult>(() => {
    rememberMatches(MATCHES);
    return { matches: MATCHES, source: 'demo' };
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const first = feed.matches === MATCHES;
    if (first) setLoading(true);
    loadDayFeed(day, prefs.tz)
      .then((result) => {
        if (!cancelled) setFeed(result);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // tick re-polls ESPN every 8s without a skeleton flash
  }, [day, tick, prefs.tz]);

  const matches = useMemo(() => {
    let rows = feed.matches.map((m) => withLiveClock(m, tick));
    if (prefs.hideFinished) rows = rows.filter((m) => m.status !== 'ft');
    return rows;
  }, [feed.matches, prefs.hideFinished, tick]);

  const days = useMemo(() => {
    return buildDateRail(todayKey(prefs.tz)).map((d) => ({
      ...d,
      liveCount: matches.filter((m) => {
        return dayKey(m.kickoffIso, prefs.tz) === d.iso && (m.status === 'live' || m.status === 'ht');
      }).length,
    }));
  }, [matches, prefs.tz]);

  const setDaySafe = useCallback((iso: string) => {
    setLoading(true);
    setDay(iso);
  }, []);

  const value = useMemo<FeedContextValue>(
    () => ({
      day,
      setDay: setDaySafe,
      matches,
      source: feed.source,
      stale: feed.stale,
      loading,
      days,
    }),
    [day, setDaySafe, matches, feed.source, feed.stale, loading, days],
  );

  return <FeedContext.Provider value={value}>{children}</FeedContext.Provider>;
}

export function useFeed() {
  const ctx = useContext(FeedContext);
  if (!ctx) throw new Error('useFeed must be used inside FeedProvider');
  return ctx;
}
