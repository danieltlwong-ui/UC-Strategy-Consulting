"use client";

import { motion } from "framer-motion";
import { intro } from "@/data/content";
import { StampRing } from "@/components/primitives/StampRing";
import { Magnetic } from "@/components/primitives/Magnetic";
import { HeroField } from "@/components/HeroField";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function IntroSequence() {
  return (
    <section
      id="intro"
      aria-labelledby="intro-heading"
      className="relative min-h-svh flex flex-col items-center justify-center text-center px-5 md:px-8 py-28 overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% -5%, rgba(242,183,5,0.1) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 80% 85%, rgba(22,41,74,0.6) 0%, transparent 65%)",
        }}
      />
      <HeroField />

      <motion.h1
        {...fadeUp(0.1)}
        id="intro-heading"
        className="font-serif italic font-semibold text-[clamp(38px,7vw,80px)] leading-[1.02] tracking-[-0.01em] text-ink max-w-4xl text-balance relative z-10"
      >
        {intro.headline}
      </motion.h1>

      <motion.p
        {...fadeUp(0.25)}
        className="mt-6 text-[16.5px] md:text-[18px] leading-[1.8] text-ink-muted max-w-[52ch] relative z-10"
      >
        {intro.subheadline}
      </motion.p>

      <motion.div {...fadeUp(0.4)} className="mt-9 flex flex-wrap items-center justify-center gap-4 relative z-10">
        <Magnetic>
          <a
            href={intro.primaryCta.href}
            className="inline-block font-mono text-[12px] tracking-[0.08em] uppercase text-ground bg-gold px-7 py-3.5 border border-gold hover:bg-transparent hover:text-gold transition-colors duration-200"
          >
            {intro.primaryCta.label} →
          </a>
        </Magnetic>
        <Magnetic strength={0.25}>
          <a
            href={intro.secondaryCta.href}
            className="inline-block font-mono text-[12px] tracking-[0.08em] uppercase text-ink px-7 py-3.5 border border-rule-strong hover:border-steel hover:text-steel transition-colors duration-200"
          >
            {intro.secondaryCta.label}
          </a>
        </Magnetic>
      </motion.div>

      <motion.div
        {...fadeUp(0.55)}
        className="mt-20 pt-10 border-t border-rule flex flex-wrap justify-center gap-12 md:gap-16 relative z-10"
      >
        {intro.credibility.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 2.2, rotate: -6 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: false, amount: 0.8 }}
            transition={{
              duration: 0.4,
              delay: i * 0.15,
              ease: [0.34, 1.4, 0.64, 1],
            }}
          >
            <StampRing value={stat.value} label={stat.label} size="sm" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
