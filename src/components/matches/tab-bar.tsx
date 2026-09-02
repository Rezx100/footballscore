import Link from "next/link";
import { matchesHref, type MatchesQuery, type TabId } from "@/lib/matches-query";

const tabs: { id: TabId; label: string }[] = [
  { id: "matches", label: "matches" },
  { id: "news", label: "news" },
  { id: "leagues", label: "leagues" },
  { id: "following", label: "following" },
  { id: "more", label: "more" },
];

export function TabBar({ query }: { query: MatchesQuery }) {
  return (
    <nav className="flex items-center justify-between border-t border-[var(--line)] px-5 pt-3 pb-[max(14px,env(safe-area-inset-bottom))]">
      {tabs.map((tab) => {
        const isActive = tab.id === query.tab;
        return (
          <Link
            key={tab.id}
            href={matchesHref({ ...query, tab: tab.id })}
            aria-current={isActive ? "page" : undefined}
            className={`font-board text-[11px] tracking-[0.04em] ${
              isActive ? "text-[var(--ink)]" : "text-[var(--muted)]"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
