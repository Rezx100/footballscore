import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Wordmark } from "@/components/brand/wordmark";

export function SiteLockup() {
  return (
    <Link href="/" className="flex items-center gap-2 text-[var(--ink)]" aria-label="Scory home">
      <span className="text-[16px] font-medium leading-6 text-[var(--scory-text-brand)]">[:]</span>
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
