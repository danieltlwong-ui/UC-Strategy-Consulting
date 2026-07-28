export function StampRing({
  value,
  label,
  size = "md",
}: {
  value: string;
  label: string;
  size?: "sm" | "md" | "lg";
}) {
  const dims = {
    sm: "w-16 h-16 text-base",
    md: "w-24 h-24 text-2xl",
    lg: "w-32 h-32 text-3xl",
  }[size];

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div
        className={`${dims} rounded-full border border-brass flex items-center justify-center font-serif italic font-semibold text-ink relative`}
      >
        <span
          aria-hidden
          className="absolute inset-[3px] rounded-full border border-rule"
        />
        {value}
      </div>
      <span className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-ink-faint max-w-[12ch]">
        {label}
      </span>
    </div>
  );
}
