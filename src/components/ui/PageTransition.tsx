"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

// Primeiro carregamento do site nesta aba já aconteceu? (estado do módulo, só no navegador)
let hydrated = false;

/**
 * Transição de entrada entre áreas. Só anima nas trocas de rota (navegação client-side):
 * no primeiro carregamento o conteúdo aparece direto, sem atrasar o LCP. useLayoutEffect
 * aplica a classe antes da pintura, então o conteúdo novo nunca pisca antes de animar.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (hydrated) ref.current?.classList.add("page-enter");
    hydrated = true;
  }, []);

  return <div ref={ref}>{children}</div>;
}
