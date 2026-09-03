"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TAB_ICONS } from "@/components/matches/tab-icons";

const tabs = [
  { href: "/matches", label: "matches", match: (path: string) => path === "/" || path.startsWith("/matches") || path.startsWith("/match/") },
  { href: "/news", label: "news", match: (path: string) => path.startsWith("/news") },
  { href: "/leagues", label: "leagues", match: (path: string) => path.startsWith("/leagues") || path.startsWith("/league/") || path.startsWith("/team/") },
  { href: "/following", label: "following", match: (path: string) => path.startsWith("/following") },
  { href: "/more", label: "more", match: (path: string) => path.startsWith("/more") },
] as const;

export function TabBar() {
  const pathname = usePathname();
  return (
    <nav className="tab-bar" aria-label="Primary">
      <div className="tab-bar__inner">
        {tabs.map((tab) => {
          const isActive = tab.match(pathname);
          const Icon = TAB_ICONS[tab.label];
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-label={tab.label}
              aria-current={isActive ? "page" : undefined}
              className="tab-bar__item font-board text-[10px] tracking-[0.04em]"
            >
              <span className="tab-bar__icon">
                <Icon />
              </span>
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
