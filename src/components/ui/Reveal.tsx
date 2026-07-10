import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Seconds to delay the animation (for stagger). */
  delay?: number
  /** Initial vertical offset in px. */
  y?: number
  once?: boolean
}

export function Reveal({ children, className, delay = 0, y = 24, once = true }: RevealProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.25 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
