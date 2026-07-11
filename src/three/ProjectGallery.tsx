import {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from 'react'
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber'
import { AdaptiveDpr, Billboard, Image, PerformanceMonitor } from '@react-three/drei'
import * as THREE from 'three'
import type { Project } from '@/data/types'

const RADIUS = 4.2
const CARD_W = 2.6
const CARD_H = 1.7

interface DragState {
  rot: number
  vel: number
  active: boolean
  lastX: number
  startX: number
  moved: boolean
}

const tmpScale = new THREE.Vector3()

function Card({
  project,
  index,
  count,
  onSelect,
  drag,
}: {
  project: Project
  index: number
  count: number
  onSelect: (p: Project) => void
  drag: RefObject<DragState>
}) {
  const ref = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)
  const angle = (index / count) * Math.PI * 2
  const x = Math.sin(angle) * RADIUS
  const z = Math.cos(angle) * RADIUS

  useFrame((_, dt) => {
    const t = hovered ? 1.14 : 1
    ref.current.scale.lerp(tmpScale.set(t, t, t), 1 - Math.pow(0.002, dt))
  })

  return (
    <group position={[x, 0, z]}>
      <Billboard>
        <group ref={ref}>
          {hovered && (
            <mesh position={[0, 0, -0.03]}>
              <planeGeometry args={[CARD_W + 0.16, CARD_H + 0.16]} />
              <meshBasicMaterial color="#22d3ee" transparent opacity={0.55} />
            </mesh>
          )}
          <Image
            url={project.image}
            transparent
            radius={0.1}
            scale={[CARD_W, CARD_H]}
            onPointerOver={(e: ThreeEvent<PointerEvent>) => {
              e.stopPropagation()
              setHovered(true)
              document.body.style.cursor = 'pointer'
            }}
            onPointerOut={() => {
              setHovered(false)
              document.body.style.cursor = ''
            }}
            onClick={(e: ThreeEvent<MouseEvent>) => {
              e.stopPropagation()
              if (drag.current.moved) return
              onSelect(project)
            }}
          />
        </group>
      </Billboard>
    </group>
  )
}

function Ring({
  items,
  onSelect,
  drag,
}: {
  items: readonly Project[]
  onSelect: (p: Project) => void
  drag: RefObject<DragState>
}) {
  const group = useRef<THREE.Group>(null!)

  useFrame((_, dt) => {
    const d = drag.current
    if (!d.active) {
      const k = dt * 60
      d.rot += d.vel * k
      d.vel *= Math.pow(0.92, k)
      d.rot += dt * 0.12
    }
    group.current.rotation.y = d.rot
  })

  return (
    <group ref={group}>
      {items.map((p, i) => (
        <Card
          key={p.slug}
          project={p}
          index={i}
          count={items.length}
          onSelect={onSelect}
          drag={drag}
        />
      ))}
    </group>
  )
}

export default function ProjectGallery({
  items,
  onSelect,
}: {
  items: readonly Project[]
  onSelect: (p: Project) => void
}) {
  const drag = useRef<DragState>({
    rot: 0,
    vel: 0,
    active: false,
    lastX: 0,
    startX: 0,
    moved: false,
  })

  const onWindowMove = useCallback((e: PointerEvent) => {
    const d = drag.current
    if (!d.active) return
    const dx = e.clientX - d.lastX
    d.lastX = e.clientX
    d.rot += dx * 0.006
    d.vel = dx * 0.006
    if (Math.abs(e.clientX - d.startX) > 6) d.moved = true
  }, [])

  const endDrag = useCallback(() => {
    drag.current.active = false
    window.removeEventListener('pointermove', onWindowMove)
    window.removeEventListener('pointerup', endDrag)
    window.removeEventListener('pointercancel', endDrag)
  }, [onWindowMove])

  const onPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      const d = drag.current
      d.active = true
      d.lastX = e.clientX
      d.startX = e.clientX
      d.moved = false
      d.vel = 0
      window.addEventListener('pointermove', onWindowMove)
      window.addEventListener('pointerup', endDrag)
      window.addEventListener('pointercancel', endDrag)
    },
    [onWindowMove, endDrag],
  )

  useEffect(() => endDrag, [endDrag])

  return (
    <div
      className="relative h-[58vh] min-h-[400px] w-full cursor-grab touch-pan-y select-none active:cursor-grabbing"
      onPointerDown={onPointerDown}
    >
      <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 9], fov: 42 }} gl={{ alpha: true, antialias: true }}>
        <PerformanceMonitor />
        <AdaptiveDpr pixelated />
        <Suspense fallback={null}>
          <Ring items={items} onSelect={onSelect} drag={drag} />
        </Suspense>
      </Canvas>
    </div>
  )
}
