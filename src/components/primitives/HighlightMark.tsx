"use client";

import { motion } from "framer-motion";

// A single translucent stroke — retriggers every time it scrolls back into
// view, matching how the rest of this site's scroll reveals behave in both
// directions.
export function HighlightMark({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      <motion.span
        aria-hidden
        className="absolute left-0 w-full bg-gold pointer-events-none"
        style={{ top: "14%", height: "72%", opacity: 0.42, mixBlendMode: "multiply" }}
        initial={{ scaleX: 0, rotate: 0, transformOrigin: "left center" }}
        whileInView={{ scaleX: 1, rotate: -0.4, y: [0, -1, 0.5, 0] }}
        viewport={{ once: false, amount: 0.8 }}
        transition={{
          scaleX: { duration: 0.5, delay: 0.1, ease: [0.65, 0, 0.35, 1] },
          rotate: { duration: 0.5, delay: 0.1 },
          y: { duration: 0.5, delay: 0.1, ease: "easeInOut" },
        }}
      />
      {/* The marker tip — a brief accent at the leading edge, gone once the stroke settles */}
      <motion.span
        aria-hidden
        className="absolute top-[4%] h-[112%] w-[9px] bg-gold pointer-events-none"
        style={{ mixBlendMode: "multiply", clipPath: "polygon(0 12%, 100% 0, 100% 100%, 0 88%)" }}
        initial={{ left: "0%", opacity: 0 }}
        whileInView={{ left: "100%", opacity: [0, 0.95, 0.95, 0] }}
        viewport={{ once: false, amount: 0.8 }}
        transition={{
          left: { duration: 0.55, delay: 0.06, ease: [0.5, 0, 0.5, 1] },
          opacity: { duration: 0.55, delay: 0.06, times: [0, 0.2, 0.75, 1] },
        }}
      />
      <span className="relative z-10">{children}</span>
    </span>
  );
}
