"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

type Stamp = { id: number; x: number; y: number; rotate: number };

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [stamps, setStamps] = useState<Stamp[]>([]);
  const stampId = useRef(0);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 400, damping: 32, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 400, damping: 32, mass: 0.4 });

  useEffect(() => {
    const canHover = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduced) return;

    setEnabled(true);
    document.documentElement.setAttribute("data-cursor", "custom");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a, button, [data-cursor-hover]");
      setHovering(!!target);
      setLabel(target?.getAttribute("data-cursor-label") ?? null);
    };

    const click = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a, button");
      if (!target) return;
      stampId.current += 1;
      const id = stampId.current;
      setStamps((prev) => [
        ...prev,
        { id, x: e.clientX, y: e.clientY, rotate: Math.random() * 16 - 8 },
      ]);
      window.setTimeout(() => {
        setStamps((prev) => prev.filter((s) => s.id !== id));
      }, 750);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("click", click);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("click", click);
      document.documentElement.removeAttribute("data-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full border border-brass flex items-center justify-center"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: label ? 64 : hovering ? 40 : 16,
          height: label ? 64 : hovering ? 40 : 16,
          backgroundColor: hovering ? "var(--ground)" : "rgba(201,162,39,0)",
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {label && (
          <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-brass whitespace-nowrap">
            {label}
          </span>
        )}
      </motion.div>
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-brass"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: hovering ? 0 : 3, height: hovering ? 0 : 3, opacity: hovering ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />

      <AnimatePresence>
        {stamps.map((s) => (
          <motion.div
            key={s.id}
            aria-hidden
            className="fixed top-0 left-0 z-[9998] pointer-events-none"
            style={{ left: s.x, top: s.y, translateX: "-50%", translateY: "-50%" }}
            initial={{ scale: 0.5, opacity: 0.9, rotate: s.rotate }}
            animate={{ scale: 1.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
              <circle cx="26" cy="26" r="24" stroke="var(--brass)" strokeWidth="1.2" />
              <circle cx="26" cy="26" r="18" stroke="var(--brass)" strokeWidth="0.8" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}
