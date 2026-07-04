import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data.js'

// Lazy-load the 3D scene so the text appears instantly
const HeroScene = lazy(() => import('../scenes/HeroScene.jsx'))

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' },
})

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div>
        <motion.p className="hero-hello" {...fadeUp(0.1)}>Hi, I'm 👋</motion.p>
        <motion.h1 className="hero-name" {...fadeUp(0.2)}>{profile.name}</motion.h1>
        <motion.h2 className="hero-role" {...fadeUp(0.3)}>{profile.role}</motion.h2>
        <motion.p className="hero-pitch" {...fadeUp(0.4)}>{profile.pitch}</motion.p>
        <motion.div className="hero-cta" {...fadeUp(0.5)}>
          <a className="btn btn-primary" href="#projects">View Projects</a>
          <a className="btn btn-ghost" href={profile.resume} download="Bhanu_Prakash_Reddy_Resume.pdf">
            ⬇ Download Resume
          </a>
        </motion.div>
      </div>
      <motion.div
        className="hero-canvas"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.35 }}
      >
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </motion.div>
      <div className="hero-scroll-hint">scroll</div>
    </header>
  )
}
