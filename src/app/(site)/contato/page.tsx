import { Fechamento } from "@/components/sections/Fechamento";
import { pageMetadata } from "@/lib/seo";
import { LEAD_FORM_ENABLED } from "@/data/site";

export const metadata = pageMetadata({
  title: "Contato | Biel Strategy",
  // A descrição só cita o formulário quando ele está visível (LEAD_FORM_ENABLED).
  description: LEAD_FORM_ENABLED
    ? "Agende uma conversa estratégica com a Biel Strategy: formulário de contato, WhatsApp comercial e e-mail profissional."
    : "Agende uma conversa estratégica com a Biel Strategy pelo WhatsApp comercial ou pelo e-mail profissional.",
  path: "/contato",
});

export default function ContatoPage() {
  return <Fechamento titleAs="h1" />;
}
