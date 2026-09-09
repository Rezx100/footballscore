import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import {
  DateRail,
  LiveTracker,
  Screen,
  ScoreCard,
  ScoreCardSkeleton,
  SpoilerCover,
  Wordmark,
  useScorevaTheme,
} from '@/components/scoreva';
import type { DateRailDay } from '@/components/scoreva';
import type { DataSource, Match } from '@/lib/types';
import { isLiveStatus } from '@/lib/live';

export interface HomeScreenProps {
  matches: Match[];
  days: DateRailDay[];
  activeIso: string;
  onSelectDay: (iso: string) => void;
  followedTeamIds?: string[];
  followedMatchIds?: string[];
  spoiler?: boolean;
  loading?: boolean;
  source?: DataSource;
  stale?: boolean;
  onOpenMatch?: (match: Match) => void;
  onOpenSearch?: () => void;
  onToggleFollow?: (match: Match) => void;
}

function groupByLeague(matches: Match[]): Array<{ id: string; name: string; matches: Match[] }> {
  const map = new Map<string, { id: string; name: string; matches: Match[] }>();
  for (const match of matches) {
    const id = match.leagueId;
    const existing = map.get(id);
    if (existing) existing.matches.push(match);
    else map.set(id, { id, name: match.leagueName ?? id, matches: [match] });
  }
  return Array.from(map.values());
}

export function HomeScreen({
  matches,
  days,
  activeIso,
  onSelectDay,
  followedTeamIds = [],
  followedMatchIds = [],
  spoiler,
  loading,
  source,
  stale,
  onOpenMatch,
  onOpenSearch,
  onToggleFollow,
}: HomeScreenProps) {
  const theme = useScorevaTheme();
  const live = matches.filter((m) => isLiveStatus(m.status));
  const followed = matches.filter(
    (m) =>
      followedMatchIds.includes(m.id) ||
      followedTeamIds.includes(m.home.id) ||
      followedTeamIds.includes(m.away.id),
  );
  const rest = matches.filter((m) => !live.includes(m));
  const groups = groupByLeague(rest);

  return (
    <Screen
      noPadding
      header={
        <View>
          <View style={styles.masthead}>
            <Wordmark size={20} />
            <View style={styles.mastheadRight}>
              {source ? (
                <Text style={[styles.source, { fontFamily: theme.typography.caption.fontFamily, color: theme.colors.textMuted }]}>
                  {stale ? 'cached' : source}
                </Text>
              ) : null}
              <Pressable onPress={onOpenSearch} accessibilityRole="button" accessibilityLabel="Search">
                <SymbolView
                  name={{ ios: 'magnifyingglass', android: 'search', web: 'search' }}
                  tintColor={theme.colors.text}
                  size={22}
                />
              </Pressable>
            </View>
          </View>
          <DateRail days={days} activeIso={activeIso} onSelect={onSelectDay} />
        </View>
      }
    >
      {loading && matches.length === 0 ? (
        <View style={styles.section}>
          <ScoreCardSkeleton />
          <ScoreCardSkeleton />
          <ScoreCardSkeleton />
        </View>
      ) : null}

      {live.length > 0 ? (
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { fontFamily: theme.typography.title.fontFamily, color: theme.colors.text }]}>
            Live
          </Text>
          {live.map((m) => (
            <LiveTracker
              key={`track-${m.id}`}
              match={m}
              delayed={spoiler}
              onPress={onOpenMatch}
            />
          ))}
        </View>
      ) : null}

      {followed.length > 0 ? (
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { fontFamily: theme.typography.title.fontFamily, color: theme.colors.text }]}>
            Following
          </Text>
          {followed.map((m) => (
            <ScoreBlock
              key={`fav-${m.id}`}
              match={m}
              followed
              spoiler={spoiler}
              onOpenMatch={onOpenMatch}
              onToggleFollow={onToggleFollow}
            />
          ))}
        </View>
      ) : null}

      {groups.map((group) => (
        <View key={group.id} style={styles.section}>
          <Text style={[styles.sectionLabel, { fontFamily: theme.typography.title.fontFamily, color: theme.colors.text }]}>
            {group.name}
          </Text>
          {group.matches.map((m) => (
            <ScoreBlock
              key={m.id}
              match={m}
              followed={followedMatchIds.includes(m.id) || followedTeamIds.includes(m.home.id) || followedTeamIds.includes(m.away.id)}
              spoiler={spoiler}
              onOpenMatch={onOpenMatch}
              onToggleFollow={onToggleFollow}
            />
          ))}
        </View>
      ))}

      {!loading && matches.length === 0 ? (
        <View style={styles.empty}>
          <Text style={[styles.emptyTitle, { fontFamily: theme.typography.title.fontFamily, color: theme.colors.text }]}>
            No fixtures
          </Text>
          <Text style={[styles.emptyBody, { fontFamily: theme.typography.body.fontFamily, color: theme.colors.textMuted }]}>
            Nothing on the board for this date. Step a day either side.
          </Text>
        </View>
      ) : null}
    </Screen>
  );
}

function ScoreBlock({
  match,
  followed,
  spoiler,
  onOpenMatch,
  onToggleFollow,
}: {
  match: Match;
  followed?: boolean;
  spoiler?: boolean;
  onOpenMatch?: (match: Match) => void;
  onToggleFollow?: (match: Match) => void;
}) {
  const card = (
    <ScoreCard match={match} followed={followed} onPress={onOpenMatch} onToggleFollow={onToggleFollow} />
  );
  if (spoiler && (match.status === 'live' || match.status === 'ht' || match.status === 'ft')) {
    return <SpoilerCover>{card}</SpoilerCover>;
  }
  return card;
}

const styles = StyleSheet.create({
  masthead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  mastheadRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  source: {
    fontSize: 10,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 10,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  empty: {
    padding: 48,
    alignItems: 'center',
    gap: 8,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  emptyBody: {
    fontSize: 15,
    textAlign: 'center',
  },
});
