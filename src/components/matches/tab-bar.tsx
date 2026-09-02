import Link from "next/link";
import { matchesHref, type MatchesQuery, type TabId } from "@/lib/matches-query";

const tabs: { id: TabId; label: string }[] = [
  { id: "matches", label: "Matches" },
  { id: "news", label: "News" },
  { id: "leagues", label: "Leagues" },
  { id: "following", label: "Following" },
  { id: "more", label: "More" },
];

export function TabBar({ query }: { query: MatchesQuery }) {
  return (
    <nav className="flex items-end justify-between border-t border-[var(--line)] px-5 pt-2.5 pb-[max(12px,env(safe-area-inset-bottom))]">
      {tabs.map((tab) => {
        const isActive = tab.id === query.tab;
        return (
          <Link
            key={tab.id}
            href={matchesHref({ ...query, tab: tab.id })}
            aria-current={isActive ? "page" : undefined}
            className={`pb-0.5 text-[12px] ${
              isActive
                ? "border-b border-[var(--ink)] text-[var(--ink)]"
                : "border-b border-transparent text-[var(--muted)]"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
