"use client";

import { useEffect, useRef } from "react";

type Dot = {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export function HeroField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let mouseX = -9999;
    let mouseY = -9999;
    let raf = 0;

    const SPACING = 40;
    const REPEL_RADIUS = 130;
    const REPEL_STRENGTH = 26;
    const SPRING = 0.06;
    const DAMPING = 0.82;

    let dots: Dot[] = [];

    const buildDots = () => {
      dots = [];
      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;
      for (let iy = 0; iy < rows; iy++) {
        for (let ix = 0; ix < cols; ix++) {
          const homeX = ix * SPACING;
          const homeY = iy * SPACING;
          dots.push({ homeX, homeY, x: homeX, y: homeY, vx: 0, vy: 0 });
        }
      }
    };

    const resize = () => {
      width = wrap.offsetWidth;
      height = wrap.offsetHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildDots();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const d of dots) {
        const dx = d.x - mouseX;
        const dy = d.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        if (dist < REPEL_RADIUS) {
          const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_STRENGTH;
          d.vx += (dx / dist) * force * 0.06;
          d.vy += (dy / dist) * force * 0.06;
        }

        d.vx += (d.homeX - d.x) * SPRING;
        d.vy += (d.homeY - d.y) * SPRING;
        d.vx *= DAMPING;
        d.vy *= DAMPING;
        d.x += d.vx;
        d.y += d.vy;

        const offset = Math.sqrt((d.x - d.homeX) ** 2 + (d.y - d.homeY) ** 2);
        const proximity = Math.max(0, 1 - dist / REPEL_RADIUS);
        const opacity = 0.25 + proximity * 0.45 + Math.min(offset / 30, 1) * 0.12;
        const radius = 1 + proximity * 1.6;

        const brass = [201, 162, 39];
        const steel = [111, 159, 212];
        const mix = proximity;
        const r = brass[0] + (steel[0] - brass[0]) * mix;
        const g = brass[1] + (steel[1] - brass[1]) * mix;
        const b = brass[2] + (steel[2] - brass[2]) * mix;

        ctx.beginPath();
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${Math.min(opacity, 0.95)})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.homeX, d.homeY, 1, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(201, 162, 39, 0.14)";
        ctx.fill();
      }
    };

    const handleMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const withinX = e.clientX >= rect.left && e.clientX <= rect.right;
      const withinY = e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (withinX && withinY) {
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      } else {
        mouseX = -9999;
        mouseY = -9999;
      }
    };

    resize();
    window.addEventListener("resize", resize);

    if (reduced) {
      drawStatic();
    } else {
      window.addEventListener("mousemove", handleMove);
      raf = requestAnimationFrame(draw);
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}
