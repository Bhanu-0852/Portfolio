import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { featuredProject, projects } from '../data.js'
import Reveal from './Reveal.jsx'

// Number that counts up from 0 when it scrolls into view
function Counter({ value, suffix }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    const dur = 1200
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1)
      setN(Math.round(value * (1 - Math.pow(1 - p, 3)))) // ease-out cubic
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value])

  return <b ref={ref}>{n}{suffix}</b>
}

// Card with a subtle 3D tilt following the mouse
function TiltCard({ children, index }) {
  const ref = useRef()
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    ref.current.style.transform = `translateY(-4px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg)`
  }
  const onLeave = () => { ref.current.style.transform = '' }

  return (
    <Reveal delay={index * 0.08}>
      <div className="project-card" ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}>
        {children}
      </div>
    </Reveal>
  )
}

export default function Projects() {
  const f = featuredProject
  return (
    <section className="section" id="projects">
      <Reveal>
        <p className="eyebrow">02 · Projects</p>
        <h2 className="section-title">Built to <span className="accent">production standards</span></h2>
      </Reveal>

      {/* ---- Featured: SVBBS ---- */}
      <Reveal delay={0.1}>
        <div className="featured">
          <div className="featured-info">
            <span className="featured-badge">★ Flagship Project</span>
            <h3 className="featured-title">{f.title} ({f.abbr})</h3>
            <p className="featured-desc">{f.description}</p>
            <div className="featured-stats">
              {f.stats.map((s) => (
                <div className="stat" key={s.label}>
                  <Counter value={s.value} suffix={s.suffix} />
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
            <div className="tech-tags">{f.tech.map((t) => <i key={t}>{t}</i>)}</div>
            <div className="card-links">
              <a className="btn btn-primary" href={f.live} target="_blank" rel="noreferrer">Live Demo ↗</a>
              <a className="btn btn-ghost" href={f.code} target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>
          <div className="featured-visual">
            <div className="mock">
              <div className="mock-bar"><i /><i /><i /></div>
              <div className="mock-body">
                <em>POST</em> /api/auth/login → <u>200</u> · JWT + refresh rotation<br />
                <em>GET</em>  /api/books?semantic=true → <u>200</u> · Gemini ✓<br />
                <em>GET</em>  /api/recommendations → <u>200</u> · Groq failover ✓<br />
                <em>RUN</em>  vitest → <u>141 passed</u> · coverage gate ✓<br />
                <em>CI</em>   GitHub Actions → <u>deploy: success</u>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ---- Grid ---- */}
      <div className="project-grid">
        {projects.map((p, i) => (
          <TiltCard key={p.title} index={i}>
            <span className="project-num">0{i + 2}</span>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <div className="tech-tags">{p.tech.map((t) => <i key={t}>{t}</i>)}</div>
            <div className="card-links">
              {p.live && <a className="mini-link" href={p.live} target="_blank" rel="noreferrer">Live Demo ↗</a>}
              <a className="mini-link" href={p.code} target="_blank" rel="noreferrer">GitHub ↗</a>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  )
}
