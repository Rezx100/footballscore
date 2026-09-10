import Link from "next/link";
import { Lockup } from "@/components/brand/lockup";
import { DayHead } from "@/components/matches/day-head";
import { LeagueGroupCard } from "@/components/matches/league-group";
import { LiveRail } from "@/components/matches/live-rail";
import { StatusBar } from "@/components/matches/status-bar";
import { EmptyState } from "@/components/ui/blocks";
import { dayLabel } from "@/lib/dates";
import { DEFAULT_MARK } from "@/lib/brand";
import type { FollowState } from "@/lib/follow";
import { collectLiveMatches, filterGroupsByQuery, groupIsFinished, liveMatchCount, sortGroups } from "@/lib/matches";
import { matchesHref, type MatchesQuery } from "@/lib/matches-query";
import type { LeagueGroup } from "@/lib/types";

export function MatchesScreen({
  query,
  groups,
  error,
  follow,
  timeZone,
  lastNight,
  nextUp,
}: {
  query: MatchesQuery;
  groups: LeagueGroup[];
  error?: string | null;
  follow: FollowState;
  timeZone: string;
  lastNight?: LeagueGroup[];
  nextUp?: LeagueGroup[];
}) {
  const searched = filterGroupsByQuery(groups, query.q);
  const ordered = sortGroups(searched, follow);
  const open = ordered.filter((group) => !groupIsFinished(group));
  const finished = ordered.filter(groupIsFinished);
  const listed = query.hide ? open : [...open, ...finished];
  const hasFinished = finished.length > 0;
  const liveCount = liveMatchCount(searched);
  const live = collectLiveMatches(searched, follow);
  const emptyBody = query.q.trim()
    ? `Nothing matched “${query.q.trim()}”.`
    : lastNight?.length
      ? `Last night: ${lastNight[0]?.name ?? "football"}.`
      : nextUp?.length
        ? `Next: ${nextUp[0]?.name ?? "fixtures coming"}.`
        : `${dayLabel(query.day)} has no football fixtures in the feed.`;

  return (
    <div className="bg-[var(--bg)] text-[var(--ink)]">
      <header className="masthead masthead--app">
        <StatusBar />
        <Lockup query={query} />
      </header>
      {query.search ? (
        <form action="/matches" method="get" className="px-4 pt-3 pb-2">
          {query.day !== "today" ? <input type="hidden" name="day" value={query.day} /> : null}
          {query.iso ? <input type="hidden" name="iso" value={query.iso} /> : null}
          {query.mark !== DEFAULT_MARK ? <input type="hidden" name="mark" value={query.mark} /> : null}
          <input type="hidden" name="search" value="1" />
          <label className="sr-only" htmlFor="match-search">
            Find teams or leagues
          </label>
          <input
            id="match-search"
            name="q"
            defaultValue={query.q.trim()}
            placeholder="Club or league"
            className="h-10 w-full rounded-[10px] border border-[color-mix(in_srgb,var(--ink)_12%,transparent)] bg-[color-mix(in_srgb,var(--elev)_55%,transparent)] px-3 text-[15px] text-[var(--ink)] outline-none placeholder:text-[var(--muted)]"
          />
        </form>
      ) : (
        <DayHead query={query} liveCount={liveCount} timeZone={timeZone} />
      )}
      <LiveRail matches={live} />

      <div className="flex-1">
        {error ? (
          <EmptyState title="Scores unavailable" body={error} actionHref="/matches" actionLabel="Retry today" />
        ) : listed.length === 0 && !(query.hide && hasFinished) ? (
          <div>
            <EmptyState
              title="No matches this day."
              body={emptyBody}
              actionHref={
                query.day === "today" && !query.q.trim() && !query.iso
                  ? matchesHref({ ...query, day: "yesterday" })
                  : "/matches"
              }
              actionLabel={query.day === "today" && !query.q.trim() && !query.iso ? "See yesterday" : "Jump to today"}
            />
            {lastNight?.length ? (
              <div className="space-y-3 px-4 pb-4">
                {lastNight.slice(0, 2).map((group) => (
                  <LeagueGroupCard key={group.id} group={{ ...group, matches: group.matches.slice(0, 2) }} query={query} />
                ))}
              </div>
            ) : null}
            {nextUp?.length && !lastNight?.length ? (
              <div className="space-y-3 px-4 pb-4">
                {nextUp.slice(0, 2).map((group) => (
                  <LeagueGroupCard key={group.id} group={{ ...group, matches: group.matches.slice(0, 2) }} query={query} />
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="flex flex-col gap-2 px-4 py-3">
            {open.map((group) => (
              <LeagueGroupCard key={group.id} group={group} query={query} />
            ))}
            {open.length > 0 && hasFinished && !query.hide ? (
              <div className="px-5 py-1">
                <Link href={matchesHref({ ...query, hide: true })} className="text-[11px] tracking-[0.04em] text-[var(--muted)]">
                  Hide finished
                </Link>
              </div>
            ) : null}
            {query.hide
              ? null
              : finished.map((group) => (
                  <LeagueGroupCard key={group.id} group={group} query={query} />
                ))}
            {query.hide && hasFinished ? (
              <div className="px-5 py-1">
                <Link
                  href={(() => {
                    const base = matchesHref({ ...query, hide: false });
                    return base.includes("?") ? `${base}&hide=0` : `${base}?hide=0`;
                  })()}
                  className="text-[11px] tracking-[0.04em] text-[var(--scory-text-brand)]"
                >
                  Show finished matches
                </Link>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
