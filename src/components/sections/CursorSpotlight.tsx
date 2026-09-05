"use client";

import { useEffect } from "react";

const SELECTOR = ".chip,.caso-tab,.nivel-item,.vc,.ia-tool";

/** Spotlight sutil que segue o cursor sobre chips/cards — leve, sem necessidade de GSAP. */
export function CursorSpotlight() {
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    function onMove(e: PointerEvent) {
      const t = (e.target as HTMLElement)?.closest?.(SELECTOR) as HTMLElement | null;
      if (!t) return;
      const r = t.getBoundingClientRect();
      t.style.setProperty("--mx", e.clientX - r.left + "px");
      t.style.setProperty("--my", e.clientY - r.top + "px");
    }
    document.addEventListener("pointermove", onMove);
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  return null;
}
