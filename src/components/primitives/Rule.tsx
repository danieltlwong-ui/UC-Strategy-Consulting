export function Rule({ strong = false, className = "" }: { strong?: boolean; className?: string }) {
  return (
    <div
      className={`h-px w-full ${strong ? "bg-rule-strong" : "bg-rule"} ${className}`}
      role="presentation"
    />
  );
}
