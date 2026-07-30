"use client";

import { useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { whyUs } from "@/data/content";
import { Reveal } from "@/components/primitives/Reveal";
import { Scene } from "@/components/Scene";

const CARD_POSITIONS = [
  "absolute z-10 left-[1%] top-[4%] w-[280px]",
  "absolute z-10 left-[37%] top-[19%] w-[300px]",
  "absolute z-10 right-[1%] top-[9%] w-[280px]",
];

const CARD_ROTATE = ["-rotate-[1.3deg]", "rotate-[0.8deg]", "rotate-[1.6deg]"];

// A tight leash — cards can be nudged a little, not dragged across the page.
const DRAG_BOUNDS = { left: -36, right: 36, top: -26, bottom: 26 };
const MIN_SEPARATION = 150;

const SHADOW_REST = "0 4px 10px rgba(20, 16, 8, 0.08)";
const SHADOW_HOVER = "0 10px 20px rgba(20, 16, 8, 0.13)";
const SHADOW_LIFTED = "0 26px 42px rgba(20, 16, 8, 0.22)";

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

function EvidenceCard({ index, title, body }: { index: number; title: string; body: string }) {
  return (
    <>
      <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-brass block mb-2">
        Finding {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="font-serif text-[19px] font-semibold text-ink mb-2 leading-snug">{title}</h3>
      <p className="text-[13px] leading-[1.7] text-ink-muted">{body}</p>
    </>
  );
}

function EvidenceBoard() {
  const ref0 = useRef<HTMLDivElement>(null);
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const refs = [ref0, ref1, ref2];

  const x0 = useMotionValue(0);
  const y0 = useMotionValue(0);
  const x1 = useMotionValue(0);
  const y1 = useMotionValue(0);
  const x2 = useMotionValue(0);
  const y2 = useMotionValue(0);
  const xs = [x0, x1, x2];
  const ys = [y0, y1, y2];

  const repelOthers = (dragged: number) => {
    const draggedRect = refs[dragged].current?.getBoundingClientRect();
    if (!draggedRect) return;
    const cx1 = draggedRect.left + draggedRect.width / 2;
    const cy1 = draggedRect.top + draggedRect.height / 2;

    [0, 1, 2].forEach((j) => {
      if (j === dragged) return;
      const rect = refs[j].current?.getBoundingClientRect();
      if (!rect) return;
      const cx2 = rect.left + rect.width / 2;
      const cy2 = rect.top + rect.height / 2;
      const dx = cx2 - cx1;
      const dy = cy2 - cy1;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      if (dist < MIN_SEPARATION) {
        const push = (MIN_SEPARATION - dist) * 0.6;
        const nx = dx / dist;
        const ny = dy / dist;
        const targetX = clamp(xs[j].get() + nx * push, DRAG_BOUNDS.left, DRAG_BOUNDS.right);
        const targetY = clamp(ys[j].get() + ny * push, DRAG_BOUNDS.top, DRAG_BOUNDS.bottom);
        animate(xs[j], targetX, { type: "spring", stiffness: 260, damping: 22 });
        animate(ys[j], targetY, { type: "spring", stiffness: 260, damping: 22 });
      }
    });
  };

  return (
    <div className="relative mx-auto max-w-[980px] h-[360px] hidden lg:block mb-16">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 980 360"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line x1="150" y1="90" x2="512" y2="153" stroke="var(--brass-rule-strong)" strokeWidth="1" strokeDasharray="3 5" />
        <line x1="512" y1="153" x2="830" y2="109" stroke="var(--brass-rule-strong)" strokeWidth="1" strokeDasharray="3 5" />
        <line x1="150" y1="90" x2="830" y2="109" stroke="var(--brass-rule-strong)" strokeWidth="1" strokeDasharray="3 5" />
        <circle cx="150" cy="90" r="4" fill="var(--brass)" />
        <circle cx="512" cy="153" r="4" fill="var(--brass)" />
        <circle cx="830" cy="109" r="4" fill="var(--brass)" />
      </svg>

      {whyUs.points.map((p, i) => (
        <Reveal
          key={p.title}
          direction={i === 0 ? "left" : i === 2 ? "right" : "up"}
          delay={i * 0.12}
          className={CARD_POSITIONS[i]}
        >
          <motion.div
            ref={refs[i]}
            drag
            dragConstraints={DRAG_BOUNDS}
            dragElastic={0.2}
            dragMomentum={false}
            onDrag={() => repelOthers(i)}
            data-cursor-hover
            style={{ x: xs[i], y: ys[i], boxShadow: SHADOW_REST }}
            whileHover={{ boxShadow: SHADOW_HOVER, scale: 1.015 }}
            whileDrag={{ boxShadow: SHADOW_LIFTED, scale: 1.02 }}
            transition={{ boxShadow: { duration: 0.25 }, scale: { duration: 0.25 } }}
            className={`bg-surface border border-rule px-6 py-6 cursor-grab active:cursor-grabbing touch-none ${CARD_ROTATE[i]}`}
          >
            <EvidenceCard index={i} title={p.title} body={p.body} />
          </motion.div>
        </Reveal>
      ))}
    </div>
  );
}

export function WhyUs() {
  return (
    <Scene
      id="why-us"
      tone="mist"
      variant="slideRecord"
      ariaLabelledby="why-us-heading"
      contentClassName="mx-auto max-w-[1180px]"
    >
      <div className="text-center mb-6">
        <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-brass inline-flex items-center gap-2.5">
          <span className="w-6 h-px bg-brass/50" aria-hidden />
          Why Us
          <span className="w-6 h-px bg-brass/50" aria-hidden />
        </div>
      </div>

      <div className="text-center max-w-[620px] mx-auto mb-16 md:mb-20">
        <h2
          id="why-us-heading"
          className="font-serif italic font-semibold text-[clamp(34px,5.5vw,58px)] leading-[1.05] text-ink text-balance mb-5"
        >
          {whyUs.heading}
        </h2>
        <p className="text-[15px] leading-[1.8] text-ink-muted">{whyUs.intro}</p>
      </div>

      <EvidenceBoard />

      {/* Stacked fallback — smaller screens */}
      <div className="lg:hidden flex flex-col gap-5 max-w-[560px] mx-auto mb-14">
        {whyUs.points.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <div className="bg-surface border border-rule px-6 py-6">
              <EvidenceCard index={i} title={p.title} body={p.body} />
            </div>
          </Reveal>
        ))}
      </div>

      <div className="max-w-[760px] mx-auto px-6 py-5 border-t-2 border-ink flex flex-wrap items-center justify-between gap-3">
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
    </Scene>
  );
}
