"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Campus } from "@/data/content";

// California's real bounding box (degrees). The source outline's own aspect
// ratio (105360/91644 ≈ 1.150) matches this box's aspect ratio (9.476° tall /
// 10.351° wide ≈ 1.151° adjusted) closely enough for a simple linear
// (equirectangular) projection onto the image's bounding rectangle.
const CA_BOUNDS = { minLon: -124.482, maxLon: -114.131, minLat: 32.534, maxLat: 42.01 };

function project(lat: number, lon: number) {
  const xPct = ((lon - CA_BOUNDS.minLon) / (CA_BOUNDS.maxLon - CA_BOUNDS.minLon)) * 100;
  const yPct = ((CA_BOUNDS.maxLat - lat) / (CA_BOUNDS.maxLat - CA_BOUNDS.minLat)) * 100;
  return { xPct, yPct };
}

// The straight-line lat/lon projection lands close, but not pixel-perfect,
// against this specific outline's coastline. These are hand-corrected
// positions (checked against the rendered map) for the few campuses that
// needed a nudge — everyone else uses the raw projection.
const MANUAL_ADJUSTMENTS: Partial<Record<string, { xPct: number; yPct: number }>> = {
  UCM: { xPct: 32, yPct: 55 },
  UCSB: { xPct: 37, yPct: 77 },
  UCLA: { xPct: 56, yPct: 81 },
  UCSD: { xPct: 72, yPct: 95 },
  UCR: { xPct: 75, yPct: 90 },
  UCI: { xPct: 61, yPct: 84 },
};

// The pin label defaults to the campus's city, but reads better as the
// more recognizable name for a couple of campuses.
const LABEL_OVERRIDES: Partial<Record<string, string>> = {
  UCSD: "San Diego",
};

function CampusLogo({ campus }: { campus: Campus }) {
  const [errored, setErrored] = useState(false);
  return (
    <div className="w-9 h-9 shrink-0 rounded-full overflow-hidden border border-rule bg-surface flex items-center justify-center">
      {!errored ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/${campus.logo}`}
          alt=""
          className="w-full h-full object-cover"
          onError={() => setErrored(true)}
        />
      ) : (
        <span className="font-mono text-[9px] font-semibold text-brass">{campus.code}</span>
      )}
    </div>
  );
}

function Seal({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className="block rounded-full transition-all duration-200 shrink-0"
      style={{
        width: active ? 13 : 10,
        height: active ? 13 : 10,
        background: "radial-gradient(circle at 34% 30%, var(--gold) 0%, var(--brass) 75%)",
        boxShadow:
          "inset 0 1px 1px rgba(255,255,255,0.55), inset 0 -1px 2px rgba(0,0,0,0.4), 0 1px 3px rgba(10,20,40,0.35)",
        border: "1px solid rgba(0,0,0,0.15)",
      }}
    />
  );
}

export function CaliforniaMap({ campuses, hint }: { campuses: Campus[]; hint: string }) {
  const [hovered, setHovered] = useState<Campus | null>(null);

  const placed = campuses.map((c) => {
    const pos = MANUAL_ADJUSTMENTS[c.code] ?? project(c.lat, c.lon);
    return { campus: c, pos };
  });

  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <div
        className="relative border border-rule bg-surface px-6 pt-6 pb-7 md:px-10 md:pt-8 md:pb-9"
        style={{
          transform: "rotate(-0.35deg)",
          boxShadow: "0 20px 44px -26px rgba(8,16,32,0.4)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(0,0,0,0.035) 1px, transparent 1px)",
            backgroundSize: "5px 5px",
          }}
        />

        <div className="relative flex items-center justify-between mb-6 pb-3 border-b border-rule">
          <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-brass">
            Exhibit A — State Record
          </span>
          <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-faint">
            9 campuses
          </span>
        </div>

        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Map_of_California_outline.svg"
            alt="Outline of California"
            className="relative block w-full h-auto select-none"
            draggable={false}
          />

          {placed.map(({ campus: c, pos }, i) => {
            const isActive = hovered?.code === c.code;
            return (
              <motion.button
                key={c.code}
                type="button"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: [0.34, 1.56, 0.64, 1] }}
                onMouseEnter={() => setHovered(c)}
                onMouseLeave={() => setHovered((cur) => (cur?.code === c.code ? null : cur))}
                onFocus={() => setHovered(c)}
                onBlur={() => setHovered((cur) => (cur?.code === c.code ? null : cur))}
                style={{
                  position: "absolute",
                  left: `${pos.xPct}%`,
                  top: `${pos.yPct}%`,
                  transform: "translate(-50%, -50%)",
                }}
                className="flex items-center gap-1.5"
                aria-label={`${c.name} — view campus record`}
              >
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute rounded-full border border-brass opacity-40"
                    style={{ inset: -6 }}
                  />
                )}
                <Seal active={isActive} />
                <span className="font-sans not-italic font-medium text-[11px] text-ink whitespace-nowrap">
                  {LABEL_OVERRIDES[c.code] ?? c.city.replace(", California", "")}
                </span>
              </motion.button>
            );
          })}
        </div>

        <div className="relative mt-6 pt-3 border-t border-rule flex items-center justify-between">
          <span className="font-mono text-[10px] text-ink-faint">
            Fig. 1 — University of California campuses
          </span>
          <span className="font-mono text-[10px] text-ink-faint">{hint}</span>
        </div>

        <AnimatePresence>
          {hovered &&
            (() => {
              const p = placed.find((pl) => pl.campus.code === hovered.code)!;
              return (
                <motion.div
                  key={hovered.code}
                  initial={{ opacity: 0, scaleY: 0.2, y: -6 }}
                  animate={{ opacity: 1, scaleY: 1, y: 0 }}
                  exit={{ opacity: 0, scaleY: 0.2, y: -6 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: "absolute",
                    left: `${p.pos.xPct}%`,
                    top: `${p.pos.yPct}%`,
                    transformOrigin: "top left",
                  }}
                  className="ml-5 -translate-y-1/2 w-[220px] max-w-[62vw] border-l-2 border-brass bg-surface pl-4 pr-4 py-3.5 pointer-events-none z-10"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <CampusLogo campus={hovered} />
                    <div>
                      <div className="font-serif italic font-semibold text-[15px] text-ink leading-tight">
                        {hovered.name}
                      </div>
                      <div className="font-mono text-[10px] text-ink-faint">{hovered.city}</div>
                    </div>
                  </div>
                  <p className="text-[12px] leading-[1.6] text-ink-muted">{hovered.description}</p>
                </motion.div>
              );
            })()}
        </AnimatePresence>
      </div>
    </div>
  );
}
