const DS = window.BielStrategyDesignSystem_2981ad;

function useReveal(){
  React.useEffect(()=>{
    const els=document.querySelectorAll('.rv:not(.rv-on)');
    if(!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('rv-on'));return}
    const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('rv-on');io.unobserve(e.target)}})},{rootMargin:'0px 0px -12% 0px',threshold:.12});
    els.forEach(e=>io.observe(e));
    return()=>io.disconnect();
  });
}

function R({d=0,as='div',className='',children,...rest}){
  return React.createElement(as,{className:('rv '+className).trim(),style:{transitionDelay:d+'ms',animationDelay:d+'ms',...(rest.style||{})},...rest},children);
}

function Kicker({children,tone='muted',...rest}){
  return <div className={'kicker '+(tone==='accent'?'kicker-accent':'')} {...rest}>{children}</div>;
}

/* Título de seção: caixa alta, última palavra em carmesim, régua 64×2 */
function SectionTitle({children,accent,size='lg',rule=true,id}){
  return (
    <div className="sec-title-wrap">
      <h2 id={id} className={'sec-title sec-title-'+size}>{children}{accent?<><br/><span className="ac">{accent}</span></>:null}</h2>
      {rule?<span className="rule" aria-hidden="true"></span>:null}
    </div>
  );
}

function ChapterMark({n,label}){
  return <div className="chapmark"><span className="chapmark-n">{n}</span><span className="chapmark-l">{label}</span></div>;
}

function Section({id,label,n,children,className='',weight='normal',screen}){
  return (
    <section id={id} data-screen-label={screen||label} className={'sec sec-'+weight+' '+className}>
      {n?<R className="sec-head"><ChapterMark n={n} label={label}/></R>:null}
      {children}
    </section>
  );
}

/* Nível de evidência — vocabulário do Research, nunca inventado */
function Evidence({level}){
  const map={pratica:['EXPERIÊNCIA PRÁTICA','accent'],dominio:['DOMÍNIO PRÁTICO','accent'],estudo:['ESTUDO','neutral'],teoria:['CONHECIMENTO TEÓRICO','neutral'],base:['CONHECIMENTO BÁSICO','neutral'],exp:['EXPERIMENTAÇÃO','neutral'],utiliza:['UTILIZA','accent'],estudando:['ESTUDANDO / PRÁTICO','neutral']};
  const [txt,tone]=map[level]||[level,'neutral'];
  return <span className={'ev '+(tone==='accent'?'ev-ac':'')}>{txt}</span>;
}

function Pending({children='CONTEÚDO A VALIDAR'}){
  return <span className="pending">[{children}]</span>;
}

Object.assign(window,{DS,useReveal,R,Kicker,SectionTitle,ChapterMark,Section,Evidence,Pending});
