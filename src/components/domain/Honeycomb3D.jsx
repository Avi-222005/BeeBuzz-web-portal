import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function HexCell({ position, scale = 1, speed = 1 }) {
  const ref = useRef()
  const offset = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset
    ref.current.position.y = position[1] + Math.sin(t) * 0.15
    ref.current.rotation.x = Math.sin(t * 0.5) * 0.1
    ref.current.rotation.z = Math.cos(t * 0.3) * 0.05
  })

  const geometry = useMemo(() => {
    const shape = new THREE.Shape()
    const size = 0.42 * scale
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6
      const x = Math.cos(angle) * size
      const y = Math.sin(angle) * size
      if (i === 0) shape.moveTo(x, y)
      else shape.lineTo(x, y)
    }
    shape.closePath()
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.15 * scale,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 3,
    })
  }, [scale])

  return (
    <mesh ref={ref} position={position} geometry={geometry}>
      <meshStandardMaterial
        color="#F59E0B"
        emissive="#F59E0B"
        emissiveIntensity={0.3}
        metalness={0.1}
        roughness={0.3}
        transparent
        opacity={0.85}
      />
    </mesh>
  )
}

function HoneyDrip({ position }) {
  const ref = useRef()
  const offset = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime + offset
    ref.current.position.y = position[1] + Math.sin(t * 0.8) * 0.3 - 0.5
    ref.current.scale.setScalar(0.8 + Math.sin(t * 1.2) * 0.15)
  })

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.12, 16, 16]} />
      <meshStandardMaterial color="#D97706" emissive="#D97706" emissiveIntensity={0.4} metalness={0.2} roughness={0.1} transparent opacity={0.9} />
    </mesh>
  )
}

function FloatingBee() {
  const ref = useRef()
  const offset = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.5 + offset
    ref.current.position.x = Math.sin(t) * 1.8
    ref.current.position.y = Math.cos(t * 0.7) * 0.6 + 0.5
    ref.current.position.z = Math.cos(t * 0.4) * 0.8
    ref.current.rotation.y = Math.sin(t) * 0.5
  })

  return (
    <group ref={ref}>
      {/* Body */}
      <mesh>
        <capsuleGeometry args={[0.08, 0.18, 8, 16]} />
        <meshStandardMaterial color="#F59E0B" roughness={0.4} />
      </mesh>
      {/* Stripes */}
      <mesh position={[0, 0.02, 0]}>
        <capsuleGeometry args={[0.085, 0.06, 8, 16]} />
        <meshStandardMaterial color="#1C1917" roughness={0.4} />
      </mesh>
      {/* Wings - using scaled spheres instead of ellipses */}
      <mesh position={[-0.1, 0.1, 0]} scale={[1.2, 0.4, 0.6]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="white" transparent opacity={0.45} roughness={0.1} />
      </mesh>
      <mesh position={[0.1, 0.1, 0]} scale={[1.2, 0.4, 0.6]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="white" transparent opacity={0.45} roughness={0.1} />
      </mesh>
    </group>
  )
}

function Scene() {
  const cells = useMemo(() => {
    const arr = []
    const rows = 3
    const cols = 4
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c - cols / 2) * 0.9 + (r % 2 ? 0.45 : 0)
        const y = (r - rows / 2) * 0.78
        arr.push({ position: [x, y, 0], scale: 0.8 + Math.random() * 0.4, speed: 0.3 + Math.random() * 0.5 })
      }
    }
    return arr
  }, [])

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#FFF8EC" />
      <pointLight position={[-3, 2, 2]} intensity={0.8} color="#F59E0B" />
      <pointLight position={[3, -2, 3]} intensity={0.4} color="#D97706" />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <group position={[0, 0, 0]}>
          {cells.map((cell, i) => (
            <HexCell key={i} {...cell} />
          ))}
          <HoneyDrip position={[1.2, 0.5, 0.2]} />
          <HoneyDrip position={[-1.5, -0.3, 0.1]} />
          <HoneyDrip position={[0.5, -0.8, -0.1]} />
        </group>
      </Float>

      <FloatingBee />
      <FloatingBee />
    </>
  )
}

export default function Honeycomb3D() {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
