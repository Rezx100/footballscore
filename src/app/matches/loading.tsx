import { AppShell } from "@/components/app-shell";

export default function MatchesLoading() {
  return (
    <AppShell>
      <div className="flex h-full min-h-0 flex-1 flex-col bg-[var(--bg)]">
        <div className="px-4 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-[18px] w-[18px] rounded-sm bg-[var(--surface)]" />
              <div className="h-4 w-32 rounded-sm bg-[var(--surface)]" />
            </div>
            <div className="h-7 w-14 rounded-full bg-[var(--elev)]" />
          </div>
          <div className="mt-3 flex h-16 items-center gap-2.5 rounded-[12px] border border-[var(--line)] bg-[var(--elev)] px-2.5">
            <div className="h-12 w-11 rounded-[10px] bg-[var(--surface)]" />
            <div className="h-12 w-[3.4rem] rounded-[10px] bg-[var(--copper)]" />
            <div className="h-12 w-11 rounded-[10px] bg-[var(--surface)]" />
            <div className="ml-auto mr-1 h-3 w-12 rounded-sm bg-[var(--surface)]" />
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-5 px-4">
          {[0, 1].map((section) => (
            <div key={section}>
              <div className="mb-2.5 h-3 w-28 rounded-sm bg-[var(--surface)]" />
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[0, 1, 2].map((card) => (
                  <div
                    key={card}
                    className="h-[6.5rem] rounded-[12px] border border-[var(--line)] bg-[var(--elev)]"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
