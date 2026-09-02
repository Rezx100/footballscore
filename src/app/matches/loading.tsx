import { AppShell } from "@/components/app-shell";

export default function MatchesLoading() {
  return (
    <AppShell>
      <div className="flex h-full min-h-0 flex-1 flex-col bg-[var(--bg)]">
        <div className="px-5 pt-5">
          <div className="h-5 w-44 bg-[var(--surface)]" />
          <div className="mt-8 h-7 w-40 bg-[var(--surface)]" />
          <div className="mt-2 h-3 w-24 bg-[var(--surface)]" />
        </div>
        <div className="mt-8 flex flex-col">
          {[0, 1, 2].map((key) => (
            <div key={key} className="px-5 pt-7">
              <div className="h-3 w-28 bg-[var(--surface)]" />
              <div className="mt-3 h-14 border-t border-[var(--line)]" />
              <div className="h-14 border-t border-[var(--line)]" />
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
