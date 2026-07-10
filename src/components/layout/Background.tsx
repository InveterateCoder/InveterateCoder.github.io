/**
 * Fixed, GPU-cheap ambient backdrop: a faint tech grid + slowly drifting neon
 * aurora blobs + a vignette. Pure CSS — no WebGL — and the aurora animation is
 * automatically frozen under prefers-reduced-motion (see styles/index.css).
 */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void">
      <div className="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="animate-aurora absolute -top-40 -left-40 h-[38rem] w-[38rem] rounded-full bg-cyan/20 blur-[130px]" />
      <div className="animate-aurora absolute top-1/3 -right-40 h-[34rem] w-[34rem] rounded-full bg-violet/20 blur-[130px] [animation-delay:-8s]" />
      <div className="animate-aurora absolute bottom-0 left-1/4 h-[30rem] w-[30rem] rounded-full bg-magenta/10 blur-[130px] [animation-delay:-15s]" />

      <div className="absolute inset-0 bg-gradient-to-b from-void/40 via-transparent to-void" />
    </div>
  )
}
