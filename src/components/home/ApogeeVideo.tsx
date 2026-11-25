"use client";

import { useEffect, useRef } from "react";

// Vídeo de fundo da referência Motion/Apogee (nebulosa). Recolorido para a paleta da marca via
// CSS (filtro em .apg-video) — o arquivo original não é alterado nem copiado para o projeto.
const SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260813_092641_de52eb87-daf2-41db-92cb-7a56eae012a5.mp4";

/**
 * Fundo em vídeo, o mais leve possível:
 * - só começa a baixar quando a seção se aproxima da tela (está abaixo da dobra);
 * - não carrega em prefers-reduced-motion nem com "economia de dados" (fica o gradiente);
 * - pausa fora da tela e volta a tocar quando reaparece;
 * - aparece com fade quando o primeiro quadro está pronto.
 */
export function ApogeeVideo() {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;

    v.muted = true; // necessário para autoplay (o atributo muted não vem no HTML do servidor)
    const onPlaying = () => v.classList.add("on");
    v.addEventListener("playing", onPlaying);
    const play = () => v.play().catch(() => {});

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Não reatribui o src: reatribuir reinicia o carregamento e aborta o play() em andamento.
          if (v.getAttribute("src") !== SRC) {
            v.preload = "auto";
            v.src = SRC;
          }
          play();
        } else {
          v.pause();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(v);

    return () => {
      io.disconnect();
      v.removeEventListener("playing", onPlaying);
      v.pause();
    };
  }, []);

  return <video ref={ref} className="apg-video" muted loop playsInline preload="none" aria-hidden="true" />;
}
