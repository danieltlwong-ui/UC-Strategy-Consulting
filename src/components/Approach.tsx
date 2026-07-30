"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { approach } from "@/data/content";
import { Reveal } from "@/components/primitives/Reveal";
import { Scene } from "@/components/Scene";

// Editorial priority tag per item — an organizational device for the
// worksheet, not a claim about outcomes.
const PRIORITY = ["High", "High", "Standard", "Standard", "High", "Standard"];

function ChecklistRow({
  service,
  index,
  total,
  checked,
  onToggle,
  onAutoCheck,
}: {
  service: { title: string; body: string };
  index: number;
  total: number;
  checked: boolean;
  onToggle: (i: number) => void;
  onAutoCheck: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Auto-checks itself off once the row crosses the vertical center of the
  // viewport — never fires again after that, so it can't fight with a
  // manual uncheck later. Using a thin center band (rather than "any part
  // visible") is what makes this progress one row at a time as you scroll,
  // instead of several checking simultaneously the moment the whole list
  // first comes on screen.
  const inView = useInView(ref, { once: true, margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onAutoCheck(index);
  }, [inView, index, onAutoCheck]);

  return (
    <Reveal
      as="li"
      delay={(index % 6) * 0.04}
      direction={index % 2 === 0 ? "left" : "right"}
      distance="sm"
    >
      <div
        ref={ref}
        className={`px-6 md:px-12 py-6 transition-colors duration-300 ${
          index > 0 ? "border-t border-rule" : ""
        } ${checked ? "bg-brass/5" : ""}`}
      >
        <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-1 mb-2">
          <h3 className="flex items-start gap-3 text-[16px] font-semibold text-ink">
            <button
              type="button"
              onClick={() => onToggle(index)}
              aria-pressed={checked}
              aria-label={`Mark "${service.title}" as reviewed`}
              data-cursor-hover
              className={`mt-1 w-4 h-4 border shrink-0 flex items-center justify-center cursor-pointer transition-colors duration-200 ${
                checked ? "bg-brass border-brass" : "border-rule-strong hover:border-brass/60"
              }`}
            >
              <AnimatePresence>
                {checked && (
                  <motion.svg
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.34, 1.56, 0.64, 1] }}
                    width="10"
                    height="8"
                    viewBox="0 0 10 8"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="var(--ground)"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                )}
              </AnimatePresence>
            </button>
            {service.title}
          </h3>
          <span className="font-mono text-[9.5px] tracking-[0.1em] uppercase text-ink-faint whitespace-nowrap pt-1">
            Section {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </span>
        </div>
        <p className="text-[13.5px] leading-[1.7] text-ink-muted max-w-[58ch] mb-3 pl-7">
          {service.body}
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-1 pl-7 font-mono text-[9.5px] uppercase tracking-[0.08em] text-ink-faint">
          <span>
            Priority <span className="text-brass">{PRIORITY[index % PRIORITY.length]}</span>
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
  );
}

export function Approach() {
  const total = approach.services.length;
  const [checked, setChecked] = useState<boolean[]>(() => Array(total).fill(false));
  const reviewedCount = checked.filter(Boolean).length;

  const toggle = useCallback((i: number) => {
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  }, []);

  const autoCheck = useCallback((i: number) => {
    setChecked((prev) => (prev[i] ? prev : prev.map((v, idx) => (idx === i ? true : v))));
  }, []);

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
            <ChecklistRow
              key={s.title}
              service={s}
              index={i}
              total={total}
              checked={checked[i]}
              onToggle={toggle}
              onAutoCheck={autoCheck}
            />
          ))}
        </ul>

        <div className="px-6 md:px-12 py-5 border-t-2 border-ink font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink-faint">
          {total} of {total} sections outlined —{" "}
          {reviewedCount === 0 ? "none yet reviewed" : `${reviewedCount} of ${total} reviewed`}
        </div>
      </div>
    </Scene>
  );
}
