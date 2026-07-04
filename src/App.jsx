import { useState, useEffect } from 'react'
import Preloader from './components/Preloader.jsx'
import Cursor from './components/Cursor.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Timeline from './components/Timeline.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import EasterEgg from './components/EasterEgg.jsx'
import ChatWidget from './components/ChatWidget.jsx'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  // Light mode is the default; the visitor's choice is remembered
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1700)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <Preloader done={loaded} />
      <div className="bg-aura" />
      <div className="grain" />
      <ScrollProgress />
      <Cursor />
      <Navbar theme={theme} toggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Timeline />
        <Contact />
      </main>
      <Footer />
      <EasterEgg />
      <ChatWidget />
    </>
  )
}
