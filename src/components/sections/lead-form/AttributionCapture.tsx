"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/hooks/useLeadTracking";

/**
 * Captura a atribuição (UTM/gclid/fbclid/landing_page/referrer) logo na página de chegada.
 * Com o site dividido em áreas, o formulário só monta em /contato — e a navegação até lá
 * não carrega os parâmetros da URL original. Sem isso, um lead vindo de anúncio na Home
 * chegaria ao Supabase sem a campanha. Não renderiza nada.
 */
export function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
