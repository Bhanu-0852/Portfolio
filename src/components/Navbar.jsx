import { useState, useEffect } from 'react'
import { profile } from '../data.js'

const links = [
  ['About', '#about'],
  ['Projects', '#projects'],
  ['Education', '#education'],
  ['Contact', '#contact'],
]

// Inline SVG icons for the mobile dock (crisp at any size)
const icons = {
  home: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>,
  user: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 5-5.5 8-5.5s6.5 1.5 8 5.5"/></svg>,
  grid: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/></svg>,
  cap: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9.5 12 4l10 5.5-10 5.5L2 9.5Z"/><path d="M6 12v5c0 1 2.5 3 6 3s6-2 6-3v-5"/></svg>,
  mail: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3 8 9 6 9-6"/></svg>,
}

const dockItems = [
  { id: 'top', label: 'Home', icon: icons.home },
  { id: 'about', label: 'About', icon: icons.user },
  { id: 'projects', label: 'Work', icon: icons.grid },
  { id: 'education', label: 'Study', icon: icons.cap },
  { id: 'contact', label: 'Contact', icon: icons.mail },
]

export default function Navbar({ theme, toggleTheme }) {
  const [active, setActive] = useState('top')

  // Track which section is on screen → highlights the matching dock tab
  useEffect(() => {
    const sections = dockItems
      .map((d) => document.getElementById(d.id))
      .filter(Boolean)
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -50% 0px' },
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      {/* Top pill — full nav on desktop; logo + theme only on mobile */}
      <nav className="navbar">
        <a href="#top" className="nav-logo">{profile.shortName}</a>
        <div className="nav-links">
          {links.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </div>
        <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </nav>

      {/* App-style bottom dock — mobile only */}
      <nav className="dock" aria-label="Mobile navigation">
        {dockItems.map((d) => (
          <a key={d.id} href={`#${d.id}`} className={`dock-item ${active === d.id ? 'active' : ''}`}>
            <span className="dock-icon">{d.icon}</span>
            <span className="dock-label">{d.label}</span>
          </a>
        ))}
      </nav>
    </>
  )
}
