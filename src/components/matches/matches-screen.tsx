import Link from "next/link";
import { BrandMark } from "@/components/brand/mark";
import { MarkPicker } from "@/components/brand/mark-picker";
import { DateStrip } from "@/components/matches/date-strip";
import { CalendarIcon, ClockIcon, CloseIcon, SearchIcon } from "@/components/matches/icons";
import { LeagueGroupCard } from "@/components/matches/league-group";
import { TabBar } from "@/components/matches/tab-bar";
import { dayLabel, getDateStrip } from "@/lib/dates";
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
  const selectedDay = getDateStrip().find((item) => item.key === query.day);
  const liveCount = liveMatchCount(searched);

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col bg-[var(--bg)] text-[var(--ink)]">
      <header className="border-b border-[var(--line)]">
        <div className="flex items-start justify-between px-4 pt-4">
          <div className="flex min-w-0 items-center gap-2.5 pt-1">
            <BrandMark id={query.mark} size={28} />
            <p className="truncate text-[18px] font-semibold tracking-[-0.03em]">footballscore</p>
          </div>
          <div className="flex items-center">
            <Link
              href={matchesHref({ ...query, day: "yesterday", tab: "matches" })}
              className="p-2.5 text-[var(--ink)]"
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
              className="p-2.5 text-[var(--ink)]"
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
              className="relative p-2.5 text-[var(--ink)]"
              aria-label="Pick a date"
            >
              <CalendarIcon className="h-5 w-5" />
              {query.day !== "today" ? (
                <span className="absolute top-1.5 right-1.5 text-[9px] font-semibold tabular-nums">
                  {selectedDay?.dayOfMonth ?? "1"}
                </span>
              ) : null}
            </Link>
          </div>
        </div>
        <div className="px-4 pt-3">
          <MarkPicker query={query} />
        </div>
        {query.search ? (
          <form action="/matches" method="get" className="px-4 pt-3 pb-3">
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
              placeholder="Search teams or leagues"
              className="h-10 w-full bg-[var(--surface)] px-3 text-[15px] text-[var(--ink)] outline-none ring-1 ring-[var(--line)] placeholder:text-[var(--muted)] focus:ring-[var(--copper)]"
            />
          </form>
        ) : (
          <DateStrip query={query} liveCount={liveCount} />
        )}
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {query.tab !== "matches" ? (
          <div className="flex h-full flex-col items-center justify-center px-8 text-center">
            <p className="text-[17px] font-semibold">
              {query.tab[0].toUpperCase() + query.tab.slice(1)}
            </p>
            <p className="mt-2 text-[14px] text-[var(--muted)]">This tab is next. Scores is live.</p>
            <Link
              href={matchesHref({ ...query, tab: "matches" })}
              className="mt-4 text-[14px] font-semibold text-[var(--live)]"
            >
              Back to Matches
            </Link>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center px-8 pt-16 text-center">
            <p className="text-[17px] font-semibold">Scores unavailable</p>
            <p className="mt-2 text-[14px] text-[var(--muted)]">{error}</p>
            <Link href="/matches" className="mt-4 text-[15px] font-semibold text-[var(--live)]">
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
              className="mt-4 text-[15px] font-semibold text-[var(--live)]"
            >
              {query.day === "today" && !query.q.trim() ? "See Yesterday" : "Jump to Today"}
            </Link>
          </div>
        ) : (
          <div className="flex flex-col pb-4">
            {open.map((group) => (
              <LeagueGroupCard key={group.id} group={group} query={query} />
            ))}
            {hasFinished && !query.hide ? (
              <div className="flex justify-center py-4">
                <Link
                  href={matchesHref({ ...query, hide: true })}
                  className="text-[13px] font-medium text-[var(--muted)]"
                >
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
              <div className="flex justify-center py-4">
                <Link
                  href={matchesHref({ ...query, hide: false })}
                  className="text-[13px] font-medium text-[var(--live)]"
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
