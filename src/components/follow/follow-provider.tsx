"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import {
  EMPTY_FOLLOW,
  FOLLOW_COOKIE,
  FOLLOW_STORAGE_KEY,
  normalizeFollow,
  serializeFollow,
  type FollowState,
  type FollowedTeam,
} from "@/lib/follow";

const FollowContext = createContext<{
  follow: FollowState;
  toggleLeague: (slug: string) => void;
  toggleTeam: (team: FollowedTeam) => void;
}>({
  follow: EMPTY_FOLLOW,
  toggleLeague: () => undefined,
  toggleTeam: () => undefined,
});

function persist(state: FollowState) {
  const encoded = serializeFollow(state);
  document.cookie = `${FOLLOW_COOKIE}=${encoded}; path=/; max-age=31536000; samesite=lax`;
  try {
    localStorage.setItem(FOLLOW_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore quota */
  }
}

export function FollowProvider({
  initial,
  children,
}: {
  initial: FollowState;
  children: ReactNode;
}) {
  const [follow, setFollow] = useState<FollowState>(initial);

  const toggleLeague = useCallback((slug: string) => {
    setFollow((current) => {
      const leagues = current.leagues.includes(slug)
        ? current.leagues.filter((item) => item !== slug)
        : [...current.leagues, slug];
      const next = normalizeFollow({ ...current, leagues });
      persist(next);
      return next;
    });
  }, []);

  const toggleTeam = useCallback((team: FollowedTeam) => {
    setFollow((current) => {
      const exists = current.teams.some((item) => item.league === team.league && item.id === team.id);
      const teams = exists
        ? current.teams.filter((item) => !(item.league === team.league && item.id === team.id))
        : [...current.teams, team];
      const next = normalizeFollow({ ...current, teams });
      persist(next);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ follow, toggleLeague, toggleTeam }), [follow, toggleLeague, toggleTeam]);
  return <FollowContext.Provider value={value}>{children}</FollowContext.Provider>;
}

export function useFollow() {
  return useContext(FollowContext);
}
