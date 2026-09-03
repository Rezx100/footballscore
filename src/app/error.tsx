"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="px-5 pt-16 pb-10">
      <p className="font-cond text-[20px] leading-none">Couldn’t load this page.</p>
      <p className="mt-3 text-[14px] text-[var(--muted)]">Try again. If it keeps failing, open Matches.</p>
      <div className="mt-5 flex gap-4">
        <button type="button" onClick={reset} className="font-board text-[12px] tracking-[0.04em] text-[var(--live)]">
          Retry
        </button>
        <a href="/matches" className="font-board text-[12px] tracking-[0.04em] text-[var(--ink)]">
          Matches
        </a>
      </div>
    </div>
  );
}
