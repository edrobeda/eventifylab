import { useState, useEffect, useRef } from 'react'

const W = 'wrap'
const MONO = 'font-mono text-xs uppercase tracking-[.06em]'
const LIME = 'text-[#84b026]'

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.style.animation = 'reveal-up .8s cubic-bezier(.2,.7,.2,1) forwards'; io.disconnect() } },
      { threshold: 0.1 }
    )
    el.style.opacity = '0'
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

function Reveal({ children, className = '' }) {
  const ref = useReveal()
  return <div ref={ref} className={className} style={{ opacity: 0 }}>{children}</div>
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div style={{ fontFamily: 'var(--sans)', background: 'var(--bg)', color: 'var(--fg)' }}>

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 60, background: 'rgba(15,22,34,.86)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--line)' }}>
        <div className={W} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70 }}>
          <a href="/" style={{ fontWeight: 700, fontSize: 20, letterSpacing: '-.01em', display: 'flex', alignItems: 'center', gap: 9 }}>
            <span style={{ width: 12, height: 12, background: 'var(--lime)', display: 'inline-block' }} />
            EVENTIFY LAB
          </a>

          {/* desktop links */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }} className="hidden md:flex">
            <NavLink href="#solucoes">Soluções</NavLink>
            <NavLink href="#jornada">Jornada</NavLink>
            <NavLink href="#planos">Planos</NavLink>
            <NavLink href="/login">Login</NavLink>
            <a href="#contato" style={{ border: '1px solid var(--lime)', color: 'var(--lime)', fontFamily: 'var(--mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '.05em', padding: '9px 14px', transition: '.25s', whiteSpace: 'nowrap' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--lime)'; e.currentTarget.style.color = 'var(--navy)' }}
              onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = 'var(--lime)' }}>
              Gamificar stand ↗
            </a>
          </div>

          {/* mobile toggle */}
          <button className="md:hidden" onClick={() => setMenuOpen(o => !o)} style={{ background: 'none', border: 'none', color: 'var(--fg)', fontSize: 22, cursor: 'pointer' }}>☰</button>
        </div>

        {menuOpen && (
          <div style={{ borderTop: '1px solid var(--line)', padding: '16px 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[['#solucoes', 'Soluções'], ['#jornada', 'Jornada'], ['#planos', 'Planos'], ['/login', 'Login']].map(([h, l]) => (
              <a key={h} href={h} onClick={() => setMenuOpen(false)} style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '.05em', padding: '8px 0' }}>{l}</a>
            ))}
            <a href="#contato" onClick={() => setMenuOpen(false)} style={{ background: 'var(--lime)', color: 'var(--navy)', fontWeight: 700, textAlign: 'center', padding: '12px', fontFamily: 'var(--mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '.05em', marginTop: 8 }}>
              Gamificar stand ↗
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <header style={{ borderBottom: '1px solid var(--line)' }}>
        <div className={W}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', padding: '14px 0', borderBottom: '1px solid var(--line)', fontFamily: 'var(--mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '.06em' }}>
            <span>Experiências interativas &amp; gamificação</span>
            <span className="hidden sm:block">Para stands de feira</span>
          </div>

          <h1 style={{ fontWeight: 500, fontSize: 'clamp(42px,8vw,124px)', lineHeight: .92, letterSpacing: '-.03em', padding: '50px 0 34px' }}>
            GAMIFICAÇÃO<br />
            <span style={{ WebkitTextStroke: '1.4px var(--fg)', color: 'transparent' }}>PARA O SEU</span>{' '}
            <span style={{ color: 'var(--lime)' }}>STAND.</span>
          </h1>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 40, borderTop: '1px solid var(--line)', padding: '34px 0 48px', alignItems: 'end' }}>
            <p style={{ fontSize: 19, color: '#c4ccd6', maxWidth: 540 }}>
              Pontuação, rankings e recompensas aplicados ao seu stand — mais visitantes, mais engajamento e leads qualificados a cada partida.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              <BtnFill href="#contato">Gamificar stand ↗</BtnFill>
              <BtnLine href="#planos">Ver planos</BtnLine>
            </div>
          </div>
        </div>

        <div style={{ height: 'clamp(280px,40vw,460px)', borderTop: '1px solid var(--line)', position: 'relative', overflow: 'hidden', background: 'repeating-linear-gradient(135deg,rgba(255,255,255,.05) 0 2px,transparent 2px 12px), linear-gradient(120deg,#1d2840,#217373)', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: 22 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '.06em', color: 'rgba(255,255,255,.55)' }}>[ imagem — participante no totem ]</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '.06em', color: 'rgba(255,255,255,.55)' }}>1320×460</span>
        </div>
      </header>

      {/* TICKER */}
      <div style={{ background: 'var(--lime)', color: 'var(--navy)', overflow: 'hidden', padding: '12px 0', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', gap: 48, whiteSpace: 'nowrap', animation: 'ticker-slide 26s linear infinite', fontFamily: 'var(--mono)', fontSize: 13, textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 700 }}>
          {[1, 2].map(i => (
            <span key={i}>Cadastro ✦ Quiz ✦ Roleta de prêmios ✦ Jogo da memória ✦ Raspadinha ✦ Pesquisa de opinião ✦&nbsp;</span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section style={{ borderBottom: '1px solid var(--line)' }}>
        <div className={W}>
          <Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderTop: '1px solid var(--line)' }}>
              {[
                ['Mais visitantes', 'o jogo atrai gente'],
                ['Engajamento orgânico', 'param, jogam, voltam'],
                ['Captação de leads', 'dados a cada partida'],
                ['Conhecimento do produto', 'o quiz ensina'],
              ].map(([big, sub], i) => (
                <div key={i} style={{ borderRight: i < 3 ? '1px solid var(--line)' : 'none', padding: '40px 26px' }}>
                  <div style={{ fontWeight: 500, fontSize: 'clamp(17px,2vw,26px)', letterSpacing: '-.02em', lineHeight: 1.05 }}>
                    {big.split(' ').map((w, j, arr) =>
                      j === arr.length - 1
                        ? <span key={j} style={{ color: 'var(--lime)' }}>{w}</span>
                        : <span key={j}>{w} </span>
                    )}
                  </div>
                  <p style={{ color: 'var(--muted)', fontSize: 13.5, marginTop: 12, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '.04em' }}>{sub}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section id="solucoes" style={{ borderBottom: '1px solid var(--line)' }}>
        <div className={W}>
          <Reveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', color: 'var(--muted)', borderBottom: '1px solid var(--line)', fontFamily: 'var(--mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '.06em' }}>
              <span>[ 01 ] Soluções</span><span>04 objetivos</span>
            </div>
            <h2 style={{ fontWeight: 500, fontSize: 'clamp(30px,4.4vw,56px)', lineHeight: 1.02, letterSpacing: '-.02em', padding: '48px 0 12px', maxWidth: '18ch' }}>
              Uma experiência, quatro objetivos de marketing e comercial.
            </h2>
          </Reveal>
          <Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)' }}>
              {[
                ['/01', 'Ativação de marca', 'Faça o público viver a mensagem, em vez de só ouvi-la.'],
                ['/02', 'Geração de leads qualificados', 'Dados captados com perguntas-chave para o comercial achar os leads mais quentes.'],
                ['/03', 'Distribuição de brindes', 'Mecânicas de prêmios que organizam quem ganha, o quê e quando — sem filas.'],
                ['/04', 'Pesquisas de opinião', 'Coleta opiniões de um jeito leve e não invasivo.'],
              ].map(([n, title, desc], i) => (
                <SvcCard key={i} n={n} title={title} desc={desc} isRight={i % 2 === 0} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* JOURNEY */}
      <section id="jornada" style={{ borderBottom: '1px solid var(--line)' }}>
        <div className={W}>
          <Reveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', color: 'var(--muted)', borderBottom: '1px solid var(--line)', fontFamily: 'var(--mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '.06em' }}>
              <span>[ 02 ] A jornada</span><span>celular / totem</span>
            </div>
            <h2 style={{ fontWeight: 500, fontSize: 'clamp(30px,4.4vw,56px)', lineHeight: 1.02, letterSpacing: '-.02em', padding: '48px 0 12px', maxWidth: '18ch' }}>
              Do cadastro ao prêmio, em poucos toques.
            </h2>
          </Reveal>
          <Reveal>
            {[
              ['01', 'Cadastro', 'Pelo celular (QR Code/link) ou pelo totem. Coletamos os dados que importam para marketing e comercial.'],
              ['02', 'Quiz', 'Perguntas sobre a marca e os produtos. Educa o público e mede o nível dos leads.'],
              ['03', 'Roleta', 'Sorteio de brindes integrado ao fluxo, distribuído de forma organizada e divertida.'],
            ].map(([n, title, desc]) => (
              <ProcRow key={n} n={n} title={title} desc={desc} />
            ))}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '30px 0 6px' }}>
              {['Jogo da memória', 'Raspadinha', 'Pesquisa de opinião', 'Painel de registro de leads', 'Controle de entrega de prêmios'].map(c => (
                <span key={c} style={{ fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--muted)', border: '1px solid var(--line)', padding: '8px 13px' }}>{c}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PLANS */}
      <section id="planos" style={{ borderBottom: '1px solid var(--line)' }}>
        <div className={W}>
          <Reveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', color: 'var(--muted)', borderBottom: '1px solid var(--line)', fontFamily: 'var(--mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '.06em' }}>
              <span>[ 03 ] Planos</span><span>03 níveis</span>
            </div>
          </Reveal>
          <Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
              <PlanCard
                name="Flash"
                tagline="Pronto para ativar — rápido e econômico."
                price="R$3.250"
                period="/evento"
                items={['Cadastro + Quiz + Roleta', 'Estrutura pronta', 'Visual white label', 'Configuração rápida']}
                ideal="Orçamento reduzido / ativação imediata"
                isRight
              />
              <PlanCard
                name="Studio"
                badge="Mais escolhido"
                tagline="Equilíbrio entre custo e personalização."
                price="R$5.980"
                period="/evento"
                items={['Módulos prontos, à sua escolha', 'Fluxo adaptável', 'Identidade visual da marca', 'Entrega rápida']}
                ideal="Ações promocionais / captação em feira"
                featured
                isRight
              />
              <PlanCard
                name="Signature"
                tagline="Experiência 100% sob medida."
                price="R$9.200"
                period="a partir de"
                items={['Desenvolvimento personalizado', 'Mecânicas exclusivas, fluxo livre', 'UX/UI sob medida', 'Integração com ativação de marca']}
                ideal="Grandes lançamentos / ativações premium"
              />
            </div>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--muted)', padding: '22px 0 4px', textAlign: 'center' }}>
              Todos incluem treinamento da equipe e suporte durante o evento
            </p>
          </Reveal>
        </div>
      </section>

      {/* ETAPAS */}
      <section style={{ borderBottom: '1px solid var(--line)' }}>
        <div className={W}>
          <Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)' }}>
              {[
                ['[ Antes do evento ]', 'Planejamento', 'Entendemos o objetivo, definimos a solução e aplicamos a identidade da marca. Configuramos as mecânicas (quiz, prêmios, chances) e treinamos a equipe na plataforma.'],
                ['[ Durante o evento ]', 'Operação & dados', 'Suporte técnico no dia para uma experiência fluida. Ao final, relatórios com leads gerados, desempenho no quiz e brindes distribuídos.'],
              ].map(([lab, h3, p], i) => (
                <div key={i} style={{ borderRight: i === 0 ? '1px solid var(--line)' : 'none', borderTop: '1px solid var(--line)', padding: '40px 30px' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--lime)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 16 }}>{lab}</div>
                  <h3 style={{ fontWeight: 600, fontSize: 24, marginBottom: 12 }}>{h3}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: 15 }}>{p}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* QUOTE */}
      <section style={{ borderBottom: '1px solid var(--line)' }}>
        <div className={W}>
          <Reveal>
            <blockquote style={{ fontWeight: 500, fontSize: 'clamp(28px,4.2vw,52px)', lineHeight: 1.1, letterSpacing: '-.02em', padding: '60px 0 24px', maxWidth: '22ch' }}>
              "Em vez de só ouvir a mensagem, o visitante{' '}
              <span style={{ color: 'var(--lime)' }}>joga</span> a mensagem."
            </blockquote>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.05em', paddingBottom: 60 }}>
              — Eventify Lab / Experiências interativas &amp; gamificação
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section id="contato">
        <div className={W}>
          <Reveal>
            <div style={{ padding: '96px 0', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--lime)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 22 }}>[ Vamos conversar ]</p>
              <h2 style={{ fontWeight: 500, fontSize: 'clamp(34px,5.4vw,76px)', letterSpacing: '-.03em', lineHeight: .98, marginBottom: 36 }}>
                VAI EXPOR EM<br />
                UMA <span style={{ WebkitTextStroke: '1.4px var(--fg)', color: 'transparent' }}>FEIRA?</span>
              </h2>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="mailto:divulgacao@eventifylab.com.br"
                  style={{ fontFamily: 'var(--mono)', fontSize: 13, textTransform: 'uppercase', letterSpacing: '.05em', padding: '15px 24px', display: 'inline-flex', gap: 10, alignItems: 'center', background: 'var(--lime)', color: 'var(--navy)', border: '1px solid var(--lime)', fontWeight: 700, transition: '.25s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--fg)'; e.currentTarget.style.borderColor = 'var(--fg)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--lime)'; e.currentTarget.style.borderColor = 'var(--lime)' }}>
                  Gamificar meu stand ↗
                </a>
                <a href="https://wa.me/5519981442580?text=Gostaria de mais informacoes sobre EventifyLab."
                  style={{ fontFamily: 'var(--mono)', fontSize: 13, textTransform: 'uppercase', letterSpacing: '.05em', padding: '15px 24px', display: 'inline-flex', gap: 10, alignItems: 'center', border: '1px solid var(--line)', transition: '.25s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--fg)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line)'}>
                  WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '54px 0 40px', borderTop: '1px solid var(--line)' }}>
        <div className={W}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 30, flexWrap: 'wrap' }}>
            <a href="/" style={{ fontWeight: 700, fontSize: 20, display: 'flex', alignItems: 'center', gap: 9 }}>
              <span style={{ width: 12, height: 12, background: 'var(--lime)', display: 'inline-block' }} />
              EVENTIFY LAB
            </a>
            <FootCol title="Soluções" links={[['#solucoes', 'Ativação de marca'], ['#solucoes', 'Geração de leads'], ['#solucoes', 'Brindes & pesquisas']]} />
            <FootCol title="Planos" links={[['#planos', 'Flash'], ['#planos', 'Studio'], ['#planos', 'Signature']]} />
            <FootCol title="Contato" links={[['mailto:divulgacao@eventifylab.com.br', 'divulgacao@eventifylab.com.br'], ['https://wa.me/5519981442580', 'WhatsApp'], ['#', 'LinkedIn']]} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 46, paddingTop: 22, borderTop: '1px solid var(--line)', fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--muted)', flexWrap: 'wrap', gap: 8 }}>
            <span>© 2026 EVENTIFY LAB</span>
            <span>EXPERIÊNCIAS INTERATIVAS &amp; GAMIFICAÇÃO</span>
          </div>
        </div>
      </footer>

    </div>
  )
}

