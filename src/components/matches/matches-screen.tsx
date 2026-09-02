import Link from "next/link";
import { DateStrip } from "@/components/matches/date-strip";
import { CalendarIcon, ClockIcon, CloseIcon, SearchIcon } from "@/components/matches/icons";
import { LeagueGroupCard } from "@/components/matches/league-group";
import { TabBar } from "@/components/matches/tab-bar";
import { dayLabel, getDateStrip } from "@/lib/dates";
import { groupIsFinished } from "@/lib/matches";
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
  const selectedDay = getDateStrip().find((item) => item.key === query.day);

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col bg-[var(--bg)] text-[var(--ink)]">
      <header className="bg-[var(--surface)]">
        <div className="flex items-center justify-between px-4 pt-3 pb-1">
          <p className="text-[22px] font-bold tracking-tight">footballscore</p>
          <div className="flex items-center gap-1">
            <Link
              href={matchesHref({ ...query, day: "yesterday", tab: "matches" })}
              className="rounded-full p-2 text-[var(--ink)]"
              aria-label="Recent matches"
            >
              <ClockIcon className="h-5 w-5" />
            </Link>
            <Link
              href={
                query.search
                  ? matchesHref({ ...query, q: "", search: false, tab: "matches" })
                  : matchesHref({ ...query, search: true, tab: "matches" })
              }
              className="rounded-full p-2 text-[var(--ink)]"
              aria-label={query.search ? "Close search" : "Search matches"}
            >
              {query.search ? <CloseIcon className="h-5 w-5" /> : <SearchIcon className="h-5 w-5" />}
            </Link>
            <Link
              href={matchesHref({
                ...query,
                day: query.day === "today" ? "tomorrow" : "today",
                hide: false,
                tab: "matches",
              })}
              className="relative rounded-full p-2 text-[var(--ink)]"
              aria-label="Pick a date"
            >
              <CalendarIcon className="h-5 w-5" />
              {query.day !== "today" ? (
                <span className="absolute top-1 right-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-[var(--ink)] px-0.5 text-[8px] font-bold text-white">
                  {selectedDay?.dayOfMonth ?? "1"}
                </span>
              ) : null}
            </Link>
          </div>
        </div>
        {query.search ? (
          <form action="/matches" method="get" className="px-4 pb-3">
            {query.day !== "today" ? <input type="hidden" name="day" value={query.day} /> : null}
            <input type="hidden" name="search" value="1" />
            <label className="sr-only" htmlFor="match-search">
              Search teams or leagues
            </label>
            <input
              id="match-search"
              name="q"
              defaultValue={query.q.trim()}
              placeholder="Search teams or leagues"
              className="h-10 w-full rounded-[10px] bg-[var(--bg)] px-3 text-[15px] outline-none ring-1 ring-[var(--line)] placeholder:text-[var(--muted)] focus:ring-[var(--accent)]"
            />
          </form>
        ) : (
          <DateStrip query={query} />
        )}
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {query.tab !== "matches" ? (
          <div className="flex h-full flex-col items-center justify-center px-8 text-center">
            <p className="text-[17px] font-semibold">
              {query.tab[0].toUpperCase() + query.tab.slice(1)}
            </p>
            <p className="mt-2 text-[14px] text-[var(--muted)]">
              This tab is next. Scores is live.
            </p>
            <Link
              href={matchesHref({ ...query, tab: "matches" })}
              className="mt-4 text-[14px] font-semibold text-[var(--accent)]"
            >
              Back to Matches
            </Link>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center px-8 pt-16 text-center">
            <p className="text-[17px] font-semibold">Scores unavailable</p>
            <p className="mt-2 text-[14px] text-[var(--muted)]">{error}</p>
            <Link href="/matches" className="mt-4 text-[15px] font-semibold text-[var(--accent)]">
              Retry Today
            </Link>
          </div>
        ) : listed.length === 0 && !(query.hide && hasFinished) ? (
          <div className="flex flex-col items-center px-8 pt-16 text-center">
            <p className="text-[17px] font-semibold">No matches this day.</p>
            <p className="mt-2 text-[14px] text-[var(--muted)]">
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
              className="mt-4 text-[15px] font-semibold text-[var(--accent)]"
            >
              {query.day === "today" && !query.q.trim() ? "See Yesterday" : "Jump to Today"}
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3 px-3 py-3">
            {open.map((group) => (
              <LeagueGroupCard key={group.id} group={group} query={query} />
            ))}
            {hasFinished && !query.hide ? (
              <div className="flex justify-center py-2">
                <Link
                  href={matchesHref({ ...query, hide: true })}
                  className="flex items-center gap-1 text-[13px] font-semibold text-[var(--muted)]"
                >
                  Hide all
                  <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
                    <path
                      d="M2 8.5 6 3.5 10 8.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </Link>
              </div>
            ) : null}
            {query.hide
              ? null
              : finished.map((group) => (
                  <LeagueGroupCard key={group.id} group={group} query={query} />
                ))}
            {query.hide && hasFinished ? (
              <div className="flex justify-center pb-2">
                <Link
                  href={matchesHref({ ...query, hide: false })}
                  className="text-[13px] font-semibold text-[var(--accent)]"
                >
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
