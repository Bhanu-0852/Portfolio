import { Suspense, lazy, useRef } from 'react'
import { profile, about, skills } from '../data.js'
import Reveal from './Reveal.jsx'

const IconSphere = lazy(() => import('../scenes/IconSphere.jsx'))

// 3D tilt effect on the photo — rotates toward the mouse
function TiltPhoto() {
  const ref = useRef()
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    ref.current.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`
  }
  const onLeave = () => { ref.current.style.transform = 'rotateY(0) rotateX(0)' }

  return (
    <div className="about-photo-wrap">
      <div className="photo-stage" ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}>
        <img src={profile.photo} alt={profile.name} />
      </div>
      {/* Chips live outside the clipped card so they float over its edges */}
      <span className="photo-chip c1">⚛ MERN Stack</span>
      <span className="photo-chip c2">📍 Bangalore</span>
      <span className="photo-chip c3">🚀 Open to work</span>
      <div className="about-photo-glow" />
    </div>
  )
}

export default function About() {
  return (
    <section className="section" id="about">
      <Reveal>
        <p className="eyebrow">01 · About</p>
        <h2 className="section-title">A developer who <span className="accent">ships complete things</span></h2>
      </Reveal>

      <div className="about-grid">
        <Reveal delay={0.1}><TiltPhoto /></Reveal>
        <div className="about-text">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.15 + i * 0.08}><p>{p}</p></Reveal>
          ))}

          <Reveal delay={0.3}>
            <div className="skills-block">
              <div className="skill-cards">
                {skills.map((s) => (
                  <div className="skill-card" key={s.name}>
                    <b>{s.name}</b>
                    <span>{s.tag}</span>
                  </div>
                ))}
              </div>
              <div>
                <div className="sphere-canvas">
                  <Suspense fallback={null}><IconSphere /></Suspense>
                </div>
                <p className="sphere-hint">↻ drag to spin</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
