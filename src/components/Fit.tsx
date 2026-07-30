import { fit } from "@/data/content";
import { Reveal } from "@/components/primitives/Reveal";
import { Scene } from "@/components/Scene";

const REASONS = ["Protect Review Quality", "Ensure Genuine Fit", "Preserve Applicant Trust"];

export function Fit() {
  return (
    <Scene
      id="fit"
      tone="mist"
      variant="pageTurn"
      ariaLabelledby="fit-heading"
      contentClassName="mx-auto max-w-[720px]"
    >
      <Reveal className="border border-rule bg-surface">
        <div className="px-6 md:px-12 pt-8 pb-6 border-b border-rule">
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-brass flex items-center gap-2.5">
            <span className="w-6 h-px bg-brass/50" aria-hidden />
            Admissions Policy
          </div>
        </div>

        <div className="px-6 md:px-12 pt-8 pb-2">
          <h2
            id="fit-heading"
            className="font-serif italic font-semibold text-[clamp(34px,5.5vw,58px)] leading-[1.05] text-ink text-balance mb-6"
          >
            {fit.heading}
          </h2>
          {fit.body.map((p) => (
            <p key={p} className="text-[15px] leading-[1.8] text-ink-muted max-w-[58ch] mb-4">
              {p}
            </p>
          ))}
        </div>

        <div className="px-6 md:px-12 pb-4">
          <ol className="list-none p-0 m-0 flex flex-col">
            {fit.principles.map((p, i) => (
              <li key={p.title} className={`py-6 ${i > 0 ? "border-t border-rule" : ""}`}>
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-brass block mb-1.5">
                  4.2.{i + 1}
                </span>
                <h3 className="font-serif text-[20px] font-semibold text-ink mb-2">{p.title}</h3>
                <p className="text-[13.5px] leading-[1.75] text-ink-muted max-w-[58ch] mb-3">
                  {p.body}
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-[9.5px] uppercase tracking-[0.08em] text-ink-faint">
                  <span>
                    Policy Reason <span className="text-ink">{REASONS[i % REASONS.length]}</span>
                  </span>
                  <span>
                    Status <span className="text-brass">Active</span>
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="px-6 md:px-12 py-5 border-t-2 border-ink">
          <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint mb-0.5">
            Approved By
          </div>
          <div className="font-mono text-[11px] text-ink">Admissions Review Committee</div>
        </div>
      </Reveal>
    </Scene>
  );
}
