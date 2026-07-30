"use client";

import { useEffect, useId, useRef } from "react";

export function PaperGrainField() {
  const filterId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const sheen = sheenRef.current;
    if (!wrap || !sheen) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetX = 50;
    let targetY = 50;
    let currentX = 50;
    let currentY = 50;
    let raf = 0;

    const handleMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const withinX = e.clientX >= rect.left && e.clientX <= rect.right;
      const withinY = e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (!withinX || !withinY) return;
      targetX = ((e.clientX - rect.left) / rect.width) * 100;
      targetY = ((e.clientY - rect.top) / rect.height) * 100;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.045;
      currentY += (targetY - currentY) * 0.045;
      sheen.style.setProperty("--mx", `${currentX}%`);
      sheen.style.setProperty("--my", `${currentY}%`);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <svg className="absolute w-0 h-0">
        <filter id={filterId}>
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0" />
        </filter>
      </svg>
      <div
        className="absolute inset-0"
        style={{ filter: `url(#${filterId})`, opacity: 0.24, mixBlendMode: "multiply" }}
      />
      <div
        ref={sheenRef}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle 420px at var(--mx, 50%) var(--my, 50%), rgba(242,224,170,0.4), transparent 70%)",
          mixBlendMode: "soft-light",
        }}
      />
    </div>
  );
}
