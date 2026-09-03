"use client";

import { useFollow } from "@/components/follow/follow-provider";

export function FollowButton({
  league,
  teamId,
  label = "Follow",
  compact = false,
}: {
  league: string;
  teamId?: string;
  label?: string;
  compact?: boolean;
}) {
  const { follow, toggleLeague, toggleTeam } = useFollow();
  const on = teamId
    ? follow.teams.some((team) => team.league === league && team.id === teamId)
    : follow.leagues.includes(league);

  return (
    <button
      type="button"
      onClick={() => (teamId ? toggleTeam({ league, id: teamId }) : toggleLeague(league))}
      className={`font-board rounded-full tracking-[0.08em] ${
        compact ? "px-2 py-1 text-[9px]" : "px-3 py-1.5 text-[10px]"
      } ${
        on
          ? "bg-[var(--elev)] text-[var(--ink)]"
          : "text-[var(--live)] ring-1 ring-[color-mix(in_srgb,var(--live)_40%,transparent)]"
      }`}
      aria-pressed={on}
    >
      {on ? "Following" : label}
    </button>
  );
}
