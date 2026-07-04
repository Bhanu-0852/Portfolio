// ============================================================
// 3D TECH SPHERE — words from the tech stack orbiting on an
// invisible sphere. Drag to spin it (OrbitControls, zoom off).
// ============================================================
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, OrbitControls } from '@react-three/drei'
import { sphereWords } from '../data.js'

function WordCloud({ radius = 2.1 }) {
  const group = useRef()

  // Distribute words evenly on a sphere using the Fibonacci spiral
  const items = useMemo(() => {
    const n = sphereWords.length
    return sphereWords.map((word, i) => {
      const phi = Math.acos(-1 + (2 * i + 1) / n)
      const theta = Math.sqrt(n * Math.PI) * phi
      return {
        word,
        pos: [
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi),
        ],
      }
    })
  }, [radius])

  // Auto-rotate slowly when the user isn't dragging
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.12
  })

  return (
    <group ref={group}>
      {items.map(({ word, pos }, i) => (
        <Text
          key={word}
          position={pos}
          fontSize={0.26}
          color={i % 3 === 0 ? '#6C4DFF' : i % 3 === 1 ? '#FF4D8D' : '#FFB454'}
          anchorX="center"
          anchorY="middle"
        >
          {word}
        </Text>
      ))}
    </group>
  )
}

export default function IconSphere() {
  // On touch screens OrbitControls would capture swipes and block page
  // scrolling — so drag-to-spin is desktop-only; mobile gets auto-rotate.
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5.4], fov: 50 }} gl={{ alpha: true }}>
      <ambientLight intensity={1} />
      <WordCloud />
      {!isTouch && <OrbitControls enableZoom={false} enablePan={false} />}
    </Canvas>
  )
}
