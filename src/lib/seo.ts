import type { Metadata } from "next";
import { OG_IMAGE } from "@/data/site";

/**
 * Metadata de cada área. O openGraph/twitter de uma página substitui por completo o do layout,
 * então os campos do site (siteName, locale, imagem) são repetidos aqui.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Biel Strategy",
      type: "website",
      locale: "pt_BR",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
