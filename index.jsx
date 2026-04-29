import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, BarChart2, RefreshCw, Target, Video, MapPin, Instagram, ChevronDown, Menu, X } from "lucide-react";

const BRAND = {
  red: "#C8372D",
  redDark: "#A02820",
  black: "#0D0D0D",
  cream: "#F5F0E4",
  creamDark: "#EDE8D6",
  gold: "#C9A84C",
  gray: "#888",
};

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;500;600&family=Barlow+Condensed:wght@700;800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: ${BRAND.black}; color: ${BRAND.cream}; font-family: 'Barlow', sans-serif; }

  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; justify-content: space-between; align-items: center; padding: 1.2rem 3rem; background: rgba(13,13,13,0.92); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(245,240,228,0.06); transition: all 0.3s; }
  .nav-logo { font-family: 'Bebas Neue', sans-serif; font-size: 1.6rem; letter-spacing: 0.2em; color: ${BRAND.cream}; text-decoration: none; }
  .nav-logo span { color: ${BRAND.red}; }
  .nav-links { display: flex; gap: 2.5rem; list-style: none; }
  .nav-links a { color: rgba(245,240,228,0.6); text-decoration: none; font-size: 0.82rem; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 500; transition: color 0.2s; }
  .nav-links a:hover { color: ${BRAND.cream}; }
  .nav-cta { background: ${BRAND.red}; color: #fff; border: none; padding: 0.6rem 1.4rem; font-family: 'Barlow', sans-serif; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: background 0.2s; text-decoration: none; }
  .nav-cta:hover { background: ${BRAND.redDark}; }

  .hero { min-height: 100vh; display: flex; flex-direction: column; justify-content: flex-end; padding: 7rem 3rem 4rem; position: relative; overflow: hidden; }
  .hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 70% 40%, rgba(200,55,45,0.12) 0%, transparent 60%); pointer-events: none; }
  .hero-line { width: 3px; height: 80px; background: ${BRAND.red}; margin-bottom: 2rem; }
  .hero-eyebrow { font-size: 0.75rem; letter-spacing: 0.3em; text-transform: uppercase; color: ${BRAND.red}; font-weight: 600; margin-bottom: 1.2rem; }
  .hero-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(4rem, 10vw, 9rem); line-height: 0.92; letter-spacing: 0.02em; color: ${BRAND.cream}; max-width: 900px; margin-bottom: 2rem; }
  .hero-title span { color: ${BRAND.red}; }
  .hero-sub { font-size: 1.05rem; font-weight: 300; color: rgba(245,240,228,0.65); max-width: 500px; line-height: 1.7; margin-bottom: 3rem; }
  .hero-actions { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; }
  .btn-primary { background: ${BRAND.red}; color: #fff; padding: 1rem 2.2rem; font-family: 'Barlow', sans-serif; font-size: 0.85rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border: none; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s; text-decoration: none; }
  .btn-primary:hover { background: ${BRAND.redDark}; transform: translateY(-1px); }
  .btn-ghost { background: transparent; color: ${BRAND.cream}; padding: 1rem 2rem; font-family: 'Barlow', sans-serif; font-size: 0.85rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; border: 1px solid rgba(245,240,228,0.25); cursor: pointer; transition: all 0.2s; text-decoration: none; }
  .btn-ghost:hover { border-color: ${BRAND.cream}; }
  .hero-scroll { position: absolute; right: 3rem; bottom: 4rem; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; color: rgba(245,240,228,0.35); font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; }
  .hero-meta { position: absolute; top: 50%; right: 3rem; transform: translateY(-50%); display: flex; flex-direction: column; gap: 2rem; }
  .hero-stat { text-align: right; }
  .hero-stat-num { font-family: 'Bebas Neue', sans-serif; font-size: 2.8rem; color: ${BRAND.cream}; line-height: 1; }
  .hero-stat-num span { color: ${BRAND.red}; }
  .hero-stat-label { font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(245,240,228,0.4); }

  .section { padding: 7rem 3rem; }
  .section-inner { max-width: 1200px; margin: 0 auto; }
  .section-tag { font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase; color: ${BRAND.red}; font-weight: 600; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.6rem; }
  .section-tag::before { content: ''; display: block; width: 24px; height: 1px; background: ${BRAND.red}; }
  .section-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.5rem, 5vw, 4.5rem); line-height: 0.95; color: ${BRAND.cream}; margin-bottom: 1.5rem; }
  .section-title span { color: ${BRAND.red}; }

  .sobre-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
  .sobre-photo { width: 100%; aspect-ratio: 3/4; background: #1a1a1a; position: relative; overflow: hidden; }
  .sobre-photo-inner { width: 100%; height: 100%; background: linear-gradient(135deg, #1a1212 0%, #2a1818 50%, #1a1212 100%); display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 0.5rem; }
  .sobre-photo-label { font-size: 0.7rem; letter-spacing: 0.3em; color: rgba(245,240,228,0.3); text-transform: uppercase; }
  .sobre-photo-accent { position: absolute; bottom: 0; left: 0; right: 0; height: 4px; background: ${BRAND.red}; }
  .sobre-content { padding-top: 1rem; }
  .sobre-text { font-size: 1rem; font-weight: 300; color: rgba(245,240,228,0.7); line-height: 1.85; margin-bottom: 2rem; }
  .sobre-goals { display: flex; flex-direction: column; gap: 1.2rem; margin-top: 2.5rem; }
  .goal-item { display: flex; gap: 1.2rem; align-items: flex-start; padding: 1.2rem; border: 1px solid rgba(245,240,228,0.08); background: rgba(245,240,228,0.02); }
  .goal-num { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; color: ${BRAND.red}; line-height: 1; min-width: 2.5rem; }
  .goal-text { }
  .goal-title { font-size: 0.78rem; letter-spacing: 0.15em; text-transform: uppercase; color: ${BRAND.cream}; font-weight: 600; margin-bottom: 0.3rem; }
  .goal-desc { font-size: 0.88rem; color: rgba(245,240,228,0.5); line-height: 1.6; font-weight: 300; }

  .pilares-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(245,240,228,0.08); margin-top: 4rem; }
  .pilar-card { background: ${BRAND.black}; padding: 2.5rem 2rem; transition: background 0.25s; cursor: default; position: relative; }
  .pilar-card:hover { background: #161616; }
  .pilar-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: ${BRAND.red}; transform: scaleX(0); transform-origin: left; transition: transform 0.3s; }
  .pilar-card:hover::after { transform: scaleX(1); }
  .pilar-icon { color: ${BRAND.red}; margin-bottom: 1.5rem; }
  .pilar-title { font-family: 'Barlow Condensed', sans-serif; font-size: 1.3rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: ${BRAND.cream}; margin-bottom: 0.8rem; }
  .pilar-text { font-size: 0.88rem; color: rgba(245,240,228,0.5); line-height: 1.7; font-weight: 300; }

  .servicos-bg { background: ${BRAND.cream}; }
  .servicos-bg .section-tag { color: ${BRAND.red}; }
  .servicos-bg .section-tag::before { background: ${BRAND.red}; }
  .servicos-bg .section-title { color: ${BRAND.black}; }
  .servicos-intro { font-size: 1rem; color: rgba(13,13,13,0.55); font-weight: 300; max-width: 550px; line-height: 1.75; margin-bottom: 4rem; }
  .servicos-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .servico-card { background: #fff; border: 1px solid rgba(13,13,13,0.08); padding: 2.5rem 2rem; position: relative; transition: transform 0.2s, box-shadow 0.2s; }
  .servico-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(13,13,13,0.1); }
  .servico-card.featured { border-top: 3px solid ${BRAND.red}; }
  .servico-badge { display: inline-block; background: ${BRAND.red}; color: #fff; font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; padding: 0.3rem 0.7rem; margin-bottom: 1.5rem; font-weight: 600; }
  .servico-icon { color: ${BRAND.red}; margin-bottom: 1.2rem; }
  .servico-name { font-family: 'Bebas Neue', sans-serif; font-size: 1.8rem; letter-spacing: 0.05em; color: ${BRAND.black}; margin-bottom: 0.4rem; }
  .servico-price { display: flex; align-items: baseline; gap: 0.3rem; margin-bottom: 1.5rem; }
  .servico-price-val { font-family: 'Bebas Neue', sans-serif; font-size: 2.8rem; color: ${BRAND.red}; line-height: 1; }
  .servico-price-period { font-size: 0.78rem; color: rgba(13,13,13,0.4); letter-spacing: 0.1em; text-transform: uppercase; }
  .servico-divider { width: 100%; height: 1px; background: rgba(13,13,13,0.08); margin: 1.2rem 0; }
  .servico-features { list-style: none; display: flex; flex-direction: column; gap: 0.7rem; }
  .servico-features li { display: flex; align-items: flex-start; gap: 0.6rem; font-size: 0.84rem; color: rgba(13,13,13,0.65); line-height: 1.5; font-weight: 400; }
  .servico-features li::before { content: ''; display: block; width: 4px; height: 4px; border-radius: 50%; background: ${BRAND.red}; margin-top: 0.45rem; flex-shrink: 0; }
  .servico-disclaimer { margin-top: 1.2rem; padding: 0.9rem; background: rgba(13,13,13,0.04); font-size: 0.76rem; color: rgba(13,13,13,0.45); line-height: 1.6; font-style: italic; }

  .exp-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 5rem; align-items: start; margin-top: 4rem; }
  .exp-sidebar { }
  .exp-sidebar-text { font-size: 0.9rem; color: rgba(245,240,228,0.5); line-height: 1.75; font-weight: 300; }
  .exp-timeline { display: flex; flex-direction: column; position: relative; }
  .exp-timeline::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 1px; background: rgba(245,240,228,0.08); }
  .exp-item { padding: 0 0 3rem 2.5rem; position: relative; }
  .exp-item::before { content: ''; position: absolute; left: -4px; top: 0.35rem; width: 9px; height: 9px; border-radius: 50%; background: ${BRAND.red}; }
  .exp-company { font-family: 'Barlow Condensed', sans-serif; font-size: 1.2rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: ${BRAND.cream}; margin-bottom: 0.3rem; }
  .exp-role { font-size: 0.82rem; color: ${BRAND.red}; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600; margin-bottom: 0.6rem; }
  .exp-desc { font-size: 0.88rem; color: rgba(245,240,228,0.5); line-height: 1.7; font-weight: 300; }

  .cta-section { background: ${BRAND.red}; padding: 7rem 3rem; text-align: center; position: relative; overflow: hidden; }
  .cta-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 70% 80% at 50% 50%, rgba(0,0,0,0.15) 0%, transparent 70%); }
  .cta-eyebrow { font-size: 0.75rem; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(255,255,255,0.6); font-weight: 600; margin-bottom: 1.5rem; }
  .cta-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(3rem, 7vw, 6.5rem); line-height: 0.9; color: #fff; margin-bottom: 1.5rem; position: relative; z-index: 1; }
  .cta-sub { font-size: 1rem; color: rgba(255,255,255,0.7); max-width: 480px; margin: 0 auto 3rem; line-height: 1.7; font-weight: 300; position: relative; z-index: 1; }
  .btn-white { background: #fff; color: ${BRAND.red}; padding: 1rem 2.4rem; font-family: 'Barlow', sans-serif; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 0.5rem; transition: all 0.2s; text-decoration: none; position: relative; z-index: 1; }
  .btn-white:hover { background: ${BRAND.cream}; transform: translateY(-2px); }

  .footer { background: #060606; padding: 3rem; border-top: 1px solid rgba(245,240,228,0.05); display: flex; justify-content: space-between; align-items: center; gap: 2rem; flex-wrap: wrap; }
  .footer-logo { font-family: 'Bebas Neue', sans-serif; font-size: 1.4rem; letter-spacing: 0.2em; color: ${BRAND.cream}; }
  .footer-logo span { color: ${BRAND.red}; }
  .footer-copy { font-size: 0.78rem; color: rgba(245,240,228,0.25); letter-spacing: 0.05em; }

  @media (max-width: 900px) {
    .nav { padding: 1.2rem 1.5rem; }
    .nav-links { display: none; }
    .hero { padding: 7rem 1.5rem 4rem; }
    .hero-meta { display: none; }
    .section { padding: 5rem 1.5rem; }
    .sobre-grid { grid-template-columns: 1fr; gap: 2.5rem; }
    .sobre-photo { aspect-ratio: 4/3; }
    .pilares-grid { grid-template-columns: 1fr; }
    .servicos-cards { grid-template-columns: 1fr; }
    .exp-grid { grid-template-columns: 1fr; gap: 2.5rem; }
    .cta-section { padding: 5rem 1.5rem; }
    .footer { padding: 2rem 1.5rem; flex-direction: column; align-items: flex-start; gap: 1rem; }
  }
`;

export default function VincereLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <style>{style}</style>

      {/* NAV */}
      <nav className="nav" style={scrolled ? { padding: "0.9rem 3rem" } : {}}>
        <a className="nav-logo" href="#hero">VINCE<span>RE</span></a>
        <ul className="nav-links">
          {[["Sobre", "sobre"], ["Estratégia", "pilares"], ["Serviços", "servicos"], ["Experiência", "experiencia"]].map(([l, id]) => (
            <li key={id}><a href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id); }}>{l}</a></li>
          ))}
        </ul>
        <a className="nav-cta" href="#cta" onClick={(e) => { e.preventDefault(); scrollTo("cta"); }}>Contato</a>
      </nav>

      {/* HERO */}
      <section id="hero" className="hero">
        <div className="hero-bg" />
        <div className="hero-meta">
          <div className="hero-stat">
            <div className="hero-stat-num">3<span>+</span></div>
            <div className="hero-stat-label">Clientes Ativos</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">10<span>↑</span></div>
            <div className="hero-stat-label">Meta 2026</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">5<span>Y</span></div>
            <div className="hero-stat-label">Visão EUA</div>
          </div>
        </div>
        <div className="hero-line" />
        <p className="hero-eyebrow">Marketing Digital · Estratégia · Resultados</p>
        <h1 className="hero-title">
          Onde a<br />
          Estratégia<br />
          <span>Encontra</span><br />
          a Execução.
        </h1>
        <p className="hero-sub">
          Transformando ideias em resultados reais — marketing prático e crescimento digital para pequenas e médias empresas.
        </p>
        <div className="hero-actions">
          <a className="btn-primary" href="#servicos" onClick={(e) => { e.preventDefault(); scrollTo("servicos"); }}>
            Ver Serviços <ArrowUpRight size={16} />
          </a>
          <a className="btn-ghost" href="#sobre" onClick={(e) => { e.preventDefault(); scrollTo("sobre"); }}>
            Conheça a Vincere
          </a>
        </div>
        <div className="hero-scroll">
          <ChevronDown size={14} style={{ animation: "bounce 1.5s infinite" }} />
          <span>Scroll</span>
        </div>
        <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(4px)} }`}</style>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="section">
        <div className="section-inner">
          <div className="sobre-grid">
            <div>
              <div className="sobre-photo">
                <div className="sobre-photo-inner">
                  <div className="sobre-photo-label">Foto Profissional</div>
                  <div className="sobre-photo-label" style={{ fontSize: "0.6rem", opacity: 0.5 }}>tom sépia / iluminação artística</div>
                </div>
                <div className="sobre-photo-accent" />
              </div>
            </div>
            <div className="sobre-content">
              <p className="section-tag">Sobre Vinicius Ferreira</p>
              <h2 className="section-title">Visão &<br /><span>Missão</span></h2>
              <p className="sobre-text">
                Sou Vinicius Ferreira, fundador da Vincere. Minha jornada profissional combina vendas, liderança e empreendedorismo — construindo uma base sólida que influencia diretamente meu trabalho criativo e pensamento estratégico.
              </p>
              <p className="sobre-text">
                Aqui, estratégia não é guessing. É direção, consistência e resultados mensuráveis. Construo planos estruturados que conectam ações offline e digitais, garantindo que cada movimento tenha um propósito claro.
              </p>
              <div className="sobre-goals">
                <div className="goal-item">
                  <div className="goal-num">01</div>
                  <div className="goal-text">
                    <div className="goal-title">Missão</div>
                    <div className="goal-desc">Criar impacto real ajudando negócios a crescerem através de marketing estratégico, consistente e orientado a resultados.</div>
                  </div>
                </div>
                <div className="goal-item">
                  <div className="goal-num">02</div>
                  <div className="goal-text">
                    <div className="goal-title">Meta 2026</div>
                    <div className="goal-desc">Fechar com 10 clientes sólidos, construir experiência prática e reinvestir em equipamentos de alta performance (câmera e drone).</div>
                  </div>
                </div>
                <div className="goal-item">
                  <div className="goal-num">03</div>
                  <div className="goal-text">
                    <div className="goal-title">Visão de Longo Prazo</div>
                    <div className="goal-desc">Transformar a Vincere em uma marca poderosa com presença sólida no mercado norte-americano nos próximos 5 anos.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PILARES */}
      <section id="pilares" className="section" style={{ paddingTop: "2rem", paddingBottom: "7rem" }}>
        <div className="section-inner">
          <p className="section-tag">Pilares Estratégicos</p>
          <h2 className="section-title">Como Trabalho<br /><span>por Você</span></h2>
          <div className="pilares-grid">
            <div className="pilar-card">
              <div className="pilar-icon"><BarChart2 size={28} /></div>
              <div className="pilar-title">Analytics & Relatórios</div>
              <p className="pilar-text">O que não é medido não pode ser melhorado. Acompanho performance, analiso dados e transformo números em insights — para que cada estratégia evolua com base em resultados reais.</p>
            </div>
            <div className="pilar-card">
              <div className="pilar-icon"><RefreshCw size={28} /></div>
              <div className="pilar-title">Adaptação & Evolução</div>
              <p className="pilar-text">Mercados mudam — e estratégias precisam acompanhar. Adapto e refino continuamente as ações para manter o negócio relevante, competitivo e sempre em evolução.</p>
            </div>
            <div className="pilar-card">
              <div className="pilar-icon"><Target size={28} /></div>
              <div className="pilar-title">Metas & Objetivos</div>
              <p className="pilar-text">Metas claras geram progresso real. Defino alvos mensuráveis que guiam cada ação, garantindo que o crescimento seja planejado e executado com precisão cirúrgica.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="section servicos-bg">
        <div className="section-inner">
          <p className="section-tag">Serviços & Preços</p>
          <h2 className="section-title">O que posso fazer<br /><span>pelo seu negócio?</span></h2>
          <p className="servicos-intro">
            Trago ideias à vida — do conceito inicial à execução completa. Serviços focados em entregar resultados de alta qualidade dedicando meu tempo e expertise criativa ao seu projeto.
          </p>
          <div className="servicos-cards">

            {/* VIDEO EDITING */}
            <div className="servico-card">
              <div className="servico-icon"><Video size={24} /></div>
              <div className="servico-name">Edição de Vídeo</div>
              <div className="servico-price">
                <div className="servico-price-val">US$100</div>
                <div className="servico-price-period">/ vídeo</div>
              </div>
              <div className="servico-divider" />
              <ul className="servico-features">
                <li>Recebimento de footage bruto via Google Drive</li>
                <li>Edição baseada nos seus objetivos e referências</li>
                <li>Legendas, cortes, efeitos e sound design</li>
                <li>Formatos otimizados para redes sociais e ads</li>
                <li>Revisões rápidas baseadas no seu feedback</li>
              </ul>
            </div>

            {/* SOCIAL MEDIA */}
            <div className="servico-card featured">
              <span className="servico-badge">Mais Popular</span>
              <div className="servico-icon"><Instagram size={24} /></div>
              <div className="servico-name">Social Media</div>
              <div className="servico-price">
                <div className="servico-price-val">US$250</div>
                <div className="servico-price-period">/ mês</div>
              </div>
              <div className="servico-divider" />
              <ul className="servico-features">
                <li>10 posts mensais completos</li>
                <li>2 Reels (vídeos curtos / virais)</li>
                <li>2 Carrosséis (educativos / storytelling)</li>
                <li>2 Posts estáticos (branding, ofertas, anúncios)</li>
                <li>1 Orientação de Stories (estratégia diária)</li>
                <li>Identidade visual para consistência do feed</li>
              </ul>
              <div className="servico-disclaimer">
                ⚠ Reels exigem gravação pelo cliente. Forneço direção criativa, roteiro e edição completa. Oriento sobre ângulos, iluminação e enquadramento.
              </div>
            </div>

            {/* GOOGLE MAPS */}
            <div className="servico-card">
              <div className="servico-icon"><MapPin size={24} /></div>
              <div className="servico-name">Google Maps</div>
              <div className="servico-price">
                <div className="servico-price-val">US$25</div>
                <div className="servico-price-period">/ mês</div>
              </div>
              <div className="servico-divider" />
              <ul className="servico-features">
                <li>Otimização completa do perfil</li>
                <li>Fotos e vídeos para enriquecer o visual</li>
                <li>Conteúdo estratégico para atrair clientes</li>
                <li>Análise competitiva local</li>
                <li>Estratégias para gerar mais avaliações</li>
                <li>Atualizações mensais e respostas a reviews</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* EXPERIÊNCIA */}
      <section id="experiencia" className="section">
        <div className="section-inner">
          <p className="section-tag">Trajetória Profissional</p>
          <h2 className="section-title">Minha<br /><span>Experiência</span></h2>
          <div className="exp-grid">
            <div className="exp-sidebar">
              <p className="exp-sidebar-text">
                Minha trajetória profissional combina vendas, liderança e empreendedorismo — uma base sólida que influencia diretamente meu trabalho criativo e pensamento estratégico na Vincere.
              </p>
            </div>
            <div className="exp-timeline">
              {[
                { company: "Vivo S.A", role: "Consultor → Gestão", desc: "Avancei de Consultor para Gestão, desenvolvendo habilidades sólidas em vendas, liderança e estratégia de performance." },
                { company: "Kings Sneakers", role: "Gerente de Loja", desc: "Gerente focado em liderança de equipe, crescimento em vendas e excelência na experiência do cliente no varejo de streetwear." },
                { company: "Ultranet", role: "SDR – Sales Dev. Rep.", desc: "Trabalhei como SDR, especializando em geração de leads, qualificação de prospects e criação de oportunidades de vendas." },
                { company: "Autônomo", role: "Fundador · Multi-negócios", desc: "Construí múltiplos pequenos negócios, adquirindo experiência prática em vendas, branding e operações do zero." },
              ].map((exp) => (
                <div className="exp-item" key={exp.company}>
                  <div className="exp-company">{exp.company}</div>
                  <div className="exp-role">{exp.role}</div>
                  <div className="exp-desc">{exp.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="cta-section">
        <div className="cta-bg" />
        <p className="cta-eyebrow">Pronto para crescer?</p>
        <h2 className="cta-title">Vamos Trabalhar<br />Juntos!</h2>
        <p className="cta-sub">
          Marketing não é despesa — é o motor que move seu negócio para frente. Vamos criar algo consistente, escalável e impactante.
        </p>
        <a
          className="btn-white"
          href="https://wa.me/5512000000000?text=Olá!%20Vi%20o%20portfólio%20da%20Vincere%20e%20gostaria%20de%20conversar."
          target="_blank"
          rel="noopener noreferrer"
        >
          Falar no WhatsApp <ArrowUpRight size={16} />
        </a>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">VINCE<span>RE</span></div>
        <div className="footer-copy">© 2026 Vincere · Vinicius Ferreira · Vale do Paraíba & Litoral Norte SP</div>
        <div className="footer-copy">Marketing Digital · Estratégia · Resultados</div>
      </footer>
    </>
  );
}
