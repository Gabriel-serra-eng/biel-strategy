"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_084718_72a17915-4964-4059-afcd-22d59399b72e.mp4";

/**
 * Fundo cinematográfico da Hero: vídeo em loop + véu de contraste + glow carmesim
 * pulsando lentamente (mais presente no centro, esmaecendo nas bordas). Puramente
 * decorativo — pausado sob prefers-reduced-motion.
 */
export function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (prefersReducedMotion()) {
      v.pause();
      return;
    }
    v.play().catch(() => {
      // autoplay pode ser bloqueado por política do navegador; o poster/frame estático basta.
    });
  }, []);

  return (
    <div className="hero-bg" aria-hidden="true">
      <video
        ref={videoRef}
        className="hero-bg-video"
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="hero-bg-scrim" />
      <div className="hero-bg-glow" />
    </div>
  );
}
