"use client";

import { Reveal } from "@/components/ui";
import { LeadForm } from "@/components/sections/lead-form/LeadForm";
import { LEAD_FORM_ENABLED, WHATSAPP_URL } from "@/data/site";

interface FechamentoProps {
  /** h1 quando a seção abre a área Contato. */
  titleAs?: "h1" | "h2";
}

/**
 * Contato: formulário + canais. O rodapé (marca, Security Status, Safe Browsing e Política de
 * Privacidade) saiu daqui para o SiteFooter, que aparece em todas as áreas do site.
 */
export function Fechamento({ titleAs: H = "h2" }: FechamentoProps) {
  return (
    <section id="contato" data-screen-label="Fechamento" className="fim">
      <Reveal className="fim-inner">
        <p className="fim-kicker">Próximo passo</p>
        <H className="fim-title">
          Quando existe intenção,
          <br />
          alguém precisa estar lá
          <br />
          <span className="ac">preparado.</span>
        </H>
        {LEAD_FORM_ENABLED ? (
          <LeadForm />
        ) : (
          // Formulário oculto (ver LEAD_FORM_ENABLED): o mesmo CTA de WhatsApp do resto do site
          // ocupa o lugar dele, para a área não ficar com um espaço vazio.
          <div className="fim-cta">
            <a className="btn btn-primary btn-lg" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              Agende sua reunião
            </a>
          </div>
        )}
        <div className="fim-meta">
          <div>
            <span>WhatsApp comercial</span>
            <a href="https://wa.me/5511920115354" target="_blank" rel="noopener noreferrer">
              +55 11 92011-5354
            </a>
          </div>
          <div>
            <span>E-mail profissional</span>
            <a href="mailto:conecta@bielstrategy.com">conecta@bielstrategy.com</a>
          </div>
          {/* LinkedIn · GitHub oculto a pedido — sem link real ainda validado. */}
          {/* E-mail anterior (angelicaisanuncios@gmail.com) mantido apenas em histórico/git — não exibido no site. */}
        </div>
      </Reveal>
    </section>
  );
}
