import { contacts, finalCta } from "@/data/content";
import { Reveal } from "@/components/primitives/Reveal";
import { Magnetic } from "@/components/primitives/Magnetic";
import { Scene } from "@/components/Scene";
import { HeroField } from "@/components/HeroField";

export function RequestForReview() {
  return (
    <Scene
      id="diagnostic"
      tone="dark"
      variant="slideRecord"
      ariaLabelledby="diagnostic-heading"
      contentClassName="mx-auto max-w-[560px] text-center"
      background={<HeroField />}
    >
      <Reveal>
        <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink-faint mb-2">
          File No. 09 / 09 — Intake Form
        </div>
        <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-brass mb-4">
          {finalCta.eyebrow}
        </div>
        <h2
          id="diagnostic-heading"
          className="font-serif italic font-semibold text-[clamp(28px,4vw,44px)] leading-[1.1] text-ink text-balance mb-5"
        >
          {finalCta.heading}
        </h2>
        <p className="text-[15.5px] leading-[1.8] text-ink-muted mb-10 max-w-[48ch] mx-auto">
          {finalCta.body}
        </p>

        <div className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-ink-faint mb-5">
          {finalCta.scheduleLabel}
        </div>
        <Magnetic className="block mb-3">
          <a
            href={finalCta.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-mono text-[13px] tracking-[0.08em] uppercase text-ground bg-gold px-10 py-4 border border-gold hover:bg-transparent hover:text-gold transition-colors duration-200"
          >
            {finalCta.bookNowLabel} →
          </a>
        </Magnetic>
        <p className="font-mono text-[9.5px] tracking-[0.08em] uppercase text-ink-faint mb-12">
          NOTE: Booking a time doesn't commit you to anything
        </p>

        <div className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-ink-faint mb-3">
          {finalCta.questionsLabel}
        </div>
        <div className="flex flex-col items-center gap-1.5">
          {contacts.map((c) => (
            <a
              key={c.email}
              href={`mailto:${c.email}`}
              className="text-[13.5px] text-steel underline underline-offset-2"
            >
              {c.email}
            </a>
          ))}
        </div>
      </Reveal>
    </Scene>
  );
}
