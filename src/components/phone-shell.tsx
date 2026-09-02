import type { ReactNode } from "react";

export function PhoneShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#1A1A1A] p-4 sm:p-8">
      <div className="flex w-full max-w-[390px] flex-col overflow-hidden rounded-[36px] border-[10px] border-black bg-black shadow-[0_24px_80px_rgba(0,0,0,0.45)] max-sm:max-w-none max-sm:rounded-none max-sm:border-0 max-sm:shadow-none">
        <div className="hidden items-center justify-between bg-[var(--surface)] px-6 pt-2 pb-0 text-[12px] font-semibold text-[var(--ink)] sm:flex">
          <span>9:41</span>
          <span className="mx-auto h-[5px] w-[110px] rounded-full bg-black" />
          <span className="tracking-tight">●●● LTE</span>
        </div>
        <div className="flex h-[min(844px,calc(100dvh-2rem))] min-h-[640px] flex-col bg-[var(--bg)] max-sm:h-dvh max-sm:min-h-0">
          {children}
        </div>
      </div>
    </div>
  );
}
