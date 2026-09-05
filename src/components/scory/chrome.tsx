import type { ReactNode } from "react";
import { Lockup } from "@/components/brand/lockup";
import { StatusBar } from "@/components/matches/status-bar";
import { DEFAULT_MATCHES_QUERY, type MatchesQuery } from "@/lib/matches-query";

export function AppHeader({ query = DEFAULT_MATCHES_QUERY }: { query?: MatchesQuery }) {
  return (
    <header className="masthead masthead--app">
      <StatusBar />
      <Lockup query={query} />
    </header>
  );
}

export function PageFrame({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[var(--bg)] text-[var(--ink)]">
      <div className="mx-auto w-full max-w-[720px]">{children}</div>
    </div>
  );
}

export function LoadingScreen({ title = "Loading" }: { title?: string }) {
  return (
    <PageFrame>
      <AppHeader />
      <div className="px-4 pt-4">
        <h1 className="sr-only">{title}</h1>
        <div className="flex flex-col gap-2">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="scory-skeleton" aria-hidden="true">
              <span className="scory-skeleton__disc" />
              <span className="scory-skeleton__bars">
                <span className="scory-skeleton__bar block" />
                <span className="scory-skeleton__bar scory-skeleton__bar--sm block" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </PageFrame>
  );
}
