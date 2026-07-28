"use client";

import { motion } from "framer-motion";

type Direction = "up" | "left" | "right" | "down";

const offsets: Record<Direction, { x?: number; y?: number; rotate?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: -64, rotate: -1.5 },
  right: { x: 64, rotate: 1.5 },
};

export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
  direction = "up",
  distance,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
  direction?: Direction;
  distance?: "sm" | "lg";
}) {
  const Component = motion[as];
  const base = offsets[direction];
  const scale = distance === "lg" ? 1.6 : distance === "sm" ? 0.5 : 1;
  const initial = {
    opacity: 0,
    x: base.x ? base.x * scale : 0,
    y: base.y ? base.y * scale : 0,
    rotate: base.rotate ?? 0,
  };

  return (
    <Component
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
      viewport={{ once: false, amount: 0.3, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
