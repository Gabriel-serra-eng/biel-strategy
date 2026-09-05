const {Button,Quote,Card,MetricCard,PhaseStep,Wordmark,Tag}=window.BielStrategyDesignSystem_2981ad;

/* ── 01 HERO ─────────────────────────────────────────────── */
function Hero(){
  return (
    <section id="hero" data-screen-label="Hero" className="hero">
      <div className="hero-grid">
        <div className="hero-copy">
          <R className="hero-kicker"><Wordmark size={13}/><span className="hero-sep" aria-hidden="true"></span><span className="hero-role">Estrategista de Aquisição &amp; Soluções Digitais</span></R>
          <h1 className="hero-title">
            <R d={90} as="span" className="hl hl-1">Marketing<br/>que pensa<span className="ac">.</span></R>
            <R d={260} as="span" className="hl hl-2">Tecnologia que constrói<span className="ac">.</span></R>
            <R d={400} as="span" className="hl hl-3">IA que acelera<span className="ac">.</span></R>
          </h1>
          <R d={640} className="hero-cta">
            <Button variant="primary" size="lg">Iniciar conversa estratégica</Button>
            <a className="link-quiet" href="#jornada">Ver a trajetória ↓</a>
          </R>
          <R d={720} className="hero-note">Gabriel <Pending>VALIDAR sobrenome</Pending> · WhatsApp comercial <Pending>VALIDAR</Pending></R>
        </div>
        <div className="hero-portrait hero-portrait-in">
          <image-slot id="biel-retrato" shape="rounded" radius="4" placeholder="Retrato profissional — iluminação cinematográfica, fundo escuro"></image-slot>
          <span className="portrait-cap">Retrato oficial <Pending>A VALIDAR</Pending></span>
        </div>
      </div>
      <div className="hero-foot">
        <span className="axis axis-1">Marketing</span>
        <span className="axis axis-2">Tecnologia</span>
        <span className="axis axis-3">IA</span>
      </div>
    </section>
  );
}

/* ── 02 A JORNADA (quem é + trajetória, fundidas) ───────── */
const FASES=[
  {n:'01',t:'Base técnica',w:'ORIGEM',d:'Redes, protocolos e primeiros passos em Python — a lógica que depois leria tráfego, UTMs e tags de campanha.'},
  {n:'02',t:'Tráfego de intenção',w:'MARKETING',d:'Gestão de Google Ads para negócios locais. Diagnóstico: campanha boa falha quando a página não acompanha.'},
  {n:'03',t:'O gargalo',w:'VIRADA',d:'Templates lentos e formulários genéricos custavam clique pago. A resposta exigia engenharia própria.'},
  {n:'04',t:'Engenharia de conversão',w:'TECNOLOGIA',d:'React, Next.js e formulários multi-step sob medida — sem o atrito que derruba quem chega pelo anúncio.'},
  {n:'05',t:'Amplificação com IA',w:'IA',d:'LLMs entram para pontuar leads e acelerar prototipagem: Lead Radar e VYRO nascem daqui.'}
];

function Jornada(){
  const [ativa,setAtiva]=React.useState(0);
  const railRef=React.useRef(null);
  React.useEffect(()=>{
    const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)setAtiva(Number(e.target.dataset.i))})},{rootMargin:'-45% 0px -45% 0px'});
    document.querySelectorAll('.fase').forEach(e=>io.observe(e));
    return()=>io.disconnect();
  },[]);
  React.useEffect(()=>{
    if(railRef.current)railRef.current.style.setProperty('--rail-fill',((ativa/(FASES.length-1))*100)+'%');
  },[ativa]);
  return (
    <Section id="jornada" n="01" label="A jornada" weight="hero" className="sec-jornada">
      <div className="two-col traj-intro">
        <div><SectionTitle accent="que já sabia o que buscar." size="lg">Um estrategista</SectionTitle></div>
        <div className="col-body" style={{width:'312px',height:'325px'}}>
          <R d={80}><p className="lede"></p></R>
          <span>O mesmo profissional estrutura a mídia, escreve a página e automatiza a inteligência comercial — porque campanha, código e IA resolvem o mesmo problema: intenção que precisa virar contato.</span>
        </div>
      </div>
      <div className="traj">
        <aside className="traj-rail" aria-hidden="true">
          <div className="rail-inner" ref={railRef}>
            {FASES.map((f,i)=>(
              <div key={f.n} className={'rail-item'+(i===ativa?' on':'')}>
                <span className="rail-n">{f.n}</span>
                <span className="rail-line"></span>
                <span className="rail-w">{f.w}</span>
              </div>
            ))}
          </div>
        </aside>
        <div className="traj-flow">
          {FASES.map((f,i)=>(
            <article key={f.n} data-i={i} className={'fase'+(i===ativa?' fase-on':'')}>
              <header><span className="fase-n">{f.n}</span><span className="fase-w">{f.w}</span></header>
              <h3>{f.t}</h3>
              <p className="fase-ctx">{f.d}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── 03 MARKETING (protagonista, condensado) ─────────────── */
const COMPETENCIAS=['Google Ads · Search','Meta Ads','Funis de conversão','WhatsApp como canal','Copywriting & VSL','GA4 / GTM'];

function Marketing(){
  return (
    <Section id="marketing" n="02" label="Marketing · eixo protagonista" weight="hero" className="sec-mkt">
      <div className="mkt-open">
        <R><h2 className="mega">Estratégia antes da mídia.<br/>Dados antes da decisão.<br/><span className="ac">Otimização antes da escala.</span></h2></R>
      </div>
      <div className="funil">
        <R className="funil-head"><Kicker tone="accent">O funil</Kicker><h3>Aparecer. Atrair. <span className="ac">Converter.</span></h3></R>
        <R d={280} className="funil-flow">
          {['Busca','Anúncio','Clique','Contato','Oportunidade'].map((s,i)=>(
            <React.Fragment key={s}><span className="ff-step">{s}</span>{i<4?<span className="ff-arrow" aria-hidden="true">↓</span>:null}</React.Fragment>
          ))}
        </R>
      </div>
      <R d={120} className="met-quote"><Quote author="Tese fundamental — Biel Strategy">Os números não servem apenas para mostrar o que aconteceu. Servem para decidir o que fazer depois.</Quote></R>
      <R d={160} className="chips">
        <Kicker>Competências</Kicker>
        <div className="chips-row">{COMPETENCIAS.map(t=>(<span key={t} className="chip">{t}</span>))}</div>
      </R>
    </Section>
  );
}

Object.assign(window,{Hero,Jornada,Marketing});
