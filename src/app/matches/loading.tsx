import { AppShell } from "@/components/app-shell";

export default function MatchesLoading() {
  return (
    <AppShell>
      <div className="flex h-full min-h-0 flex-1 flex-col bg-[var(--bg)]">
        <div className="px-5 pt-5">
          <div className="flex items-center gap-2.5">
            <div className="h-5 w-5 rounded-sm bg-[var(--surface)]" />
            <div className="h-4 w-36 rounded-sm bg-[var(--surface)]" />
          </div>
          <div className="mt-8 flex items-end gap-1.5">
            <div className="h-9 w-10 bg-[var(--surface)]" />
            <div className="h-14 w-16 bg-[var(--copper)]" />
            <div className="h-9 w-10 bg-[var(--surface)]" />
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-5 px-4">
          {[0, 1].map((section) => (
            <div key={section}>
              <div className="mb-2.5 h-3 w-28 rounded-sm bg-[var(--surface)]" />
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[0, 1, 2].map((card) => (
                  <div
                    key={card}
                    className="h-[6.5rem] rounded-[12px] border border-[var(--line)] bg-[var(--elev,#221f1b)]"
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
