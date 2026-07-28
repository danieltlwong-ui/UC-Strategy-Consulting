import { Reveal } from "@/components/primitives/Reveal";

export function SectionHeading({
  eyebrow,
  heading,
  intro,
  align = "left",
  headingId,
}: {
  eyebrow: string;
  heading: string;
  intro?: string;
  align?: "left" | "center";
  headingId?: string;
}) {
  const alignCls = align === "center" ? "text-center mx-auto" : "";
  return (
    <Reveal className={`max-w-2xl mb-14 md:mb-20 ${alignCls}`}>
      <div
        className={`font-mono text-[11px] tracking-[0.14em] uppercase text-brass mb-4 flex items-center gap-2.5 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        {align !== "center" && <span className="w-6 h-px bg-brass/50" aria-hidden />}
        {eyebrow}
      </div>
      <h2
        id={headingId}
        className="font-serif italic font-semibold text-[clamp(28px,4vw,44px)] leading-[1.1] text-ink text-balance mb-3"
      >
        {heading}
      </h2>
      {intro && <p className="text-[15.5px] leading-[1.75] text-ink-muted max-w-[60ch]">{intro}</p>}
    </Reveal>
  );
}
