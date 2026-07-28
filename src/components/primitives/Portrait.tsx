"use client";

import { useState } from "react";

export function Portrait({
  initials,
  name,
  portraitFile,
}: {
  initials: string;
  name: string;
  portraitFile: string;
}) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className="relative aspect-[4/5] w-full border border-rule flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, var(--brass-rule) 0px, var(--brass-rule) 1px, transparent 1px, transparent 14px)",
        }}
        role="img"
        aria-label={`Portrait placeholder for ${name}`}
      >
        <span className="font-serif italic font-semibold text-6xl text-ink-faint select-none">
          {initials}
        </span>
        <span className="absolute bottom-0 left-0 right-0 border-t border-rule bg-surface/90 px-3 py-2 font-mono text-[10px] tracking-[0.06em] uppercase text-ink-faint">
          Portrait on file · replace {portraitFile}
        </span>
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/5] w-full border border-rule overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/${portraitFile}`}
        alt={name}
        className="w-full h-full object-cover"
        style={{ filter: "grayscale(0.15) contrast(1.04)" }}
        onError={() => setErrored(true)}
      />
    </div>
  );
}
