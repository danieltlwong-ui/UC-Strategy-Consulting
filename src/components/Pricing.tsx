import Link from "next/link";
import { pricing } from "@/data/content";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { Scene } from "@/components/Scene";

export function Pricing() {
  return (
    <Scene
      id="pricing"
      tone="frost"
      variant="unfold"
      ariaLabelledby="pricing-heading"
      contentClassName="mx-auto max-w-[1180px]"
    >
      <SectionHeading
        eyebrow={pricing.eyebrow}
        heading={pricing.heading}
        intro={pricing.intro}
        headingId="pricing-heading"
      />

      {/* Per-essay ledger rows */}
        <div className="border border-rule mb-14 bg-ground">
          {pricing.perEssay.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.05} direction={i % 2 === 0 ? "left" : "right"} distance="sm">
              <div
                className={`grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 md:gap-8 items-center px-6 py-6 ${
                  i > 0 ? "border-t border-rule" : ""
                }`}
              >
                <div>
                  <div className="text-[15px] font-semibold text-ink mb-1">{item.name}</div>
                  <div className="text-[13.5px] text-ink-muted">{item.description}</div>
                </div>
                <div className="font-serif text-[26px] text-ink whitespace-nowrap [font-variant-numeric:tabular-nums]">
                  {item.price}{" "}
                  <span className="font-sans text-[12.5px] text-ink-faint">{item.unit}</span>
                </div>
                <Link
                  href={`/payment?plan=${item.slug}`}
                  className="font-mono text-[11px] tracking-[0.08em] uppercase text-ink border border-rule-strong px-5 py-2.5 hover:border-steel hover:text-steel transition-colors duration-200 whitespace-nowrap justify-self-start md:justify-self-end"
                >
                  {item.cta} →
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Package plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-rule border border-rule">
          {pricing.plans.map((plan, i) => (
            <Reveal
              key={plan.name}
              delay={i * 0.06}
              direction={i === 0 ? "left" : i === 2 ? "right" : "up"}
              className={`p-8 flex flex-col ${plan.featured ? "bg-surface" : "bg-ground"}`}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-ink-faint">
                  {plan.name}
                </span>
                {plan.badge && (
                  <span className="font-mono text-[10px] tracking-[0.06em] uppercase text-ground bg-gold px-2 py-1">
                    {plan.badge}
                  </span>
                )}
              </div>
              <div className="font-serif text-[40px] leading-none text-ink mb-1.5 [font-variant-numeric:tabular-nums]">
                {plan.price}
              </div>
              <div className="text-[12px] text-ink-faint mb-7">{plan.billing}</div>

              <ul className="list-none p-0 m-0 flex flex-col gap-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="text-[13.5px] text-ink-muted flex gap-2.5 items-start">
                    <span className="font-mono text-brass mt-0.5 text-[12px]" aria-hidden>
                      §
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={`/payment?plan=${plan.slug}`}
                className={`text-center font-mono text-[11px] tracking-[0.08em] uppercase px-5 py-3 border transition-colors duration-200 ${
                  plan.featured
                    ? "text-ground bg-gold border-gold hover:bg-transparent hover:text-gold"
                    : "text-ink border-rule-strong hover:border-steel hover:text-steel"
                }`}
              >
                {plan.cta} →
              </Link>
            </Reveal>
          ))}
      </div>
    </Scene>
  );
}
