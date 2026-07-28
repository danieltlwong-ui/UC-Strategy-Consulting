"use client";

import { useState } from "react";
import { brand, nav } from "@/data/content";

export function Nav() {
  const [logoError, setLogoError] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-ground/90 border-b border-rule">
      <div className="mx-auto max-w-[1180px] px-5 md:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 no-underline">
          {!logoError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`/${brand.logoFile}`}
              alt={brand.name}
              className="h-7 w-auto"
              onError={() => setLogoError(true)}
            />
          ) : (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-gold" aria-hidden />
              <span className="font-mono text-[12px] tracking-[0.1em] uppercase text-ink">
                {brand.name}
              </span>
            </>
          )}
        </a>
        <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] tracking-[0.08em] uppercase text-ink-muted hover:text-steel transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#diagnostic"
          className="font-mono text-[11px] tracking-[0.08em] uppercase text-ground bg-gold px-4 py-2 border border-gold hover:bg-transparent hover:text-gold transition-colors duration-200"
        >
          Free session →
        </a>
      </div>
    </header>
  );
}
