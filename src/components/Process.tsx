"use client";

import { motion } from "framer-motion";
import { process } from "@/data/content";
import { Scene } from "@/components/Scene";
import { HighlightMark } from "@/components/primitives/HighlightMark";

// Per-stage fields that don't live in the shared content step data — these
// are display-only routing-slip fields, not separate editorial content.
const STAGE_FIELDS: { label: string; value: string }[][] = [
  [
    { label: "Owner", value: "Consultant" },
    { label: "Duration", value: "30 min" },
    { label: "Status", value: "Required" },
  ],
  [
    { label: "Deliverable", value: "Campus Plan" },
    { label: "Owner", value: "Consultant" },
  ],
  [
    { label: "Deliverable", value: "Essay Drafts" },
    { label: "Review Cycles", value: "Multiple" },
  ],
  [
    { label: "Deliverable", value: "Activity List Review" },
    { label: "Owner", value: "Consultant" },
  ],
  [
    { label: "Deliverable", value: "Final Review Sign-off" },
    { label: "Status", value: "Required" },
  ],
];

export function Process() {
  return (
    <Scene
      id="process"
      tone="paper"
      variant="openDocument"
      ariaLabelledby="process-heading"
      contentClassName="mx-auto max-w-[800px]"
    >
      <div className="border border-rule bg-surface">
        <div className="px-6 md:px-12 pt-8 pb-6 border-b border-rule">
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-brass flex items-center gap-2.5">
            <span className="w-6 h-px bg-brass/50" aria-hidden />
            Application Workflow
          </div>
        </div>

        <div className="px-6 md:px-12 pt-8 pb-6">
          <h2
            id="process-heading"
            className="font-serif italic font-semibold text-[clamp(34px,5.5vw,58px)] leading-[1.05] text-ink text-balance"
          >
            {process.heading}
          </h2>
        </div>

        <ol className="list-none p-0 m-0 border-t border-rule">
          {process.steps.map((step, i) => {
            const fields = STAGE_FIELDS[i] ?? [];
            return (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className={`px-6 md:px-12 py-6 ${i > 0 ? "border-t border-rule" : ""}`}
              >
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-brass block mb-1.5">
                  Stage {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-[20px] font-semibold text-ink mb-2">
                  <HighlightMark>{step.title}</HighlightMark>
                </h3>
                <p className="text-[13.5px] leading-[1.75] text-ink-muted max-w-[58ch] mb-3">
                  {step.body}
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-[9.5px] uppercase tracking-[0.08em] text-ink-faint">
                  {fields.map((f) => (
                    <span key={f.label}>
                      {f.label} <span className="text-ink">{f.value}</span>
                    </span>
                  ))}
                </div>
              </motion.li>
            );
          })}
        </ol>

        <div className="px-6 md:px-12 py-5 border-t-2 border-ink flex flex-wrap items-center justify-between gap-2 font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink-faint">
          <span>{process.steps.length} Stages Recorded</span>
          <span>End of Routing Slip</span>
        </div>
      </div>
    </Scene>
  );
}
