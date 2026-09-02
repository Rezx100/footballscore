export function Wordmark({
  className,
}: {
  className?: string;
}) {
  return (
    <span
      className={`relative inline-block pb-[5px] font-[family-name:var(--font-plex)] text-[16px] font-medium lowercase leading-none tracking-[-0.01em] ${className ?? ""}`}
    >
      footballscore
      <span
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-[4px] h-px bg-[var(--copper)]"
      />
    </span>
  );
}
