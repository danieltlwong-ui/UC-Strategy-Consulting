"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { CSSProperties, ReactNode } from "react";
import { tones, type Tone } from "@/lib/tones";
import { ensureGsap, prefersReducedMotion } from "@/lib/motion";

export type SceneVariant = "pageTurn" | "unfold" | "slideRecord" | "openDocument";

const VARIANTS: Record<
  SceneVariant,
  { from: gsap.TweenVars; to: gsap.TweenVars; origin: string }
> = {
  pageTurn: {
    from: { rotateX: -20, y: 70, opacity: 0.1 },
    to: { rotateX: 0, y: 0, opacity: 1 },
    origin: "top center",
  },
  unfold: {
    from: { scaleY: 0.28, opacity: 0.15 },
    to: { scaleY: 1, opacity: 1 },
    origin: "top center",
  },
  slideRecord: {
    from: { y: 220, opacity: 0.1 },
    to: { y: 0, opacity: 1 },
    origin: "center",
  },
  openDocument: {
    from: { scale: 0.82, opacity: 0.1 },
    to: { scale: 1, opacity: 1 },
    origin: "center",
  },
};

export function Scene({
  id,
  tone,
  variant = "slideRecord",
  ariaLabelledby,
  className = "",
  contentClassName = "",
  background,
  children,
}: {
  id: string;
  tone: Tone;
  variant?: SceneVariant;
  ariaLabelledby?: string;
  className?: string;
  contentClassName?: string;
  background?: ReactNode;
  children: ReactNode;
}) {
  // triggerRef stays in normal document flow (never repositioned by sticky),
  // so ScrollTrigger always measures a stable box — sticky elements can give
  // GSAP unreliable start/end math, especially when scrolling back up.
  const triggerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    ensureGsap();

    const el = innerRef.current;
    const trigger = triggerRef.current;
    if (!el || !trigger) return;
    const { from, to, origin } = VARIANTS[variant];

    gsap.set(el, { ...from, transformOrigin: origin, transformStyle: "preserve-3d" });

    // As this sheet travels from the bottom of the viewport to the top (the
    // exact span during which it slides up and covers the sheet beneath it),
    // settle it into place — paced 1:1 with scroll in both directions. A
    // small scrub keeps it from feeling instant on a fast flick without
    // lagging far enough behind to look like it "skipped."
    const tween = gsap.to(el, {
      ...to,
      ease: "none",
      scrollTrigger: {
        trigger,
        start: "top bottom",
        end: "top top",
        scrub: 0.15,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [variant]);

  return (
    // No height is forced here — it's simply whatever the sticky section
    // below naturally needs (see comment there). One continuous document
    // scroll for the whole page; nothing here opens its own scrollbar.
    <div ref={triggerRef} className="relative">
      <section
        ref={sceneRef}
        id={id}
        aria-labelledby={ariaLabelledby}
        style={tones[tone] as CSSProperties}
        className={`sticky top-0 min-h-svh w-full bg-ground flex flex-col overflow-hidden px-5 md:px-8 py-24 ${className}`}
      >
        {background}
        <div ref={innerRef} className={`relative z-10 w-full m-auto ${contentClassName}`} style={{ perspective: 1200 }}>
          {children}
        </div>
      </section>
    </div>
  );
}
