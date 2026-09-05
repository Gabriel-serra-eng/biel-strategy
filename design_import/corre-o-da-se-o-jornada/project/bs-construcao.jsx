const {Button,Quote,Card,Callout,Badge,Tag,Stat}=window.BielStrategyDesignSystem_2981ad;

/* ── TECNOLOGIA (segundo eixo, compacto) ─────────────────── */
function Tecnologia(){
  return (
    <Section id="tecnologia" n="04" label="Tecnologia · segundo eixo">
      <div className="two-col">
        <div><SectionTitle accent="constrói a máquina.">Tecnologia</SectionTitle></div>
        <div className="col-body">
          <R d={80}><p className="lede">Página lenta e formulário genérico matam mídia paga. Por isso a mesma pessoa que estrutura a campanha também constrói a página — em React, sem atrito.</p></R>
          <R d={160} className="chips">
            <div className="chips-row">{['React & Next.js','TypeScript','Formulários multi-step','APIs & webhooks'].map(t=>(<span key={t} className="chip">{t}</span>))}</div>
          </R>
        </div>
      </div>
    </Section>
  );
}

/* ── IA (camada complementar, compacto) ─────────────────── */
function IA(){
  return (
    <Section id="ia" n="05" label="IA · camada complementar" className="sec-ia">
      <div className="two-col">
        <div><SectionTitle accent="amplia o que já existe.">A IA</SectionTitle></div>
        <div className="col-body">
          <R d={80}><p className="lede">Não é a profissão principal. LLMs pontuam a prontidão de leads antes do contato humano e aceleram a prototipagem de interface — uma camada sobre Marketing e Tecnologia, não acima deles.</p></R>
          <R d={160} className="chips">
            <div className="chips-row">{['Claude / Anthropic SDK','Google Gemini API','Ollama (local)'].map(t=>(<span key={t} className="chip">{t}</span>))}</div>
          </R>
        </div>
      </div>
    </Section>
  );
}

/* ── STACK (faixa compacta, sem numeração de capítulo) ──── */
const NIVEIS=[
  ['Marketing','Google Ads · Meta Ads · GA4 · GTM'],
  ['Build','React · TypeScript · APIs · Git'],
  ['AI','Claude · Gemini · Ollama'],
  ['Automação','Apps Script · Sheets · n8n'],
  ['Fundação','Redes · Linux · Python']
];
function StackStrip(){
  return (
    <div className="stack-strip">
      {NIVEIS.map(([t,d],i)=>(<R key={t} d={i*50} className="ss-item"><span className="ss-t">{t}</span><span className="ss-d">{d}</span></R>))}
    </div>
  );
}

/* ── SELECTED WORK ───────────────────────────────────────── */
const CASOS=[
  {eixo:'Marketing / Acquisition',t:'Studio Unna Nail Spa',sub:'Estética premium · Mandaqui, São Paulo',p:'Demanda e serviço prontos; faltava aparecer no momento exato da busca local.',a:'Google Ads de intenção, segmentação por bairro, funil busca → WhatsApp → agendamento, em ciclos de três meses.',r:'Planejador e gestor integral da estratégia. Números comerciais omitidos por governança.',nota:'Nome do cliente sujeito a aprovação — alternativa: "Studio de Beleza & Estética Premium (São Paulo)"'},
  {eixo:'Marketing / Conversão',t:'Máquina de aquisição para restaurantes',sub:'Modelo VSL + qualificação multi-etapas',p:'Restaurantes anunciam sem material forte ou contratam conteúdo sem distribuição.',a:'Landing page em formato VSL com qualificação em oito passos por cards, revelando o investimento só ao fim do filtro.',r:'Autor da arquitetura de aquisição, da copy e da lógica do funil.'},
  {eixo:'Technology / AI',t:'Lead Radar',sub:'Inteligência comercial B2B',p:'Listas frias genéricas geram abordagem sem contexto e rejeição acima de 95%.',a:'Varredura de sinais públicos e score transparente de Fit, Necessidade, Intenção e Timing antes do contato humano.',r:'Produto próprio. Fórmulas de pontuação e chaves permanecem internas.'}
];

