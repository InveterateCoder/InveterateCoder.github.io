import type { AboutBlock } from './types'

/** Richly personal — kept from the original site, modernised. */
export const intro = [
  "I try to keep things informative and succinct. English isn't my native language, so I'll aim for clarity over polish.",
  'I think of myself as an ordinary person with a lot of restless, inventive ideas — most of them pointed at software — and the stubbornness to actually build them.',
] as const

export const aboutBlocks = [
  {
    id: 'self-taught',
    title: 'Self-taught',
    body: [
      "I'm self-taught. I fell in love with learning at 26, when I picked up Andrew Tanenbaum's *Structured Computer Organization* and finally understood what was actually happening under the hood. That book turned idle curiosity into a career.",
      'Eleven years later I build backends for a living — and I still learn something every single day.',
    ],
  },
  {
    id: 'faith',
    title: 'Faith',
    body: [
      "I believe in God without being dogmatic about it. I'm drawn to the person of Jesus and the way he taught, and I keep a soft spot for the old Greek and Roman myths — for their beauty as much as their lessons.",
    ],
  },
  {
    id: 'lifestyle',
    title: 'How I live',
    body: [
      "I don't smoke, I don't drink, and I'm a vegetarian. I try to live by a simple rule: justice above gain, forgiveness above grudge, love above all.",
    ],
  },
  {
    id: 'goals',
    title: "What I'm aiming at",
    body: [
      'Make people a little happier.',
      'Leave the world a little better than I found it.',
      'Raise worthy, kind, clever kids.',
      'Never stop learning.',
    ],
  },
] satisfies AboutBlock[]
