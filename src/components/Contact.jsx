import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { profile, emailjsConfig } from '../data.js'
import Reveal from './Reveal.jsx'

// Button that magnetically pulls toward the cursor
function MagnetBtn({ href, children, download }) {
  const ref = useRef()
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const x = e.clientX - r.left - r.width / 2
    const y = e.clientY - r.top - r.height / 2
    ref.current.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`
  }
  const onLeave = () => { ref.current.style.transform = '' }
  return (
    
      ref={ref}
      className="magnet-btn"
      href={href}
      target="_blank"
      rel="noreferrer"
      {...(download ? { download } : {})}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </a>
  )
}

// True until the three EmailJS IDs in src/data.js are filled in
const emailjsNotConfigured = Object.values(emailjsConfig).some((v) => v.startsWith('YOUR_'))

export default function Contact() {
  const [status, setStatus] = useState(null) // null | 'sending' | 'ok' | 'missing' | 'mailto'
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  // Fallback: open the visitor's email app with everything pre-filled
  const openMailApp = () => {
    const subject = encodeURIComponent(`Portfolio contact from ${form.name || 'a visitor'}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  const send = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('missing')
      return
    }

    // EmailJS not set up yet → gracefully hand off to the visitor's mail app
    if (emailjsNotConfigured) {
      openMailApp()
      setStatus('mailto')
      return
    }

    setStatus('sending')
    try {
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        { from_name: form.name, from_email: form.email, message: form.message },
        { publicKey: emailjsConfig.publicKey },
      )
      setStatus('ok')
      setForm({ name: '', email: '', message: '' })
    } catch {
      // Send failed (rate limit / network) → same graceful mail-app handoff
      openMailApp()
      setStatus('mailto')
    }
  }

  const set = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value })
    if (status === 'missing') setStatus(null)
  }

  return (
    <section className="section" id="contact">
      <Reveal>
        <p className="eyebrow">04 · Contact</p>
        <h2 className="section-title">Let's build <span className="accent">something together</span></h2>
      </Reveal>

      <div className="contact-grid">
        <Reveal delay={0.1}>
          <p className="contact-big">Open to Full Stack / MERN roles.<br />Bangalore · Hyderabad · Remote.</p>
          <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}</a>
          <div className="socials">
            <MagnetBtn href={profile.github}>GitHub</MagnetBtn>
            <MagnetBtn href={profile.linkedin}>LinkedIn</MagnetBtn>
            <MagnetBtn href={profile.resume} download="Bhanu_Prakash_Reddy_Resume.pdf">Resume</MagnetBtn>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="contact-form">
            <input placeholder="Your name" value={form.name} onChange={set('name')} />
            <input placeholder="Your email" type="email" value={form.email} onChange={set('email')} />
            <textarea placeholder="Your message" rows={5} value={form.message} onChange={set('message')} />
            <button className="btn btn-primary" onClick={send} disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </button>
            {status === 'ok' && <p className="form-status ok">Message sent — I'll reply soon. ✓</p>}
            {status === 'missing' && <p className="form-status err">Please fill in all three fields.</p>}
            {status === 'mailto' && <p className="form-status ok">Opening your email app with the message ready — just hit send there. ✓</p>}
          </div>
        </Reveal>
      </div>
    </section>
  )
}