import type { ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-[var(--bg)] text-[var(--ink)]">
      <div className="mx-auto flex min-h-dvh w-full max-w-[720px] flex-col">{children}</div>
    </div>
  );
}
