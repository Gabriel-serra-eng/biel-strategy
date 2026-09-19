import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import { SITE_META, SITE_URL } from "@/data/site";
import { WhatsAppButton } from "@/components/sections/WhatsAppButton";
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
    images: [
      {
        url: "/images/biel-retrato.webp",
        width: 612,
        height: 912,
        alt: "Gabriel Serra, estrategista de marketing e aquisição de clientes — Biel Strategy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_META.title,
    description: SITE_META.description,
    images: ["/images/biel-retrato.webp"],
  },
};

// Dados reais e já confirmados do projeto — nenhum campo inventado (sem endereço, CNPJ,
// redes sociais ou avaliações, que o negócio ainda não tem validados).
// Serviços descritos como aparecem na página (seções Marketing, Cases e Execução).
const SERVICES = [
  {
    slug: "estrategia-de-marketing-digital",
    name: "Estratégia de marketing digital e aquisição de clientes",
    description:
      "Diagnóstico do negócio, definição de canais e mensagem, e estratégia de aquisição de clientes construída a partir do contexto de cada empresa.",
  },
  {
    slug: "trafego-pago",
    name: "Tráfego pago: Google Ads e Meta Ads",
    description:
      "Construção e gestão de campanhas de Google Ads e Meta Ads orientadas à geração de leads e conversas, com otimização contínua.",
  },
  {
    slug: "landing-pages",
    name: "Landing pages para conversão",
    description:
      "Landing pages e formulários sob medida, pensados desde a origem para receber tráfego pago e transformar visitas em leads.",
  },
  {
    slug: "rastreamento-e-mensuracao",
    name: "Rastreamento e mensuração",
    description:
      "Rastreamento de origem e conversão para orientar decisões de investimento com base em dados.",
  },
];

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
    <html lang="pt-BR" className={`${montserrat.variable} ${inter.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Pular para o conteúdo
        </a>
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
