import { approach } from "@/data/content";
import { Reveal } from "@/components/primitives/Reveal";
import { Scene } from "@/components/Scene";

// Editorial priority tag per item — an organizational device for the
// worksheet, not a claim about outcomes.
const PRIORITY = ["High", "High", "Standard", "Standard", "High", "Standard"];

export function Approach() {
  const total = approach.services.length;
  return (
    <Scene
      id="approach"
      tone="paper"
      variant="unfold"
      ariaLabelledby="approach-heading"
      contentClassName="mx-auto max-w-[800px]"
    >
      <div className="border border-rule bg-surface">
        <div className="px-6 md:px-12 pt-8 pb-6 border-b border-rule">
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-brass flex items-center gap-2.5">
            <span className="w-6 h-px bg-brass/50" aria-hidden />
            Application Checklist
          </div>
        </div>

        <div className="px-6 md:px-12 pt-8 pb-6">
          <h2
            id="approach-heading"
            className="font-serif italic font-semibold text-[clamp(34px,5.5vw,58px)] leading-[1.05] text-ink text-balance mb-5"
          >
            {approach.heading}
          </h2>
          <p className="text-[15px] leading-[1.8] text-ink-muted max-w-[58ch]">{approach.intro}</p>
        </div>

        <ul className="list-none p-0 m-0 border-t border-rule">
          {approach.services.map((s, i) => (
            <Reveal
              as="li"
              key={s.title}
              delay={(i % 6) * 0.04}
              direction={i % 2 === 0 ? "left" : "right"}
              distance="sm"
            >
              <div
                className={`px-6 md:px-12 py-6 ${i > 0 ? "border-t border-rule" : ""}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-1 mb-2">
                  <h3 className="flex items-start gap-3 text-[16px] font-semibold text-ink">
                    <span aria-hidden className="mt-1 w-4 h-4 border border-rule-strong shrink-0" />
                    {s.title}
                  </h3>
                  <span className="font-mono text-[9.5px] tracking-[0.1em] uppercase text-ink-faint whitespace-nowrap pt-1">
                    Section {String(i + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-[13.5px] leading-[1.7] text-ink-muted max-w-[58ch] mb-3 pl-7">
                  {s.body}
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-1 pl-7 font-mono text-[9.5px] uppercase tracking-[0.08em] text-ink-faint">
                  <span>
                    Priority <span className="text-brass">{PRIORITY[i % PRIORITY.length]}</span>
                  </span>
                  <span>
                    Status <span className="text-ink">Required</span>
                  </span>
                  <span>
                    Reviewed <span className="text-ink">With Consultant</span>
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        <div className="px-6 md:px-12 py-5 border-t-2 border-ink font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink-faint">
          {total} of {total} sections outlined — none yet reviewed
        </div>
      </div>
    </Scene>
  );
}
