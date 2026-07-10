import { useEffect, useState } from 'react'

/**
 * Feature-detects WebGL. Defaults to `false` and flips to `true` only after
 * mount confirms support, so the 3D canvas is never mounted on unsupported
 * hardware / locked-down browsers (they get the static fallback instead).
 */
export function useWebGL(): boolean {
  const [supported, setSupported] = useState(false)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const ok = Boolean(
        window.WebGLRenderingContext &&
          (canvas.getContext('webgl2') || canvas.getContext('webgl')),
      )
      setSupported(ok)
    } catch {
      setSupported(false)
    }
  }, [])

  return supported
}
