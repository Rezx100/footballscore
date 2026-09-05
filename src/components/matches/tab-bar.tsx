"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FollowingTabGlyph,
  HomeTabGlyph,
  LeaguesTabGlyph,
  MatchesTabGlyph,
  NewsTabGlyph,
} from "@/components/matches/figma-icons";

const tabs = [
  { href: "/", label: "Home", match: (path: string) => path === "/", Icon: HomeTabGlyph },
  {
    href: "/matches",
    label: "Matches",
    match: (path: string) => path === "/matches" || path.startsWith("/matches/") || path.startsWith("/match/"),
    Icon: MatchesTabGlyph,
  },
  { href: "/news", label: "News", match: (path: string) => path.startsWith("/news"), Icon: NewsTabGlyph },
  {
    href: "/leagues",
    label: "Leagues",
    match: (path: string) => path.startsWith("/leagues") || path.startsWith("/league/") || path.startsWith("/team/"),
    Icon: LeaguesTabGlyph,
  },
  {
    href: "/following",
    label: "Following",
    match: (path: string) => path.startsWith("/following"),
    Icon: FollowingTabGlyph,
  },
] as const;

export function TabBar() {
  const pathname = usePathname();
  return (
    <>
      <nav className="tab-bar" aria-label="Primary">
        <div className="tab-bar__inner">
          {tabs.map((tab) => {
            const isActive = tab.match(pathname);
            const Icon = tab.Icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-label={tab.label}
                aria-current={isActive ? "page" : undefined}
                className="tab-bar__item"
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
      <div className="home-indicator" aria-hidden="true">
        <span className="home-indicator__bar" />
      </div>
    </>
  );
}
