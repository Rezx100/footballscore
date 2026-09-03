"use client";

import { PREFS_COOKIE, serializePrefs } from "@/lib/prefs";
import type { Prefs } from "@/lib/types";
import { MARKS, type MarkId } from "@/lib/brand";
import { matchesHref } from "@/lib/matches-query";
import Link from "next/link";
import { useState } from "react";
import { SiteLockup } from "@/components/shell/page-shell";

const ZONES = [
  "UTC",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "America/New_York",
  "America/Chicago",
  "America/Los_Angeles",
  "America/Sao_Paulo",
  "Asia/Dubai",
  "Asia/Tokyo",
  "Australia/Sydney",
];

export function MoreView({ prefs, mark }: { prefs: Prefs; mark: MarkId }) {
  const [state, setState] = useState(prefs);

  function save(next: Prefs) {
    setState(next);
    document.cookie = `${PREFS_COOKIE}=${encodeURIComponent(serializePrefs(next))}; path=/; max-age=31536000; samesite=lax`;
  }

  return (
    <>
      <header className="masthead px-4 pt-4 pb-4">
        <SiteLockup />
        <h1 className="font-cond mt-5 text-[20px]">More</h1>
      </header>
      <form className="space-y-5 px-4 pb-10" onSubmit={(event) => event.preventDefault()}>
        <label className="block">
          <span className="font-board text-[10px] tracking-[0.08em] text-[var(--muted)]">Timezone</span>
          <select
            className="mt-1 h-10 w-full rounded-[10px] border border-[var(--line)] bg-[var(--elev)] px-3 font-cond text-[14px]"
            value={state.tzOverride ? state.tz : "auto"}
            onChange={(event) => {
              if (event.target.value === "auto") save({ ...state, tzOverride: false });
              else save({ ...state, tz: event.target.value, tzOverride: true });
            }}
          >
            <option value="auto">Auto ({prefs.tz})</option>
            {ZONES.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center justify-between">
          <span className="font-cond text-[15px]">24-hour clock</span>
          <input
            type="checkbox"
            checked={!state.hour12}
            onChange={(event) => save({ ...state, hour12: !event.target.checked })}
          />
        </label>
        <label className="flex items-center justify-between">
          <span className="font-cond text-[15px]">Hide finished by default</span>
          <input
            type="checkbox"
            checked={state.hideFinished}
            onChange={(event) => save({ ...state, hideFinished: event.target.checked })}
          />
        </label>
        <label className="block">
          <span className="font-board text-[10px] tracking-[0.08em] text-[var(--muted)]">Start tab</span>
          <select
            className="mt-1 h-10 w-full rounded-[10px] border border-[var(--line)] bg-[var(--elev)] px-3 font-cond text-[14px]"
            value={state.startTab}
            onChange={(event) => save({ ...state, startTab: event.target.value as Prefs["startTab"] })}
          >
            <option value="matches">Scores</option>
            <option value="news">News</option>
            <option value="leagues">Leagues</option>
            <option value="following">Following</option>
          </select>
        </label>
        <div>
          <p className="font-board text-[10px] tracking-[0.08em] text-[var(--muted)]">Mark (not locked)</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {MARKS.map((item) => (
              <Link
                key={item.id}
                href={matchesHref({
                  day: "today",
                  hide: false,
                  q: "",
                  tab: "matches",
                  match: null,
                  search: false,
                  mark: item.id,
                })}
                className={`font-board rounded-full px-3 py-1.5 text-[11px] ${
                  mark === item.id ? "bg-[var(--elev)] text-[var(--ink)]" : "text-[var(--muted)]"
                }`}
              >
                {item.n}. {item.name}
              </Link>
            ))}
          </div>
        </div>
        <section className="pt-4">
          <h2 className="font-cond text-[16px]">About</h2>
          <p className="mt-2 text-[14px] leading-[22px] text-[var(--muted)]">
            footballscore is association football only. Scores from ESPN. If a module is missing, the feed did not send it — we do not invent ratings, xG, or betting.
          </p>
        </section>
      </form>
    </>
  );
}