function NavLink({ href, children }) {
  return (
    <a href={href} style={{ fontFamily: 'var(--mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--muted)', padding: '9px 14px', transition: 'color .2s' }}
      onMouseEnter={e => e.currentTarget.style.color = 'var(--fg)'}
      onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
      {children}
    </a>
  )
}

function BtnFill({ href, children }) {
  return (
    <a href={href} style={{ fontFamily: 'var(--mono)', fontSize: 13, textTransform: 'uppercase', letterSpacing: '.05em', padding: '15px 24px', display: 'inline-flex', gap: 10, alignItems: 'center', background: 'var(--lime)', color: 'var(--navy)', border: '1px solid var(--lime)', fontWeight: 700, transition: '.25s' }}
      onMouseEnter={e => { e.currentTarget.style.background = 'var(--fg)'; e.currentTarget.style.borderColor = 'var(--fg)' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'var(--lime)'; e.currentTarget.style.borderColor = 'var(--lime)' }}>
      {children}
    </a>
  )
}

function BtnLine({ href, children }) {
  return (
    <a href={href} style={{ fontFamily: 'var(--mono)', fontSize: 13, textTransform: 'uppercase', letterSpacing: '.05em', padding: '15px 24px', display: 'inline-flex', gap: 10, alignItems: 'center', border: '1px solid var(--line)', transition: '.25s' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--fg)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line)'}>
      {children}
    </a>
  )
}

