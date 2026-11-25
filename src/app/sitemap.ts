import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";

// Datas reais da última alteração de conteúdo de cada página (histórico do git) — não use
// new Date(): isso faria toda página parecer modificada a cada build. Atualize a data da página
// quando o conteúdo dela mudar de fato.
const LASTMOD_AREAS = "2026-11-11"; // site dividido em áreas: Home, Sobre, Serviços, Cases, Contato
const LASTMOD_PRIVACIDADE = "2026-09-16"; // último commit com mudança no texto da política

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: LASTMOD_AREAS, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/servicos`, lastModified: LASTMOD_AREAS, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/cases`, lastModified: LASTMOD_AREAS, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/sobre`, lastModified: LASTMOD_AREAS, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contato`, lastModified: LASTMOD_AREAS, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${SITE_URL}/politica-de-privacidade`,
      lastModified: LASTMOD_PRIVACIDADE,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
