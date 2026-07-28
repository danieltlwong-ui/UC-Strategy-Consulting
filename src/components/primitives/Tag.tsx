export function Tag({
  children,
  variant = "neutral",
}: {
  children: React.ReactNode;
  variant?: "neutral" | "brass" | "steel";
}) {
  const variantCls = {
    neutral: "text-ink border-rule",
    brass: "text-brass border-brass/40",
    steel: "text-steel border-steel/40",
  }[variant];

  return (
    <span
      className={`font-mono text-[11px] tracking-[0.08em] uppercase px-2.5 py-1 border ${variantCls}`}
    >
      {children}
    </span>
  );
}
