export function Wordmark({
  className,
}: {
  className?: string;
}) {
  return (
    <span
      className={`block font-[family-name:var(--font-wordmark)] text-[18px] font-extrabold lowercase leading-none tracking-[-0.054em] ${className ?? ""}`}
    >
      footballscore
    </span>
  );
}