function SvcCard({ n, title, desc, isRight }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRight: isRight ? '1px solid var(--line)' : 'none',
        borderTop: '1px solid var(--line)',
        padding: '34px 28px 30px',
        minHeight: 220,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'background .3s',
        background: hov ? 'var(--navy-2)' : 'transparent',
      }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--lime)' }}>{n}</span>
      <h3 style={{ fontWeight: 600, fontSize: 26, letterSpacing: '-.01em', marginTop: 24 }}>{title}</h3>
      <p style={{ color: 'var(--muted)', fontSize: 14.5, marginTop: 12 }}>{desc}</p>
    </div>
  )
}

function ProcRow({ n, title, desc }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '90px 1fr 1.2fr',
        gap: 30,
        padding: `34px ${hov ? '14px' : '0px'} 34px`,
        borderTop: '1px solid var(--line)',
        alignItems: 'baseline',
        transition: 'padding .3s',
      }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 14, color: 'var(--lime)' }}>{n}</span>
      <h3 style={{ fontWeight: 500, fontSize: 'clamp(24px,3vw,38px)', letterSpacing: '-.01em' }}>{title}</h3>
      <p style={{ color: 'var(--muted)', fontSize: 16 }}>{desc}</p>
    </div>
  )
}

function PlanCard({ name, badge, tagline, price, period, items, ideal, featured, isRight }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRight: isRight ? '1px solid var(--line)' : 'none',
        borderTop: '1px solid var(--line)',
        padding: '34px 28px 32px',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background .3s',
        background: hov || featured ? 'var(--navy-2)' : 'transparent',
      }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontWeight: 600, fontSize: 28 }}>{name}</h3>
        {badge && <span style={{ fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--navy)', background: 'var(--lime)', padding: '5px 9px', fontWeight: 700 }}>{badge}</span>}
      </div>
      <p style={{ color: 'var(--muted)', fontSize: 14, margin: '10px 0 20px', minHeight: 40 }}>{tagline}</p>
      <div style={{ fontWeight: 500, fontSize: 40, letterSpacing: '-.02em' }}>
        {price} <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--muted)', letterSpacing: 0 }}>{period}</span>
      </div>
      <ul style={{ listStyle: 'none', margin: '22px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map(item => (
          <li key={item} style={{ fontSize: 14, color: '#c4ccd6', paddingLeft: 18, position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, color: 'var(--lime)' }}>+</span>
            {item}
          </li>
        ))}
      </ul>
      <p style={{ fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.04em', color: 'var(--muted)', marginTop: 'auto', paddingTop: 18, borderTop: '1px solid var(--line)' }}>{ideal}</p>
    </div>
  )
}

function FootCol({ title, links }) {
  return (
    <div>
      <h4 style={{ fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--muted)', marginBottom: 16 }}>{title}</h4>
      {links.map(([href, label]) => (
        <a key={label} href={href} style={{ display: 'block', fontSize: 15, marginBottom: 9, color: '#c4ccd6', transition: 'color .2s' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--lime)'}
          onMouseLeave={e => e.currentTarget.style.color = '#c4ccd6'}>
          {label}
        </a>
      ))}
    </div>
  )
}
