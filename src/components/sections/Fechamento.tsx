"use client";

import { Reveal, Pending, BrandMark } from "@/components/ui";
import { LeadForm } from "@/components/sections/lead-form/LeadForm";

export function Fechamento() {
  return (
    <section id="contato" data-screen-label="Fechamento" className="fim">
      <Reveal className="fim-inner">
        <p className="fim-kicker">A trajetória continua</p>
        <h2 className="fim-title">
          Quando existe intenção,
          <br />
          alguém precisa estar lá
          <br />
          <span className="ac">preparado.</span>
        </h2>
        <LeadForm />
        <div className="fim-meta">
          <div>
            <span>WhatsApp comercial</span>
            <Pending>VALIDAR</Pending>
          </div>
          <div>
            <span>E-mail profissional</span>
            <Pending>VALIDAR</Pending>
          </div>
          <div>
            <span>LinkedIn · GitHub</span>
            <Pending>VALIDAR</Pending>
          </div>
        </div>
      </Reveal>
      <div className="fim-foot">
        <span>
          <BrandMark iconSize={20} wordmarkSize={12} />
        </span>
        <span>Marketing de aquisição · Tecnologia · IA</span>
      </div>
    </section>
  );
}
