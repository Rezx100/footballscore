"use client";

import { useMemo, useState } from "react";
import { DateStrip } from "@/components/matches/date-strip";
import {
  CalendarIcon,
  ClockIcon,
  CloseIcon,
  SearchIcon,
} from "@/components/matches/icons";
import { LeagueGroupCard } from "@/components/matches/league-group";
import { TabBar } from "@/components/matches/tab-bar";
import { DAY_LABELS, groupIsFinished, matchesByDay } from "@/lib/matches";
import type { DayKey } from "@/lib/types";

type TabId = "matches" | "news" | "leagues" | "following" | "more";

export function MatchesScreen() {
  const [day, setDay] = useState<DayKey>("today");
  const [hideFinished, setHideFinished] = useState(false);
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>("ars-che");
  const [tab, setTab] = useState<TabId>("matches");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const groups = matchesByDay[day];

  const visibleGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const searched = !q
      ? groups
      : groups
          .map((group) => ({
            ...group,
            matches: group.matches.filter(
              (match) =>
                match.home.name.toLowerCase().includes(q) ||
                match.away.name.toLowerCase().includes(q) ||
                group.name.toLowerCase().includes(q),
            ),
          }))
          .filter((group) => group.matches.length > 0);

    const open = searched.filter((group) => !groupIsFinished(group));
    const finished = searched.filter(groupIsFinished);
    return { open, finished };
  }, [groups, query]);

  const listedGroups = hideFinished
    ? visibleGroups.open
    : [...visibleGroups.open, ...visibleGroups.finished];
  const hasFinished = visibleGroups.finished.length > 0;

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col bg-[var(--bg)] text-[var(--ink)]">
      <header className="bg-[var(--surface)]">
        <div className="flex items-center justify-between px-4 pt-3 pb-1">
          <p className="text-[22px] font-bold tracking-tight">
            football<span className="text-[var(--accent)]">score</span>
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="rounded-full p-2 text-[var(--ink)]"
              aria-label="Recent matches"
            >
              <ClockIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="rounded-full p-2 text-[var(--ink)]"
              aria-label={searchOpen ? "Close search" : "Search matches"}
              onClick={() => {
                setSearchOpen((open) => !open);
                if (searchOpen) setQuery("");
              }}
            >
              {searchOpen ? <CloseIcon className="h-5 w-5" /> : <SearchIcon className="h-5 w-5" />}
            </button>
            <button
              type="button"
              className="relative rounded-full p-2 text-[var(--ink)]"
              aria-label="Pick a date"
              onClick={() => setDay(day === "today" ? "tomorrow" : "today")}
            >
              <CalendarIcon className="h-5 w-5" />
              {day !== "today" ? (
                <span className="absolute top-1 right-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-[var(--ink)] px-0.5 text-[8px] font-bold text-white">
                  {day === "yesterday" ? "1" : day === "tomorrow" ? "1" : "4"}
                </span>
              ) : null}
            </button>
          </div>
        </div>
        {searchOpen ? (
          <div className="px-4 pb-3">
            <label className="sr-only" htmlFor="match-search">
              Search teams or leagues
            </label>
            <input
              id="match-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search teams or leagues"
              className="h-10 w-full rounded-[10px] bg-[var(--bg)] px-3 text-[15px] outline-none ring-1 ring-[var(--line)] placeholder:text-[var(--muted)] focus:ring-[var(--accent)]"
              autoFocus
            />
          </div>
        ) : (
          <DateStrip
            selected={day}
            onSelect={(next) => {
              setDay(next);
              setHideFinished(false);
              setSelectedMatchId(null);
            }}
          />
        )}
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {tab !== "matches" ? (
          <div className="flex h-full flex-col items-center justify-center px-8 text-center">
            <p className="text-[17px] font-semibold">{tab[0].toUpperCase() + tab.slice(1)}</p>
            <p className="mt-2 text-[14px] text-[var(--muted)]">
              This tab is next. Matches is the section implemented from the spec.
            </p>
            <button
              type="button"
              className="mt-4 text-[14px] font-semibold text-[var(--accent)]"
              onClick={() => setTab("matches")}
            >
              Back to Matches
            </button>
          </div>
        ) : listedGroups.length === 0 && !(hideFinished && hasFinished) ? (
          <div className="flex flex-col items-center px-8 pt-16 text-center">
            <p className="text-[17px] font-semibold">No matches this day.</p>
            <p className="mt-2 text-[14px] text-[var(--muted)]">
              {query
                ? `Nothing matched “${query}”.`
                : `${DAY_LABELS[day]} is empty in this demo data.`}
            </p>
            <button
              type="button"
              className="mt-4 text-[15px] font-semibold text-[var(--accent)]"
              onClick={() => {
                setDay("today");
                setQuery("");
                setSearchOpen(false);
                setHideFinished(false);
              }}
            >
              Jump to Today
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 px-3 py-3">
            {visibleGroups.open.map((group) => (
              <LeagueGroupCard
                key={group.id}
                group={group}
                selectedMatchId={selectedMatchId}
                onSelectMatch={setSelectedMatchId}
              />
            ))}
            {hasFinished && !hideFinished ? (
              <div className="flex justify-center py-1">
                <button
                  type="button"
                  onClick={() => setHideFinished(true)}
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
                </button>
              </div>
            ) : null}
            {hideFinished ? null : (
              visibleGroups.finished.map((group) => (
                <LeagueGroupCard
                  key={group.id}
                  group={group}
                  selectedMatchId={selectedMatchId}
                  onSelectMatch={setSelectedMatchId}
                />
              ))
            )}
            {hideFinished && hasFinished ? (
              <div className="flex justify-center pb-2">
                <button
                  type="button"
                  onClick={() => setHideFinished(false)}
                  className="text-[13px] font-semibold text-[var(--accent)]"
                >
                  Show finished matches
                </button>
              </div>
            ) : null}
          </div>
        )}
      </div>

      <TabBar active={tab} onChange={setTab} />
    </div>
  );
}
