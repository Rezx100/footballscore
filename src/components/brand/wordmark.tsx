export function Wordmark({
  className,
}: {
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-baseline text-[18px] font-semibold leading-[24px] tracking-[-0.2px] text-[var(--scory-text-primary,#ffffff)] ${className ?? ""}`}
    >
      Scory
    </span>
  );
}
