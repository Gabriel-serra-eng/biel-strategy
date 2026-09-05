"use client";

import { useEffect, useRef, type ElementType, type ReactNode, type CSSProperties } from "react";
import { ensureGsap, prefersReducedMotion } from "@/lib/gsap";

interface RevealProps {
  as?: ElementType;
  d?: number;
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
  [key: string]: unknown;
}

/**
 * Reveal genérico (equivalente ao `.rv`/`useReveal` do protótipo), mas orquestrado por
 * GSAP ScrollTrigger em vez de um IntersectionObserver manual — mesma transição CSS
 * (opacity + translateY, GPU-only), disparo único ao entrar na viewport.
 */
export function Reveal({ as: As = "div", d = 0, className = "", children, style, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.classList.add("rv-on");
      return;
    }
    const { ScrollTrigger } = ensureGsap();
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => el.classList.add("rv-on"),
    });
    return () => trigger.kill();
  }, []);

  return (
    <As
      ref={ref}
      className={("rv " + className).trim()}
      style={{ transitionDelay: `${d}ms`, ...style }}
      {...rest}
    >
      {children}
    </As>
  );
}
