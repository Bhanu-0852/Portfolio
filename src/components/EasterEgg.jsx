// Hidden surprise: typing the secret word anywhere on the page
// (outside inputs) fires a confetti particle burst + message.
import { useEffect, useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { easterEggWord } from '../data.js'

export default function EasterEgg() {
  const [active, setActive] = useState(false)
  const canvasRef = useRef()

  useEffect(() => {
    let buffer = ''
    const onKey = (e) => {
      // Ignore typing inside form fields
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return
      buffer = (buffer + e.key.toLowerCase()).slice(-easterEggWord.length)
      if (buffer === easterEggWord) {
        setActive(true)
        setTimeout(() => setActive(false), 3200)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Confetti burst on a canvas overlay
  useEffect(() => {
    if (!active || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const colors = ['#6C4DFF', '#FF4D8D', '#FFB454', '#4DFFB4']
    const parts = Array.from({ length: 160 }, () => ({
      x: canvas.width / 2, y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 16, vy: (Math.random() - 0.7) * 16,
      size: 4 + Math.random() * 6, color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * Math.PI, life: 1,
    }))
    let raf
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let alive = false
      parts.forEach((p) => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.25; p.rot += 0.08; p.life -= 0.008
        if (p.life > 0) {
          alive = true
          ctx.save()
          ctx.globalAlpha = p.life
          ctx.translate(p.x, p.y); ctx.rotate(p.rot)
          ctx.fillStyle = p.color
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
          ctx.restore()
        }
      })
      if (alive) raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [active])

  return (
    <AnimatePresence>
      {active && (
        <motion.div className="egg-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0 }} />
          <motion.p className="egg-msg"
            initial={{ scale: 0.5, rotate: -6 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}>
            You found it! 🎉<br />Now let's build something.
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
