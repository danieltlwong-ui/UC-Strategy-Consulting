import { finalCta } from "@/data/content";
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
        <h2
          id="diagnostic-heading"
          className="font-serif italic font-semibold text-[clamp(28px,4vw,44px)] leading-[1.1] text-ink text-balance mb-5"
        >
          {finalCta.heading}
        </h2>
        <p className="text-[15.5px] leading-[1.8] text-ink-muted mb-10 max-w-[48ch] mx-auto">
          {finalCta.body}
        </p>

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
        <p className="font-mono text-[9.5px] tracking-[0.08em] uppercase text-ink-faint">
          Booking a time doesn't commit you to anything
        </p>
      </Reveal>
    </Scene>
  );
}
