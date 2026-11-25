import { Fechamento } from "@/components/sections/Fechamento";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contato | Biel Strategy",
  description:
    "Agende uma conversa estratégica com a Biel Strategy: formulário de contato, WhatsApp comercial e e-mail profissional.",
  path: "/contato",
});

export default function ContatoPage() {
  return <Fechamento titleAs="h1" />;
}
