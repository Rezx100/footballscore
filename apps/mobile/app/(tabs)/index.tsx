import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'expo-router';

import { HomeScreen } from '@/screens';
import { MATCHES } from '@/lib/demo';
import { loadDayFeed } from '@/lib/api';
import { buildDateRail, dayKey, todayKey } from '@/lib/dates';
import { withLiveClock } from '@/lib/live';
import type { FeedResult } from '@/lib/api';
import { useFollow, useLiveTick, usePrefs } from '@/providers';

export default function LiveTab() {
  const router = useRouter();
  const { prefs } = usePrefs();
  const follow = useFollow();
  const tick = useLiveTick();
  const [day, setDay] = useState(() => todayKey(prefs.tz));
  const [feed, setFeed] = useState<FeedResult>({ matches: MATCHES, source: 'demo' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
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
  }, [day, tick, prefs.tz]);

  const matches = useMemo(() => {
    let rows = feed.matches.map((m) => withLiveClock(m, tick));
    if (prefs.hideFinished) rows = rows.filter((m) => m.status !== 'ft');
    return rows;
  }, [feed.matches, prefs.hideFinished, tick]);

  const days = useMemo(() => {
    return buildDateRail(todayKey(prefs.tz)).map((d) => ({
      ...d,
      liveCount: MATCHES.filter((m) => {
        const live = withLiveClock(m, tick);
        return dayKey(m.kickoffIso, prefs.tz) === d.iso && (live.status === 'live' || live.status === 'ht');
      }).length,
    }));
  }, [prefs.tz, tick]);

  return (
    <HomeScreen
      matches={matches}
      days={days}
      activeIso={day}
      onSelectDay={setDay}
      followedTeamIds={follow.follow.teams}
      followedMatchIds={follow.follow.matches}
      spoiler={prefs.spoiler}
      loading={loading}
      source={feed.source}
      stale={feed.stale}
      onOpenMatch={(m) => router.push(`/match/${m.id}`)}
      onOpenSearch={() => router.push('/(tabs)/search')}
      onToggleFollow={(m) => follow.toggleMatch(m.id)}
    />
  );
}
