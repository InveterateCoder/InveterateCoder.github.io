import { ArrowRight } from 'lucide-react'
import { goLinux } from '@/data/narrative'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'

type Line = { prompt?: boolean; text: string; out?: boolean }

const terminal: Line[] = [
  { prompt: true, text: 'go version' },
  { text: 'go version go1.23 linux/amd64', out: true },
  { prompt: true, text: 'go run whoami.go' },
  { text: 'Arthur Grigoryan — backend engineer.', out: true },
  { text: 'Writes Go for the love of it.', out: true },
  { text: 'Looking to make it the day job.', out: true },
  { prompt: true, text: '' },
]

export function GoLinux() {
  return (
    <Section id="go">
      <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0c14] shadow-glow-violet">
            <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-xs text-faint">arthur@linux: ~/go</span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed">
              <code>
                {terminal.map((line, i) => (
                  <div key={i}>
                    {line.prompt && <span className="text-lime">$ </span>}
                    <span className={line.out ? 'text-muted' : 'text-ink'}>{line.text}</span>
                    {line.prompt && i === terminal.length - 1 && (
                      <span className="ml-0.5 inline-block h-4 w-2 animate-pulse-glow bg-cyan align-middle" />
                    )}
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </Reveal>

        <div>
          <SectionHeading index="06" eyebrow={goLinux.eyebrow} title={goLinux.title} />
          <Reveal className="space-y-4 text-muted">
            {goLinux.paragraphs.map((p, i) => (
              <p key={i} className="leading-relaxed">
                {p}
              </p>
            ))}
            <Button href="#contact" className="mt-2">
              {goLinux.cta}
              <ArrowRight size={16} />
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
