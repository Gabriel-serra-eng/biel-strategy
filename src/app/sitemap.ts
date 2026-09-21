import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";

// Datas reais da última alteração de conteúdo de cada página (histórico do git) — não use
// new Date(): isso faria toda página parecer modificada a cada build. Atualize a data da página
// quando o conteúdo dela mudar de fato.
const LASTMOD_HOME = "2026-09-21"; // link "Política de Privacidade" adicionado ao rodapé
const LASTMOD_PRIVACIDADE = "2026-09-16"; // último commit com mudança no texto da política

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: LASTMOD_HOME,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/politica-de-privacidade`,
      lastModified: LASTMOD_PRIVACIDADE,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
