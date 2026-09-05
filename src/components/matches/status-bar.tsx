export function StatusBar() {
  return (
    <div className="status-bar">
      <p className="text-[12px] font-medium leading-[16px] tracking-[0.1px] text-[var(--scory-text-primary,#ffffff)]">
        9:41
      </p>
      <p className="whitespace-pre text-[11px] font-normal leading-[14px] tracking-[0.1px] text-[var(--scory-text-primary,#ffffff)]">
        ●●●  100%
      </p>
    </div>
  );
}
