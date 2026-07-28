import { whyUs } from "@/data/content";
import { Reveal } from "@/components/primitives/Reveal";
import { Scene } from "@/components/Scene";

export function WhyUs() {
  return (
    <Scene
      id="why-us"
      tone="mist"
      variant="slideRecord"
      ariaLabelledby="why-us-heading"
      contentClassName="mx-auto max-w-[760px]"
    >
      <Reveal className="border border-rule bg-surface">
        <div className="px-6 md:px-12 pt-8 pb-6 border-b border-rule">
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-brass flex items-center gap-2.5">
            <span className="w-6 h-px bg-brass/50" aria-hidden />
            Why Us
          </div>
        </div>

        <div className="px-6 md:px-12 pt-8 pb-2">
          <h2
            id="why-us-heading"
            className="font-serif italic font-semibold text-[clamp(34px,5.5vw,58px)] leading-[1.05] text-ink text-balance mb-6"
          >
            {whyUs.heading}
          </h2>
          <p className="text-[15px] leading-[1.8] text-ink-muted max-w-[58ch] mb-4">
            {whyUs.intro}
          </p>
        </div>

        <div className="px-6 md:px-12 pb-4">
          <ol className="list-none p-0 m-0 flex flex-col">
            {whyUs.points.map((p, i) => (
              <li key={p.title} className={`py-6 ${i > 0 ? "border-t border-rule" : ""}`}>
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-brass block mb-1.5">
                  Finding {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-[20px] font-semibold text-ink mb-2">{p.title}</h3>
                <p className="text-[13.5px] leading-[1.75] text-ink-muted max-w-[58ch]">
                  {p.body}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="px-6 md:px-12 py-5 border-t-2 border-ink flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint mb-0.5">
              Prepared by
            </div>
            <div className="font-mono text-[11px] text-ink">Admissions Review Committee</div>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">
            Revision 2026
          </div>
        </div>
      </Reveal>
    </Scene>
  );
}
