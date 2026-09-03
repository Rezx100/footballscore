"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/matches", label: "matches", match: (path: string) => path === "/" || path.startsWith("/matches") || path.startsWith("/match/") },
  { href: "/news", label: "news", match: (path: string) => path.startsWith("/news") },
  { href: "/leagues", label: "leagues", match: (path: string) => path.startsWith("/leagues") || path.startsWith("/league/") || path.startsWith("/team/") },
  { href: "/following", label: "following", match: (path: string) => path.startsWith("/following") },
  { href: "/more", label: "more", match: (path: string) => path.startsWith("/more") },
];

export function TabBar() {
  const pathname = usePathname();
  return (
    <nav className="sticky bottom-0 z-20 flex items-center justify-between border-t border-[var(--line)] bg-[var(--bg)] px-5 pt-3 pb-[max(14px,env(safe-area-inset-bottom))]">
      {tabs.map((tab) => {
        const isActive = tab.match(pathname);
        return (
          <Link
            key={tab.href}
            href={tab.href}
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
