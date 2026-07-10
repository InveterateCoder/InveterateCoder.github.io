import type { PointerEvent } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/cn'

/**
 * Pointer-driven 3D tilt of the hero portrait. Uses CSS `perspective` +
 * `rotateX/Y` driven by motion springs — Pointer Events unify mouse & touch,
 * and it degrades to a static framed image under prefers-reduced-motion.
 */
export function TiltPhoto({ src = '/me.jpg', className }: { src?: string; className?: string }) {
  const reduce = useReducedMotion()

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const spring = { stiffness: 150, damping: 18, mass: 0.6 }
  const rotX = useSpring(useTransform(py, [0, 1], [10, -10]), spring)
  const rotY = useSpring(useTransform(px, [0, 1], [-12, 12]), spring)
  const glareX = useTransform(px, [0, 1], ['0%', '100%'])
  const glareY = useTransform(py, [0, 1], ['0%', '100%'])
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.25), transparent 45%)`

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const reset = () => {
    px.set(0.5)
    py.set(0.5)
  }

  if (reduce) {
    return (
      <div className={cn('relative', className)}>
        <img
          src={src}
          alt="Arthur Grigoryan"
          className="w-full rounded-3xl border border-white/15 object-cover shadow-glow"
        />
      </div>
    )
  }

  return (
    <div
      className={cn('relative', className)}
      style={{ perspective: 1000 }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      <motion.div
        className="relative aspect-square w-full"
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
      >
        {/* neon halo behind the card */}
        <div
          className="absolute -inset-5 rounded-[2.25rem] bg-gradient-to-br from-cyan/40 via-violet/30 to-magenta/30 opacity-60 blur-2xl"
          style={{ transform: 'translateZ(-40px)' }}
        />

        {/* portrait */}
        <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/15 shadow-glow">
          <img
            src={src}
            alt="Arthur Grigoryan"
            draggable={false}
            className="h-full w-full object-cover"
          />
          <motion.div className="pointer-events-none absolute inset-0" style={{ background: glare }} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/55 via-transparent to-transparent" />
        </div>

        {/* floating terminal chips on the front layer */}
        <div
          className="glass absolute -bottom-4 -left-4 rounded-xl px-3 py-2 font-mono text-xs text-cyan"
          style={{ transform: 'translateZ(60px)' }}
        >
          $ whoami
        </div>
        <div
          className="glass absolute -top-4 -right-3 rounded-xl px-3 py-2 font-mono text-xs text-violet"
          style={{ transform: 'translateZ(48px)' }}
        >
          go build ./...
        </div>
      </motion.div>
    </div>
  )
}
