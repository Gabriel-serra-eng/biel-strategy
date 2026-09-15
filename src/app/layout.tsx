import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import { SITE_META } from "@/data/site";
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
  // metadataBase: definir quando o domínio de produção for validado (evita assumir uma URL não confirmada).
  title: SITE_META.title,
  description: SITE_META.description,
  openGraph: {
    title: SITE_META.title,
    description: SITE_META.description,
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/images/biel-retrato.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_META.title,
    description: SITE_META.description,
    images: ["/images/biel-retrato.webp"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Biel Strategy",
  description: SITE_META.description,
  areaServed: "BR",
  founder: {
    "@type": "Person",
    name: "Gabriel",
    jobTitle: "Estrategista de Aquisição & Soluções Digitais",
  },
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
