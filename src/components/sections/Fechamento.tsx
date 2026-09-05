"use client";

import { Reveal, Button, scrollToSection, Pending, Wordmark } from "@/components/ui";

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
        <div className="fim-cta">
          <Button variant="outline" size="lg" onClick={() => scrollToSection("contato")}>
            Vamos começar?
          </Button>
        </div>
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
          <Wordmark size={12} />
        </span>
        <span>Marketing de aquisição · Tecnologia · IA</span>
      </div>
    </section>
  );
}
