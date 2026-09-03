import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { BrandMark } from "@/components/brand/mark";
import { Wordmark } from "@/components/brand/wordmark";

export function SiteLockup() {
  return (
    <Link href="/matches" className="flex items-center gap-2.5 text-[var(--ink)]" aria-label="footballscore, matches">
      <BrandMark id="flap" size={18} />
      <Wordmark />
    </Link>
  );
}

export function PageShell({
  children,
  masthead,
  siloVars,
  wide,
}: {
  children: ReactNode;
  masthead?: ReactNode;
  siloVars?: Record<string, string>;
  wide?: boolean;
}) {
  return (
    <div
      className={`bg-[var(--bg)] text-[var(--ink)] ${siloVars ? "league-silo" : ""}`}
      style={siloVars as CSSProperties | undefined}
    >
      <div className={`mx-auto w-full ${wide ? "max-w-[1100px]" : "max-w-[720px]"}`}>
        {masthead}
        {children}
      </div>
    </div>
  );
}
