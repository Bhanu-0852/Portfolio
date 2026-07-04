// ============================================================
// HERO 3D SCENE — iridescent gem crystal.
// The key upgrade: a custom Environment built from Lightformer
// panels (no downloads) — it gives the crystal real colored
// reflections, which is what makes gems look "expensive".
// ============================================================
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles, Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'

function Gem({ isMobile }) {
  const mesh = useRef()
  const wire = useRef()

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime()
    if (mesh.current) {
      mesh.current.rotation.y = t * 0.22 + pointer.x * 0.45
      mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, pointer.y * 0.3 + 0.2, 0.06)
    }
    if (wire.current) {
      wire.current.rotation.y = -t * 0.1
      wire.current.rotation.z = t * 0.06
    }
  })

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.9}>
      <group scale={isMobile ? 1.15 : 1.4}>
        {/* The gem: few large facets (detail 0) + polished iridescent surface */}
        <mesh ref={mesh}>
          <icosahedronGeometry args={[1.2, 0]} />
          <meshPhysicalMaterial
            color="#6C4DFF"
            metalness={0.55}
            roughness={0.07}
            clearcoat={1}
            clearcoatRoughness={0.08}
            iridescence={1}
            iridescenceIOR={1.5}
            envMapIntensity={isMobile ? 1.2 : 1.6}
            flatShading
          />
        </mesh>
        {/* Techy wireframe shell orbiting the gem */}
        <mesh ref={wire} scale={1.35}>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshBasicMaterial color="#FF4D8D" wireframe transparent opacity={0.1} />
        </mesh>
      </group>
    </Float>
  )
}

function Shards({ count }) {
  const group = useRef()
  const shards = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        angle: (i / count) * Math.PI * 2,
        radius: 2.4 + (i % 3) * 0.5,
        y: (Math.random() - 0.5) * 1.7,
        size: 0.08 + Math.random() * 0.12,
        speed: 0.22 + Math.random() * 0.2,
        tilt: Math.random() * Math.PI,
      })),
    [count],
  )

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    group.current?.children.forEach((m, i) => {
      const s = shards[i]
      const a = s.angle + t * s.speed
      m.position.set(Math.cos(a) * s.radius, s.y + Math.sin(t * 0.8 + i) * 0.15, Math.sin(a) * s.radius)
      m.rotation.x = t * 0.6 + s.tilt
      m.rotation.y = t * 0.4 + i
    })
  })

  return (
    <group ref={group}>
      {shards.map((s, i) => (
        <mesh key={i} scale={s.size}>
          <octahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            color={i % 3 === 0 ? '#6C4DFF' : i % 3 === 1 ? '#FF4D8D' : '#FFB454'}
            metalness={0.9} roughness={0.12} flatShading envMapIntensity={1.3}
          />
        </mesh>
      ))}
    </group>
  )
}

function Particles({ count }) {
  const points = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 3.4 + Math.random() * 4.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame(({ clock, pointer }) => {
    if (!points.current) return
    points.current.rotation.y = clock.getElapsedTime() * 0.04 + pointer.x * 0.25
    points.current.rotation.x = pointer.y * 0.18
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.032} color="#FF4D8D" transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  )
}

export default function HeroScene() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <Canvas
      dpr={isMobile ? [1, 1.3] : [1, 1.8]}
      camera={{ position: [0, 0, 6.4], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      {/* Custom environment: gradient light panels the gem reflects.
          Built procedurally — nothing is downloaded. */}
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={2.5} color="#6C4DFF" position={[-4, 2, -3]} scale={[6, 4, 1]} />
        <Lightformer intensity={2.2} color="#FF4D8D" position={[4, -1, -2]} scale={[6, 4, 1]} />
        <Lightformer intensity={1.8} color="#FFB454" position={[0, 4, 2]} scale={[5, 3, 1]} />
        <Lightformer intensity={1.5} color="#ffffff" position={[0, -3, 4]} scale={[4, 3, 1]} />
      </Environment>
      <directionalLight position={[4, 6, 5]} intensity={1.1} />
      <pointLight position={[-6, -2, -4]} intensity={1.6} color="#FF4D8D" />

      <Gem isMobile={isMobile} />
      <Shards count={isMobile ? 6 : 10} />
      <Particles count={isMobile ? 400 : 1400} />
      <Sparkles count={isMobile ? 22 : 55} scale={5} size={2.2} speed={0.35} color="#FFB454" />
    </Canvas>
  )
}
