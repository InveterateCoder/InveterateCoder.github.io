/**
 * Two prose sections. Drafted for Arthur to approve/edit.
 * TODO(arthur): confirm the AI tool names and the Go/Linux specifics.
 */

export const vibecoding = {
  eyebrow: 'AI-assisted engineering',
  title: 'I build with AI — deliberately.',
  lead: 'The job used to be writing code. Increasingly, the job is designing systems and directing the machines that write it.',
  paragraphs: [
    "I work hand-in-hand with AI every day — Claude and Codex. Not to skip understanding my systems, but because understanding them is exactly what makes the AI productive. You can't steer what you can't reason about.",
    "I think the future of the craft looks like this: fluent system design and hard-won engineering judgement, amplified by tools that turn intent into working software at a pace that was impossible a few years ago. “Vibecoding” only works when there's real engineering underneath it.",
    "That's the seat I want: the human who knows why, pointing sharp tools at how.",
  ],
  // TODO(arthur): adjust the exact toolset you want to name.
  tools: ['Claude Code', 'Codex'],
} as const

export const goLinux = {
  eyebrow: "What's next",
  title: 'Heading for Go. At home on Linux.',
  paragraphs: [
    "After eleven years across .NET, the web, and a lot of Node and NestJS, I've found the thing I want to do next: Go.",
    "I can build in Go today — I write it for the love of it, not yet for a paycheck — and I'm looking for the role that makes it my daily language. Its simplicity, its concurrency model, and the way it compiles down to a single honest binary just fit how I like to think.",
    // TODO(arthur): name your distro / setup and why you love it.
    'Linux is home. The terminal is where I’m happiest, and infrastructure I can reason about from the kernel up is a big part of why backend work still excites me.',
  ],
  cta: 'Open to Go roles',
} as const
