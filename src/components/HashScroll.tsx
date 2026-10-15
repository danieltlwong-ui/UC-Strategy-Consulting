"use client";

import { useEffect } from "react";

// When the page is opened with a #hash (e.g. "← Back to pricing" from
// /payment), the browser's own jump happens before fonts and the scroll
// animations have settled, so it lands in the wrong place. Re-apply the jump
// a few times as the layout settles.
export function HashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;

    const jump = () => {
      const el = document.getElementById(id);
      if (!el) return;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "instant" });
    };

    jump();
    const timers = [150, 450, 900].map((ms) => window.setTimeout(jump, ms));
    document.fonts?.ready?.then(jump);
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  return null;
}
