"use client";

import { HeartGlyph } from "@/components/matches/figma-icons";
import { useFollow } from "@/components/follow/follow-provider";

export function FollowButton({
  league,
  teamId,
  label = "Follow",
  compact = false,
  variant = "text",
}: {
  league: string;
  teamId?: string;
  label?: string;
  compact?: boolean;
  variant?: "text" | "heart";
}) {
  const { follow, toggleLeague, toggleTeam } = useFollow();
  const on = teamId
    ? follow.teams.some((team) => team.league === league && team.id === teamId)
    : follow.leagues.includes(league);

  if (variant === "heart") {
    return (
      <button
        type="button"
        onClick={() => (teamId ? toggleTeam({ league, id: teamId }) : toggleLeague(league))}
        className={`scory-icon-btn ${on ? "text-[var(--scory-text-brand)]" : "text-white"}`}
        aria-pressed={on}
        aria-label={on ? "Unfollow" : "Follow"}
      >
        <HeartGlyph size={20} filled={on} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => (teamId ? toggleTeam({ league, id: teamId }) : toggleLeague(league))}
      className={`rounded-full tracking-[0.08em] ${
        compact ? "px-2 py-1 text-[9px]" : "px-3 py-1.5 text-[10px]"
      } ${
        on
          ? "bg-[var(--scory-bg-chip)] text-[var(--scory-text-primary)]"
          : "text-[var(--scory-text-brand)] ring-1 ring-[color-mix(in_srgb,var(--scory-text-brand)_40%,transparent)]"
      }`}
      aria-pressed={on}
    >
      {on ? "Following" : label}
    </button>
  );
}
