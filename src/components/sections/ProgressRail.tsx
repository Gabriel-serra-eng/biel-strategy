"use client";

import { useEffect, useRef } from "react";
import { CHAPTER_IDS } from "@/data/site";
import { ensureGsap, prefersReducedMotion } from "@/lib/gsap";

/** Indicador lateral de capítulo — substitui o IntersectionObserver do protótipo por ScrollTrigger. */
export function ProgressRail() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const { ScrollTrigger } = ensureGsap();
    const dots = Array.from(el.querySelectorAll("i"));
    const triggers = CHAPTER_IDS.map((id, i) => {
      const target = document.getElementById(id);
      if (!target) return null;
      return ScrollTrigger.create({
        trigger: target,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) dots.forEach((d, j) => d.classList.toggle("on", j === i));
        },
      });
    });
    return () => triggers.forEach((t) => t?.kill());
  }, []);

  return (
    <div className="prog" ref={ref} aria-hidden="true">
      {CHAPTER_IDS.map((id) => (
        <i key={id} />
      ))}
    </div>
  );
}
