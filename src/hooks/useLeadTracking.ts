"use client";

import { useEffect, useRef } from "react";
import type { Attribution } from "@/lib/leads/schema";

const STORAGE_KEY = "bs_lead_attribution";

const TRACKED_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
] as const;

function readStored(): Attribution | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

function writeStored(attribution: Attribution) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // localStorage indisponível (modo privado, quota etc.) — segue sem persistir;
    // a atribuição ainda funciona para o envio da mesma sessão via closure em memória.
  }
}

/**
 * Captura UTM/gclid/fbclid/landing_page/referrer na chegada ao site e
 * preserva até o envio do formulário — mesmo que a URL não contenha mais
 * os parâmetros depois de navegar pela página (SPA de seção única).
 *
 * Modelo "first-touch": o primeiro valor não vazio capturado é o que fica.
 * Uma visita de retorno sem UTM (ex.: digitou a URL direto) não apaga a
 * campanha que originalmente trouxe o visitante.
 */
export function useLeadTracking() {
  const attributionRef = useRef<Attribution>({});
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const stored = readStored();
    const params = new URLSearchParams(window.location.search);
    const next: Attribution = { ...stored };

    let changed = false;
    for (const key of TRACKED_PARAMS) {
      const value = params.get(key);
      if (value && !next[key]) {
        next[key] = value;
        changed = true;
      }
    }

    if (!next.landing_page) {
      next.landing_page = window.location.href;
      changed = true;
    }
    if (!next.referrer && document.referrer) {
      next.referrer = document.referrer;
      changed = true;
    }
    if (!next.first_contact_at) {
      next.first_contact_at = new Date().toISOString();
      changed = true;
    }

    attributionRef.current = next;
    if (changed) writeStored(next);
  }, []);

  function getAttribution(): Attribution {
    return attributionRef.current;
  }

  return { getAttribution };
}
