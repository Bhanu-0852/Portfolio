// Custom cursor: a dot that sticks to the pointer + a trailing ring
// that grows when hovering links/buttons. Hidden on touch devices via CSS.
import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dot = useRef()
  const ring = useRef()
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    let rx = 0, ry = 0, mx = 0, my = 0
    let raf
    const move = (e) => {
      mx = e.clientX; my = e.clientY
      if (dot.current) dot.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`
    }
    const loop = () => {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16  // ring lags behind = smooth trail
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`
      raf = requestAnimationFrame(loop)
    }
    const over = (e) => setHovering(!!e.target.closest('a, button, input, textarea'))
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className={`cursor-ring ${hovering ? 'hovering' : ''}`} />
    </>
  )
}
