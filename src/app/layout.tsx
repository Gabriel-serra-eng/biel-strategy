import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import { OG_IMAGE, SERVICOS, SITE_META, SITE_URL } from "@/data/site";
import { WhatsAppButton } from "@/components/sections/WhatsAppButton";
import { AttributionCapture } from "@/components/sections/lead-form/AttributionCapture";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_META.title,
  description: SITE_META.description,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: SITE_META.title,
    description: SITE_META.description,
    url: "/",
    siteName: "Biel Strategy",
    type: "website",
    locale: "pt_BR",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_META.title,
    description: SITE_META.description,
    images: [OG_IMAGE.url],
  },
};

// Dados reais e já confirmados do projeto — nenhum campo inventado (sem endereço, CNPJ,
// redes sociais ou avaliações, que o negócio ainda não tem validados).
// Serviços: mesma lista exibida na área /servicos (fonte única em src/data/site.ts).
const SERVICES = SERVICOS;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Biel Strategy",
      url: SITE_URL,
      inLanguage: "pt-BR",
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Biel Strategy",
      url: SITE_URL,
      logo: `${SITE_URL}/brand/eclipse-symbol-512.png`,
      description: SITE_META.description,
      email: "conecta@bielstrategy.com",
      telephone: "+5511920115354",
      areaServed: "BR",
      founder: {
        "@type": "Person",
        name: "Gabriel Serra",
        jobTitle: "Estrategista de marketing e aquisição de clientes",
      },
      knowsAbout: [
        "Marketing digital",
        "Estratégia de marketing",
        "Aquisição de clientes",
        "Tráfego pago",
        "Google Ads",
        "Meta Ads",
        "Geração de leads",
        "Landing pages",
        "Rastreamento e mensuração",
      ],
    },
    ...SERVICES.map((s) => ({
      "@type": "Service",
      "@id": `${SITE_URL}/#service-${s.slug}`,
      name: s.name,
      description: s.description,
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: "BR",
      inLanguage: "pt-BR",
    })),
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-scroll-behavior="smooth": o Next 16 só zera o scroll-behavior suave durante a troca de
    // rota com este atributo — sem ele, cada navegação entre áreas rolaria animada até o topo.
    <html lang="pt-BR" className={`${montserrat.variable} ${inter.variable}`} data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main">
          Pular para o conteúdo
        </a>
        {/* Antes de {children}: captura UTM/gclid na página de chegada, qualquer que seja a área. */}
        <AttributionCapture />
        {children}
        <WhatsAppButton />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
