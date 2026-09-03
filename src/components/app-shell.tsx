import type { ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[var(--bg)] text-[var(--ink)]">
      <div className="mx-auto w-full max-w-[720px] lg:max-w-[1100px]">{children}</div>
    </div>
  );
}
