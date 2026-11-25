import Link from "next/link";
import { Reveal } from "@/components/ui";
import { CASOS, LEAD_FORM_ENABLED, WHATSAPP_URL } from "@/data/site";

// Texto do fechamento do case Landing Page — "Do clique ao lead." (fonte única em site.ts).
const CTA = CASOS.find((c) => c.eixo.startsWith("Landing Page"))?.cta;

/**
 * Faixa de chamada para contato — fim da Home, de Sobre e de Serviços.
 * `whatsapp`: CTA principal abre o WhatsApp comercial (mesmo link do botão flutuante) e o
 * formulário fica como alternativa; sem ele, o CTA leva à área Contato.
 */
export function CtaBand({ whatsapp = false }: { whatsapp?: boolean }) {
  if (!CTA) return null;
  return (
    <section className="sec cta-band" aria-labelledby="cta-band-title">
      <Reveal className="cta-band-inner">
        <p className="fim-kicker">Próximo passo</p>
        <h2 id="cta-band-title" className="fim-title">
          {CTA.titulo}
        </h2>
        <p className="fim-lede">
          {CTA.texto1} {CTA.texto2}
        </p>
        <div className="fim-cta cta-band-actions">
          {whatsapp ? (
            <>
              <a className="btn btn-primary btn-lg" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Agende sua reunião
              </a>
              {LEAD_FORM_ENABLED ? (
                <Link href="/contato" className="link-quiet">
                  Prefere o formulário? →
                </Link>
              ) : null}
            </>
          ) : (
            <Link href="/contato" className="btn btn-primary btn-lg">
              Agendar conversa estratégica
            </Link>
          )}
        </div>
      </Reveal>
    </section>
  );
}
