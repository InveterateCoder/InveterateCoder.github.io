import { useReducedMotion as useMotionReducedMotion } from 'motion/react'

/**
 * Boolean wrapper around motion's reduced-motion signal.
 * Motion returns `null` until resolved; we coerce that to `false`.
 */
export function useReducedMotion(): boolean {
  return useMotionReducedMotion() ?? false
}
