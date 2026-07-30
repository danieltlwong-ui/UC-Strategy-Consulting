"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { intro } from "@/data/content";
import { StampRing } from "@/components/primitives/StampRing";
import { Magnetic } from "@/components/primitives/Magnetic";
import { HeroField } from "@/components/HeroField";
import { ensureGsap } from "@/lib/motion";

const SESSION_KEY = "admit-file-seal-played";

export function IntroSequence() {
  const [skipGate, setSkipGate] = useState(false);
  const [broken, setBroken] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const sealWrapRef = useRef<HTMLDivElement>(null);
  const sealButtonRef = useRef<HTMLButtonElement>(null);
  const sealLeftRef = useRef<SVGPathElement>(null);
  const sealRightRef = useRef<SVGPathElement>(null);
  const captionRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const idleTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    ensureGsap();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadyPlayed =
      typeof sessionStorage !== "undefined" && sessionStorage.getItem(SESSION_KEY) === "1";

    const els = [headlineRef, subRef, ctaRef, statsRef].map((r) => r.current);

    const ctx = gsap.context(() => {
      if (reduced || alreadyPlayed) {
        gsap.set(els, { opacity: 1, y: 0 });
        gsap.set(sealWrapRef.current, { opacity: 0, display: "none" });
        setSkipGate(true);
        setBroken(true);
      } else {
        gsap.set(els, { opacity: 0, y: 22 });
        idleTween.current = gsap.to(sealButtonRef.current, {
          scale: 1.035,
          duration: 1.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleBreak = () => {
    if (broken) return;
    setBroken(true);
    idleTween.current?.kill();

    const tl = gsap.timeline({
      defaults: { ease: "sealEase" },
      onComplete: () => {
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          /* sessionStorage unavailable — safe to ignore */
        }
      },
    });

    tl.to(captionRef.current, { opacity: 0, duration: 0.2 })
      .to(
        sealLeftRef.current,
        { x: -46, rotate: -18, duration: 0.6, ease: "power3.in" },
        "-=0.05"
      )
      .to(sealRightRef.current, { x: 46, rotate: 18, duration: 0.6, ease: "power3.in" }, "<")
      .to(sealWrapRef.current, { opacity: 0, scale: 1.3, duration: 0.4 }, "-=0.35")
      .set(sealWrapRef.current, { display: "none" })
      .to(headlineRef.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.3")
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.45")
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
      .to(statsRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");
  };

  return (
    <section
      ref={sectionRef}
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

      {!skipGate && (
        <div
          ref={sealWrapRef}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4"
        >
          <button
            ref={sealButtonRef}
            type="button"
            onClick={handleBreak}
            data-cursor-hover
            data-cursor-label="OPEN"
            aria-label="Break the seal to reveal the page"
            className="relative"
            style={{ perspective: 400 }}
          >
            <svg width="132" height="132" viewBox="0 0 128 128" fill="none">
              <defs>
                <radialGradient id="sealGradient" cx="35%" cy="30%" r="75%">
                  <stop offset="0%" stopColor="var(--gold)" />
                  <stop offset="100%" stopColor="var(--brass)" />
                </radialGradient>
              </defs>
              <path
                ref={sealLeftRef}
                d="M64 4 A60 60 0 0 0 64 124 Z"
                fill="url(#sealGradient)"
              />
              <path
                ref={sealRightRef}
                d="M64 4 A60 60 0 0 1 64 124 Z"
                fill="url(#sealGradient)"
              />
              <circle cx="64" cy="64" r="43" fill="none" stroke="var(--ground)" strokeOpacity="0.25" strokeWidth="1" />
              <rect x="58" y="58" width="12" height="12" fill="none" stroke="var(--ground)" strokeOpacity="0.4" strokeWidth="1.4" transform="rotate(45 64 64)" />
            </svg>
          </button>
          <span
            ref={captionRef}
            className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-ink-faint"
          >
            — click to open your file —
          </span>
        </div>
      )}

      <h1
        ref={headlineRef}
        id="intro-heading"
        className="font-serif italic font-semibold text-[clamp(38px,7vw,80px)] leading-[1.02] tracking-[-0.01em] text-ink max-w-4xl text-balance relative z-10"
      >
        {intro.headline}
      </h1>

      <p
        ref={subRef}
        className="mt-6 text-[16.5px] md:text-[18px] leading-[1.8] text-ink-muted max-w-[52ch] relative z-10"
      >
        {intro.subheadline}
      </p>

      <div ref={ctaRef} className="mt-9 flex flex-wrap items-center justify-center gap-4 relative z-10">
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
      </div>

      <div
        ref={statsRef}
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
      </div>
    </section>
  );
}
