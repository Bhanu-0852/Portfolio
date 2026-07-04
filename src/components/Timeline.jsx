import { timeline } from '../data.js'
import Reveal from './Reveal.jsx'

export default function Timeline() {
  return (
    <section className="section" id="education">
      <Reveal>
        <p className="eyebrow">03 · Background</p>
        <h2 className="section-title">Education & <span className="accent">Training</span></h2>
      </Reveal>
      <div className="timeline">
        {timeline.map((t, i) => (
          <Reveal key={t.title} delay={i * 0.12}>
            <div className="tl-item">
              <span className="tl-dot" />
              <span className="tl-period">{t.period}</span>
              <h3>{t.title}</h3>
              <p className="tl-sub">{t.subtitle}</p>
              <p>{t.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
