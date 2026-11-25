"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LEGACY_HASH_ROUTES } from "@/data/site";

/**
 * Links da página única antiga (ex.: bielstrategy.com/#contato, já enviados ou usados em
 * anúncios) passam a abrir a área certa. Mantém a query string (UTM/gclid) no redirecionamento.
 */
export function LegacyHashRedirect() {
  const router = useRouter();
  useEffect(() => {
    const id = window.location.hash.slice(1);
    const to = id ? LEGACY_HASH_ROUTES[id] : undefined;
    if (!to || to === "/") return;
    const [path, hash] = to.split("#");
    router.replace(path + window.location.search + (hash ? "#" + hash : ""));
  }, [router]);
  return null;
}
