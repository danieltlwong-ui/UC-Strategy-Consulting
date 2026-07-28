"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faq } from "@/data/content";
import { SectionHeading } from "@/components/SectionHeading";
import { Scene } from "@/components/Scene";

// Four real paper stocks, not four accent colors — cream legal stock, plain
// bond, aged/archival, and pale-blue engineering-notebook paper.
const PAPERS = [
  { bg: "#f4eeda", ink: "#251f10", ruleColor: "rgba(37,31,16,0.16)" },
  { bg: "#faf8f1", ink: "#221e14", ruleColor: "rgba(34,30,20,0.14)" },
  { bg: "#ece0c2", ink: "#2a2211", ruleColor: "rgba(42,34,17,0.18)" },
  { bg: "#ecf1f7", ink: "#1b2432", ruleColor: "rgba(27,36,50,0.16)" },
];

const ROTATIONS = [-1.6, 1.1, -0.8, 1.7, -1.2, 0.9, -1.7, 1.3, -0.9, 1.4];

// A slightly irregular edge rather than a crisp rounded rectangle — corners
// nicked at uneven angles, top-right corner left intact for the folded flap.
const DECKLE = "polygon(1.4% 0%, 100% 0%, 100% 96.5%, 98% 100%, 1.8% 100%, 0% 97.8%, 0% 1.6%)";

function GrainDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
      <filter id="paper-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" stitchTiles="stitch" />
        <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0" />
      </filter>
    </svg>
  );
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Scene
      id="faq"
      tone="mist"
      variant="openDocument"
      ariaLabelledby="faq-heading"
      contentClassName="mx-auto max-w-[1000px]"
    >
      <GrainDefs />
      <SectionHeading eyebrow="FAQ" heading="Common questions" headingId="faq-heading" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {faq.map((item, i) => {
          const isOpen = open === i;
          const rotate = ROTATIONS[i % ROTATIONS.length];
          const paper = PAPERS[i % PAPERS.length];
          const ruled = i % 2 === 1;
          const stamped = i % 3 === 0;

          return (
            <motion.div
              layout
              key={item.question}
              data-flagged={item.flagged || undefined}
              initial={{ opacity: 0, y: 40, rotate }}
              whileInView={{ opacity: 1, y: 0, rotate }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ rotate: 0, scale: 1.02, zIndex: 5 }}
              className={`relative ${i === faq.length - 1 ? "lg:col-start-2" : ""}`}
              style={{
                background: paper.bg,
                clipPath: DECKLE,
                boxShadow: "0 3px 6px rgba(20,14,4,0.14), 0 14px 28px -16px rgba(20,14,4,0.35)",
              }}
            >
              {/* paper grain */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none mix-blend-multiply"
                style={{ filter: "url(#paper-grain)", opacity: 0.5 }}
              />
              {/* faint ruled lines — every other sheet, like notebook stock */}
              {ruled && (
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 20px, ${paper.ruleColor} 20px, ${paper.ruleColor} 21px)`,
                  }}
                />
              )}
              {/* ink smudges */}
              <div
                aria-hidden
                className="absolute pointer-events-none rounded-full"
                style={{
                  width: 26,
                  height: 10,
                  left: "12%",
                  bottom: "10%",
                  background: paper.ink,
                  opacity: 0.045,
                  filter: "blur(2px)",
                  transform: `rotate(${rotate * -3}deg)`,
                }}
              />
              {/* folded corner */}
              <div
                aria-hidden
                className="absolute top-0 right-0 pointer-events-none"
                style={{
                  width: 22,
                  height: 22,
                  clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                  background: `linear-gradient(135deg, ${paper.bg} 45%, rgba(0,0,0,0.16) 46%, rgba(0,0,0,0.05) 100%)`,
                }}
              />

              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="relative w-full text-left p-5 pt-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="font-mono text-[9.5px] tracking-[0.1em] uppercase"
                    style={{ color: paper.ink, opacity: 0.55 }}
                  >
                    File No. {String(i + 1).padStart(2, "0")}
                  </span>
                  {stamped && (
                    <span
                      className="font-mono text-[8px] tracking-[0.08em] uppercase border rounded-[1px] px-1.5 py-0.5 -rotate-6"
                      style={{ color: "var(--brass)", borderColor: "var(--brass)", opacity: 0.65 }}
                    >
                      On file
                    </span>
                  )}
                </div>

                <span
                  className="block text-[14px] font-medium leading-snug pr-3"
                  style={{ color: paper.ink }}
                >
                  {item.question}
                </span>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.p
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: "auto", opacity: 1, marginTop: 10 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden text-[13px] leading-[1.7]"
                      style={{ color: paper.ink, opacity: 0.72 }}
                    >
                      {item.answer}
                    </motion.p>
                  )}
                </AnimatePresence>

                <span
                  className="mt-3 font-mono text-[9.5px] tracking-[0.06em] uppercase block"
                  style={{ color: paper.ink, opacity: 0.5 }}
                >
                  {isOpen ? "— fold back" : "— unfold"}
                </span>
              </button>
            </motion.div>
          );
        })}
      </div>
    </Scene>
  );
}
