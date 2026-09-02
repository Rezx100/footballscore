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
        <div className="px-5 pt-5 pb-1">
          <Lockup query={query} />
        </div>
        {query.search ? (
          <form action="/matches" method="get" className="px-5 pt-6 pb-4">
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
              className="h-9 w-full border-b border-[var(--copper)] bg-transparent font-cond text-[16px] text-[var(--ink)] outline-none placeholder:text-[var(--muted)]"
            />
          </form>
        ) : (
          <DayHead query={query} liveCount={liveCount} />
        )}
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {query.tab !== "matches" ? (
          <div className="flex h-full flex-col justify-center px-5">
            <p className="font-cond text-[20px] leading-none">{query.tab}</p>
            <p className="mt-3 text-[14px] text-[var(--muted)]">This tab is next. Scores is live.</p>
            <Link
              href={matchesHref({ ...query, tab: "matches" })}
              className="mt-5 font-board text-[12px] text-[var(--ink)]"
            >
              Back to matches
            </Link>
          </div>
        ) : error ? (
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
                : `${dayLabel(query.day)} has no football fixtures in the feed.`}
            </p>
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
          <div className="flex flex-col pb-8">
            {open.map((group) => (
              <LeagueGroupCard key={group.id} group={group} query={query} />
            ))}
            {open.length > 0 && hasFinished && !query.hide ? (
              <div className="px-5 py-5">
                <Link href={matchesHref({ ...query, hide: true })} className="font-board text-[11px] text-[var(--muted)]">
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
                <Link href={matchesHref({ ...query, hide: false })} className="font-board text-[11px] text-[var(--live)]">
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
