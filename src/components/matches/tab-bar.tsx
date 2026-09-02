import Link from "next/link";
import {
  MenuIcon,
  NewsIcon,
  PitchIcon,
  StarIcon,
  TrophyIcon,
} from "@/components/matches/icons";
import { matchesHref, type MatchesQuery, type TabId } from "@/lib/matches-query";

const tabs: { id: TabId; label: string; icon: typeof PitchIcon }[] = [
  { id: "matches", label: "Matches", icon: PitchIcon },
  { id: "news", label: "News", icon: NewsIcon },
  { id: "leagues", label: "Leagues", icon: TrophyIcon },
  { id: "following", label: "Following", icon: StarIcon },
  { id: "more", label: "More", icon: MenuIcon },
];

export function TabBar({ query }: { query: MatchesQuery }) {
  return (
    <nav className="grid grid-cols-5 border-t border-[var(--line)] bg-[var(--surface)] px-1 pt-1 pb-[max(8px,env(safe-area-inset-bottom))]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = tab.id === query.tab;
        return (
          <Link
            key={tab.id}
            href={matchesHref({ ...query, tab: tab.id })}
            aria-current={isActive ? "page" : undefined}
            className={`flex flex-col items-center gap-0.5 py-1 ${
              isActive ? "text-[var(--ink)]" : "text-[var(--muted)]"
            }`}
          >
            <Icon className="h-6 w-6" />
            <span className={`text-[10px] ${isActive ? "font-semibold" : "font-medium"}`}>
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
