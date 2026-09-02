import Link from "next/link";
import { Lockup } from "@/components/brand/lockup";
import { DayHead } from "@/components/matches/day-head";
import { LeagueGroupCard } from "@/components/matches/league-group";
import { TabBar } from "@/components/matches/tab-bar";
import { dayLabel } from "@/lib/dates";
import { DEFAULT_MARK } from "@/lib/brand";
import { groupIsFinished, liveMatchCount } from "@/lib/matches";
import { matchesHref, type MatchesQuery } from "@/lib/matches-query";
import type { LeagueGroup } from "@/lib/types";

export function MatchesScreen({
  query,
  groups,
  error,
}: {
  query: MatchesQuery;
  groups: LeagueGroup[];
  error?: string | null;
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

  const open = searched.filter((group) => !groupIsFinished(group));
  const finished = searched.filter(groupIsFinished);
  const listed = query.hide ? open : [...open, ...finished];
  const hasFinished = finished.length > 0;
  const liveCount = liveMatchCount(searched);

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col bg-[var(--bg)] text-[var(--ink)]">
      <header>
        <div className="px-5 pt-5">
          <Lockup query={query} />
        </div>
        {query.search ? (
          <form action="/matches" method="get" className="px-5 pt-5 pb-4">
            {query.day !== "today" ? <input type="hidden" name="day" value={query.day} /> : null}
            {query.mark !== DEFAULT_MARK ? <input type="hidden" name="mark" value={query.mark} /> : null}
            <input type="hidden" name="search" value="1" />
            <label className="sr-only" htmlFor="match-search">
              Search teams or leagues
            </label>
            <input
              id="match-search"
              name="q"
              defaultValue={query.q.trim()}
              placeholder="Team or league"
              className="h-9 w-full border-b border-[var(--ink)] bg-transparent text-[16px] text-[var(--ink)] outline-none placeholder:text-[var(--muted)]"
            />
          </form>
        ) : (
          <DayHead query={query} liveCount={liveCount} />
        )}
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {query.tab !== "matches" ? (
          <div className="flex h-full flex-col justify-center px-5">
            <p className="text-[26px] leading-none tracking-[-0.035em]">
              {query.tab[0].toUpperCase() + query.tab.slice(1)}
            </p>
            <p className="mt-3 text-[14px] text-[var(--muted)]">This tab is next. Scores is live.</p>
            <Link
              href={matchesHref({ ...query, tab: "matches" })}
              className="mt-5 text-[14px] text-[var(--ink)]"
            >
              Back to Matches
            </Link>
          </div>
        ) : error ? (
          <div className="px-5 pt-16">
            <p className="text-[26px] leading-none tracking-[-0.035em]">Scores unavailable</p>
            <p className="mt-3 text-[14px] text-[var(--muted)]">{error}</p>
            <Link href="/matches" className="mt-5 inline-block text-[14px] text-[var(--ink)]">
              Retry Today
            </Link>
          </div>
        ) : listed.length === 0 && !(query.hide && hasFinished) ? (
          <div className="px-5 pt-16">
            <p className="text-[26px] leading-none tracking-[-0.035em]">No matches this day.</p>
            <p className="mt-3 text-[14px] text-[var(--muted)]">
              {query.q.trim()
                ? `Nothing matched “${query.q.trim()}”.`
                : `${dayLabel(query.day)} has no football fixtures in the feed.`}
            </p>
            <Link
              href={
                query.day === "today" && !query.q.trim()
                  ? matchesHref({ ...query, day: "yesterday" })
                  : "/matches"
              }
              className="mt-5 inline-block text-[14px] text-[var(--ink)]"
            >
              {query.day === "today" && !query.q.trim() ? "See Yesterday" : "Jump to Today"}
            </Link>
          </div>
        ) : (
          <div className="flex flex-col pb-8">
            {open.map((group) => (
              <LeagueGroupCard key={group.id} group={group} query={query} />
            ))}
            {open.length > 0 && hasFinished && !query.hide ? (
              <div className="px-5 py-5">
                <Link href={matchesHref({ ...query, hide: true })} className="text-[12px] text-[var(--muted)]">
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
              <div className="px-5 py-5">
                <Link href={matchesHref({ ...query, hide: false })} className="text-[12px] text-[var(--live)]">
                  Show finished matches
                </Link>
              </div>
            ) : null}
          </div>
        )}
      </div>

      <TabBar query={query} />
    </div>
  );
}
