import Link from "next/link";
import { Lockup } from "@/components/brand/lockup";
import { DayHead } from "@/components/matches/day-head";
import { LeagueGroupCard } from "@/components/matches/league-group";
import { LiveRail } from "@/components/matches/live-rail";
import { TabBar } from "@/components/matches/tab-bar";
import { dayLabel } from "@/lib/dates";
import { DEFAULT_MARK } from "@/lib/brand";
import type { FollowState } from "@/lib/follow";
import { groupIsFinished, isInPlay, liveMatchCount } from "@/lib/matches";
import { matchesHref, type MatchesQuery } from "@/lib/matches-query";
import type { LeagueGroup, Match } from "@/lib/types";

function rankGroup(group: LeagueGroup, follow: FollowState): number {
  const live = group.matches.some(isInPlay);
  const followedLeague = follow.leagues.includes(group.id);
  const followedTeam = group.matches.some((match) =>
    follow.teams.some((team) => team.id === match.home.id || team.id === match.away.id),
  );
  const followed = followedLeague || followedTeam;
  const firstClass = group.priority < 1000;
  if (live && followed) return 0;
  if (live) return 1;
  if (followed) return 2;
  if (firstClass) return 3;
  return 4;
}

function sortGroups(groups: LeagueGroup[], follow: FollowState): LeagueGroup[] {
  return [...groups].sort((a, b) => rankGroup(a, follow) - rankGroup(b, follow) || a.priority - b.priority || a.name.localeCompare(b.name));
}

function liveMatches(groups: LeagueGroup[], follow: FollowState): Match[] {
  const matches = groups.flatMap((group) => group.matches.filter(isInPlay).map((match) => ({ match, group })));
  matches.sort((a, b) => {
    const af = follow.leagues.includes(a.group.id) || follow.teams.some((team) => team.id === a.match.home.id || team.id === a.match.away.id);
    const bf = follow.leagues.includes(b.group.id) || follow.teams.some((team) => team.id === b.match.home.id || team.id === b.match.away.id);
    if (af !== bf) return af ? -1 : 1;
    return 0;
  });
  return matches.map((item) => item.match);
}

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
  const search = query.q.trim().toLowerCase();
  const searched = !search
    ? groups
    : groups
        .map((group) => ({
          ...group,
          matches: group.matches.filter(
            (match) =>
              match.home.name.toLowerCase().includes(search) ||
              match.away.name.toLowerCase().includes(search) ||
              group.name.toLowerCase().includes(search),
          ),
        }))
        .filter((group) => group.matches.length > 0);

  const ordered = sortGroups(searched, follow);
  const open = ordered.filter((group) => !groupIsFinished(group));
  const finished = ordered.filter(groupIsFinished);
  const listed = query.hide ? open : [...open, ...finished];
  const hasFinished = finished.length > 0;
  const liveCount = liveMatchCount(searched);
  const live = liveMatches(searched, follow);

  return (
    <div className="flex min-h-dvh flex-1 flex-col bg-[var(--bg)] text-[var(--ink)]">
      <header className="masthead">
        {query.search ? (
          <>
            <Lockup query={query} />
            <form action="/matches" method="get" className="px-4 pt-4 pb-4">
              {query.day !== "today" ? <input type="hidden" name="day" value={query.day} /> : null}
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
                className="h-10 w-full rounded-[10px] border border-[color-mix(in_srgb,var(--ink)_12%,transparent)] bg-[color-mix(in_srgb,var(--elev)_55%,transparent)] px-3 font-cond text-[15px] text-[var(--ink)] outline-none backdrop-blur-md placeholder:text-[var(--muted)] focus:border-[color-mix(in_srgb,var(--copper)_45%,transparent)]"
              />
            </form>
          </>
        ) : (
          <>
            <Lockup query={query} />
            <DayHead query={query} liveCount={liveCount} timeZone={timeZone} />
          </>
        )}
      </header>
      <LiveRail matches={live} />

      <div className="flex-1">
        {error ? (
          <div className="px-5 pt-16">
            <p className="font-cond text-[20px] leading-none">Scores unavailable</p>
            <p className="mt-3 text-[14px] text-[var(--muted)]">{error}</p>
            <Link href="/matches" className="mt-5 inline-block font-board text-[12px] text-[var(--ink)]">
              Retry today
            </Link>
          </div>
        ) : listed.length === 0 && !(query.hide && hasFinished) ? (
          <div className="px-5 pt-16">
            <p className="font-cond text-[20px] leading-none">No matches this day.</p>
            <p className="mt-3 text-[14px] text-[var(--muted)]">
              {query.q.trim()
                ? `Nothing matched “${query.q.trim()}”.`
                : lastNight?.length
                  ? `Last night: ${lastNight[0]?.name ?? "football"}.`
                  : nextUp?.length
                    ? `Next: ${nextUp[0]?.name ?? "fixtures coming"}.`
                    : `${dayLabel(query.day)} has no football fixtures in the feed.`}
            </p>
            {lastNight?.length ? (
              <div className="mt-6 space-y-3">
                {lastNight.slice(0, 2).map((group) => (
                  <LeagueGroupCard key={group.id} group={{ ...group, matches: group.matches.slice(0, 2) }} query={query} />
                ))}
              </div>
            ) : null}
            {nextUp?.length && !lastNight?.length ? (
              <div className="mt-6 space-y-3">
                {nextUp.slice(0, 2).map((group) => (
                  <LeagueGroupCard key={group.id} group={{ ...group, matches: group.matches.slice(0, 2) }} query={query} />
                ))}
              </div>
            ) : null}
            <Link
              href={
                query.day === "today" && !query.q.trim()
                  ? matchesHref({ ...query, day: "yesterday" })
                  : "/matches"
              }
              className="mt-5 inline-block font-board text-[12px] text-[var(--ink)]"
            >
              {query.day === "today" && !query.q.trim() ? "See yesterday" : "Jump to today"}
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-5 pt-1 pb-10">
            {open.map((group) => (
              <LeagueGroupCard key={group.id} group={group} query={query} />
            ))}
            {open.length > 0 && hasFinished && !query.hide ? (
              <div className="px-5 py-1">
                <Link href={matchesHref({ ...query, hide: true })} className="font-board text-[11px] tracking-[0.04em] text-[var(--muted)]">
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
                  className="font-board text-[11px] tracking-[0.04em] text-[var(--live)]"
                >
                  Show finished matches
                </Link>
              </div>
            ) : null}
          </div>
        )}
      </div>

      <TabBar />
    </div>
  );
}