function Casos(){
  const [ab,setAb]=React.useState(0);
  const c=CASOS[ab];
  return (
    <Section id="casos" n="03" label="Selected work" weight="hero">
      <div className="two-col traj-intro">
        <div><SectionTitle accent="e projetos construídos.">Casos de marketing</SectionTitle></div>
      </div>
      <R className="casos-nav" role="tablist">
        {CASOS.map((x,i)=>(
          <button key={x.t} role="tab" aria-selected={i===ab} className={'caso-tab'+(i===ab?' on':'')} onClick={()=>setAb(i)}>
            <span className="caso-tab-e">{x.eixo}</span><span className="caso-tab-t">{x.t}</span>
          </button>
        ))}
      </R>
      <div className="caso" key={c.t}>
        <div className="caso-main">
          <span className="caso-eixo">{c.eixo}</span>
          <h3>{c.t}</h3>
          <p className="caso-sub">{c.sub}</p>
          <div className="caso-block"><span className="caso-l">Problema</span><p>{c.p}</p></div>
          <div className="caso-block"><span className="caso-l">Abordagem</span><p>{c.a}</p></div>
          <div className="caso-block"><span className="caso-l">Participação</span><p>{c.r}</p></div>
          {c.nota?<Callout tone="left" title="Importante"><span>{c.nota}</span></Callout>:null}
        </div>
        <div className="caso-media">
          <image-slot id={'caso-'+ab} shape="rounded" radius="4" placeholder="Imagem do caso — foto escura, contrastada, foco fechado"></image-slot>
          <span className="portrait-cap"><Pending>IMAGEM A VALIDAR</Pending></span>
        </div>
      </div>
    </Section>
  );
}

/* ── CREDENTIALS (formação + certificações, compacto) ───── */
const CERTS=['Google Ads Search / GA4','IA & Data Science (Coursera/IBM)','Automação & Suporte de TI','Networking (Cisco)','Azure Fundamentals'];

function Formacao(){
  return (
    <Section id="formacao" n="06" label="Credentials">
      <div className="two-col">
        <div><SectionTitle accent="e credenciais selecionadas.">Formação</SectionTitle></div>
        <div className="col-body">
          <R d={80} className="grad"><h4>Graduação em andamento</h4><p>Curso e instituição <Pending>VALIDAR</Pending></p></R>
          <R d={140}>
            <Kicker tone="accent" style={{marginTop:'8px'}}>Certificações selecionadas</Kicker>
            <div className="chips-row">{CERTS.map(t=>(<span key={t} className="chip chip-sm">{t}</span>))}</div>
            <a className="link-quiet cred-more" href="#formacao">Ver credenciais →</a>
          </R>
        </div>
      </div>
    </Section>
  );
}

/* ── CURRENTLY BUILDING ─────────────────────────────────── */
function Visao(){
  return (
    <Section id="visao" n="07" label="Currently building" className="sec-visao">
      <div className="two-col">
        <div><SectionTitle accent="continua sendo construída.">A operação</SectionTitle></div>
      </div>
      <div className="visao-grid">
        {[['VYRO Site Factory','Motor de prototipagem visual acelerada — hoje em ampliação.'],['Lead Radar','Consolidação dos scores explicáveis de prontidão comercial.'],['Automação de operação','n8n e Apps Script unindo captura, qualificação e relatório.'],['Convergência','Marketing lidera. Tecnologia constrói. IA acelera. Em um só ponto de responsabilidade.']].map(([t,d],i)=>(
          <R key={t} d={i*70} className="vc"><h4>{t}</h4><p>{d}</p></R>
        ))}
      </div>
    </Section>
  );
}

/* ── FECHAMENTO ──────────────────────────────────────────── */
function Fechamento(){
  return (
    <section id="contato" data-screen-label="Fechamento" className="fim">
      <R className="fim-inner">
        <p className="fim-kicker">A trajetória continua</p>
        <h2 className="fim-title">Quando existe intenção,<br/>alguém precisa estar lá<br/><span className="ac">preparado.</span></h2>
        <div className="fim-cta">
          <Button variant="outline" size="lg">Vamos começar?</Button>
        </div>
        <div className="fim-meta">
          <div><span>WhatsApp comercial</span><Pending>VALIDAR</Pending></div>
          <div><span>E-mail profissional</span><Pending>VALIDAR</Pending></div>
          <div><span>LinkedIn · GitHub</span><Pending>VALIDAR</Pending></div>
        </div>
      </R>
      <div className="fim-foot">
        <span>BIEL<span className="ac">STRATEGY</span></span>
        <span>Marketing de aquisição · Tecnologia · IA</span>
      </div>
    </section>
  );
}

Object.assign(window,{Tecnologia,IA,StackStrip,Casos,Formacao,Visao,Fechamento});
