"use client";

import { useEffect, type RefObject } from "react";
import { ensureGsap, prefersReducedMotion } from "@/lib/gsap";

/** Botão magnético: segue o cursor sutilmente (GPU-only transform), desativado em touch e reduced-motion. */
export function useMagnetic(ref: RefObject<HTMLElement | null>, strength = { x: 0.2, y: 0.35 }) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const { gsap } = ensureGsap();
    const setX = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const setY = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });

    function onMove(e: PointerEvent) {
      const r = el!.getBoundingClientRect();
      setX((e.clientX - r.left - r.width / 2) * strength.x);
      setY((e.clientY - r.top - r.height / 2) * strength.y);
    }
    function onLeave() {
      setX(0);
      setY(0);
    }
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [ref, strength.x, strength.y]);
}
