import type { Metadata } from "next";
import Link from "next/link";
import { Wordmark } from "@/components/ui/Wordmark";
import { CONSENT_VERSION } from "@/data/leadForm";

export const metadata: Metadata = {
  title: "Política de Privacidade | Biel Strategy",
  description:
    "Como o Biel Strategy coleta, usa e armazena os dados enviados pelo formulário de contato.",
  alternates: {
    canonical: "/politica-de-privacidade",
  },
};

export default function PoliticaDePrivacidadePage() {
  return (
    <main id="main">
      <section className="sec sec-hero">
        <Link href="/" className="nav-mark" aria-label="Biel Strategy — início">
          <Wordmark size={13} />
        </Link>
        <div className="legal-col" style={{ marginTop: 48 }}>
          <p className="kicker kicker-accent">Biel Strategy</p>
          <h1 className="sec-title sec-title-lg">
            Política de <span className="ac">Privacidade</span>
          </h1>
          <p className="legal-updated">
            Versão {CONSENT_VERSION} · esta é a versão referenciada pelo consentimento do
            formulário de contato.
          </p>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="legal-col">
          <div className="legal-notice">
            Esta política descreve exatamente os dados que este site coleta através do seu
            formulário de contato, para que finalidade, onde ficam armazenados e quais são os
            seus direitos sobre eles, nos termos da Lei Geral de Proteção de Dados (Lei nº
            13.709/2018 — LGPD).
          </div>

          <h2>1. Quem trata os seus dados</h2>
          <p>
            Os dados enviados pelo formulário de contato deste site são tratados por{" "}
            <strong>Gabriel Serra</strong>, atuando sob o nome comercial <strong>Biel Strategy</strong>,
            pessoa física sem CNPJ constituído até o momento. Para qualquer assunto relacionado a
            este tratamento de dados — dúvidas, correções, exclusão ou qualquer outra solicitação
            — o canal de contato é{" "}
            <a href="mailto:conecta@bielstrategy.com">conecta@bielstrategy.com</a>.
          </p>

          <h2>2. Quais dados coletamos</h2>
          <p>
            Apenas quando você preenche e envia o formulário de contato. Não há coleta antes ou
            fora desse envio, além do descrito na seção 4.
          </p>
          <p>
            <strong>Identificação (obrigatório para enviar o formulário):</strong>
          </p>
          <ul>
            <li>Nome</li>
            <li>E-mail</li>
            <li>Telefone / WhatsApp</li>
          </ul>
          <p>
            <strong>
              Sobre o seu negócio (opcional — usado para entender melhor sua necessidade antes da
              conversa):
            </strong>
          </p>
          <ul>
            <li>Empresa/marca, segmento, cidade/região, Instagram e site</li>
            <li>Principal desafio que você quer resolver</li>
            <li>Como você consegue clientes hoje e se já investe em marketing</li>
            <li>Se já tentou alguma estratégia de marketing sem sucesso, e o que aconteceu</li>
            <li>O que você gostaria de alcançar nos próximos meses (em suas próprias palavras)</li>
            <li>Quando pretende começar e a faixa de orçamento disponível</li>
            <li>Sua forma preferida de contato (WhatsApp, ligação ou e-mail)</li>
          </ul>
          <p>
            Nenhum desses campos de qualificação é obrigatório — o formulário pode ser enviado só
            com nome, telefone, e-mail e a autorização de contato.
          </p>

          <h2>3. Consentimento</h2>
          <p>
            O envio do formulário exige marcar, de forma explícita e não pré-selecionada, a
            autorização: <em>&quot;Autorizo o uso dos meus dados de contato para que a Biel
            Strategy entre em contato comercial comigo&quot;</em>. Guardamos junto com o seu
            registro a versão desta política aceita e o momento exato do aceite, para fins de
            comprovação.
          </p>

          <h2>4. Dados capturados automaticamente (origem do seu acesso)</h2>
          <p>
            Se você chegou ao site a partir de um link de campanha (por exemplo, um anúncio no
            Google ou no Meta/Instagram/Facebook), o site guarda automaticamente, no seu
            navegador, os parâmetros de rastreamento presentes no endereço da página — origem,
            meio e campanha (UTM) e identificadores de clique (<code>gclid</code>,{" "}
            <code>gbraid</code>, <code>wbraid</code> ou <code>fbclid</code>, conforme o caso) —
            além da página de chegada e de quem te encaminhou (referência).
          </p>
          <p>
            Isso é salvo localmente no seu navegador (<code>localStorage</code>, não em cookies) e
            só é enviado ao nosso banco de dados <strong>se e quando você enviar o formulário</strong> —
            servindo para entendermos qual campanha ou canal gerou aquele contato.
          </p>
          <p>
            <strong>
              Hoje esses identificadores não são reenviados ao Google Ads, ao Meta Ads (via Meta
              Conversions API) ou a qualquer outra plataforma de anúncios
            </strong>{" "}
            — ficam guardados apenas no nosso banco de dados. Se isso mudar no futuro, esta
            política será atualizada antes da mudança entrar em vigor.
          </p>

          <h2>5. Cookies e ferramentas de rastreamento</h2>
          <p>
            Este site <strong>não usa cookies de rastreamento</strong> e não tem nenhuma
            ferramenta de análise ou publicidade instalada — não há Google Analytics, Google Tag
            Manager nem Meta Pixel em funcionamento. A única informação salva no seu navegador é o
            rascunho do formulário (para você não perder o que já respondeu ao navegar entre as
            etapas) e os dados de campanha descritos na seção 4, ambos via{" "}
            <code>localStorage</code>, e nenhum dos dois é acessível a outros sites.
          </p>

          <h2>6. Onde os dados ficam armazenados</h2>
          <p>
            Os dados são armazenados em um banco de dados gerenciado (Supabase/PostgreSQL), cuja
            infraestrutura está hospedada nos Estados Unidos. Isso envolve uma transferência
            internacional de dados, sujeita às regras da LGPD aplicáveis a esse tipo de
            transferência.
          </p>
          <p>
            O acesso a esses dados é restrito: a chave pública usada pelo site só tem permissão
            técnica para <strong>criar</strong> um novo registro, nunca para ler, alterar ou
            apagar registros existentes — mesmo que essa chave seja exposta. Consultas, alterações
            de status e exclusões só são feitas diretamente por quem administra o banco.
          </p>

          <h2>7. Compartilhamento com terceiros</h2>
          <p>
            Hoje <strong>não compartilhamos seus dados com nenhum terceiro</strong>. Não há
            integração ativa com ferramentas de análise (Google Analytics), gerenciadores de tags
            (Google Tag Manager), pixels de redes sociais (Meta Pixel), APIs de conversão (Meta
            Conversions API), CRMs externos (incluindo o Libra) ou plataformas de automação
            (incluindo o Pluga). O site também não envia notificação automática por e-mail,
            WhatsApp ou qualquer outro serviço externo ao receber um formulário.
          </p>

          <h2>8. Segurança</h2>
          <p>
            Além da restrição de acesso descrita na seção 6, o formulário tem proteção automática
            contra envios automatizados/spam (um mecanismo invisível ao usuário humano, conhecido
            como honeypot) e um limite de tentativas de envio por período curto de tempo (rate
            limit), para reduzir abuso.
          </p>

          <h2>9. Por quanto tempo guardamos seus dados</h2>
          <p>
            Seus dados são mantidos pelo período necessário às finalidades informadas nesta
            política e ao cumprimento de obrigações legais aplicáveis. Depois disso, são
            eliminados ou anonimizados quando deixar de existir fundamento para sua conservação,
            conforme a LGPD.
          </p>

          <h2>10. Seus direitos</h2>
          <p>
            Nos termos da LGPD, você pode solicitar, a qualquer momento: confirmação de que
            tratamos seus dados, acesso a eles, correção de dados incompletos ou desatualizados,
            anonimização, bloqueio ou eliminação de dados desnecessários, portabilidade a outro
            fornecedor e a revogação do seu consentimento — o que inclui pedir a exclusão dos
            dados que você nos enviou.
          </p>
          <p>
            Para exercer qualquer um desses direitos, escreva para{" "}
            <a href="mailto:conecta@bielstrategy.com">conecta@bielstrategy.com</a>.
          </p>
          {/* E-mail anterior (angelicaisanuncios@gmail.com) mantido apenas em histórico/git — não exibido no site. */}

          <h2>11. Alterações desta política</h2>
          <p>
            Podemos atualizar este texto conforme o site evoluir. A versão vigente no momento do
            seu envio do formulário é registrada junto com o seu consentimento (seção 3), então
            você sempre pode saber exatamente qual versão você aceitou.
          </p>

          <Link className="link-quiet" href="/#contato" style={{ display: "inline-block", marginTop: 40 }}>
            ← Voltar para o site
          </Link>
        </div>
      </section>
    </main>
  );
}
