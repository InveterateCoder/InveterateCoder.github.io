import type {
  ContactMethod,
  ExperienceItem,
  Project,
  ProjectLink,
  Recognition,
  Skill,
  SkillGroup,
} from '@/data/types'
import { site, contacts } from '@/data/site'
import { experience as experienceData, recognitions } from '@/data/experience'
import { projects } from '@/data/projects'
import { skillGroups } from '@/data/skills'
import { intro, goals, selfTaught } from '@/data/about'
import { vibecoding, goLinux } from '@/data/narrative'

/** Stable ids so the Russian layer can override experience entries by key. */
const experienceIds = ['constructor', 'ebac', 'maximum', 'umnico', 'webdev', 'dotnet'] as const

/**
 * The full English content — the single source of truth for structure.
 * `Content = typeof en`, and `ru` overrides only the localizable text, so the
 * two languages can never drift structurally.
 */
export const en = {
  // ---- neutral identity (shared across languages) ----
  name: site.name,
  email: site.email,
  phone: site.phone,
  socials: site.socials,
  web3formsKey: site.web3formsKey,

  // ---- localizable identity ----
  role: 'Backend Engineer',
  tagline:
    '11 years building software. Deep in TypeScript & Node backends — writing Go and looking to make it my next chapter.',
  location: site.location,

  nav: [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'awards', label: 'Awards' },
    { id: 'work', label: 'Work' },
    { id: 'ai', label: 'AI' },
    { id: 'go', label: 'Go · Linux' },
    { id: 'contact', label: 'Contact' },
  ],

  hero: {
    badge: 'Open to Go roles',
    headline: { greetPrefix: "I'm ", name: 'Arthur', buildPrefix: 'I build ', buildWord: 'backends' },
    cta: { work: 'See my work', resume: 'Résumé', howIBuild: 'How I build' },
    meta: '11 yrs · NestJS · Postgres · Go',
  },

  about: {
    eyebrow: 'About',
    title: 'A little about me',
    subtitle:
      "I'd rather be honest and specific than polished and generic — so here's the real version.",
    intro: [...intro],
    goals: { title: goals.title, items: [...goals.items] },
  },

  selfTaught: {
    eyebrow: selfTaught.eyebrow,
    title: selfTaught.title,
    lead: selfTaught.lead,
    story: [...selfTaught.story],
    book: { note: selfTaught.book.note, title: selfTaught.book.title, author: selfTaught.book.author },
    stats: selfTaught.stats.map((s) => ({ value: s.value, suffix: s.suffix, label: s.label })),
    stillLearning: 'Still learning',
    arrow: 'curiosity → career',
  },

  skills: {
    eyebrow: 'Skills',
    title: 'The toolbox',
    subtitle:
      'Deep in the TypeScript/Node backend world, comfortable on Linux, and pointing the next chapter at Go.',
    groups: skillGroups.map((g: SkillGroup) => ({
      title: g.title,
      skills: g.skills.map((s: Skill) => ({
        name: s.name,
        level: s.level,
        note: s.note,
        highlight: s.highlight,
      })),
    })),
  },

  experience: {
    eyebrow: 'Experience',
    title: 'Eleven years, shipping software',
    subtitle:
      'From .NET desktop apps to modern Node/NestJS backends in production. The short version — the full résumé is one click away.',
    currentBadge: 'Current',
    recognitionTitle: 'Recognition',
    recognitions: recognitions.map((r: Recognition) => ({ title: r.title, href: r.href })),
    ctaText:
      'Want the whole picture? The full résumé opens in a clean, printable view — save it as PDF from there.',
    ctaButton: 'View & download résumé',
    items: experienceData.map((e: ExperienceItem, i) => ({
      id: experienceIds[i],
      company: e.company,
      role: e.role,
      dateRange: `${e.start} — ${e.end}`,
      location: e.location,
      current: e.current ?? false,
      summary: e.summary,
      highlights: e.highlights ? [...e.highlights] : [],
      stack: [...e.stack],
    })),
  },

  awards: {
    eyebrow: 'Recognition',
    title: 'Digital Breakthrough',
    subtitle:
      "As team lead, I took our team to a regional-stage win and then the national finals of Digital Breakthrough — one of Russia's largest IT contests. Both times, leading the team.",
    teamLead: 'Team lead',
    view: 'View',
    reflectionTitle: 'The final — and a lesson',
    reflection:
      "We came painfully close in the final. We were building a mobile app (I wrote it in Xamarin) and the finish line was almost in reach. My mistake was simple: I didn't sleep at all — a full 48 hours. By the end, thoughts drifted past like clouds I couldn't catch, and with just a little left to do, I couldn't hold a single one still. Finishing became impossible for us. It's the clearest lesson I've kept since: knowing your limits is part of the craft.",
    items: [
      {
        kind: 'Diploma',
        label: 'Regional stage — winner',
        image: '/diploma-preview.png',
        href: '/diploma.pdf',
      },
      {
        kind: 'Certificate',
        label: 'National final — finalist',
        image: '/certificate.jpg',
        href: '/certificate.jpg',
      },
    ],
  },

  projects: {
    eyebrow: 'Where it started',
    title: 'The self-taught years',
    subtitle:
      'The projects I built while teaching myself to code — from C++/Win32 and .NET to my first web apps (2014–2020). Rough around the edges, but this is where the love of it began.',
    dragHint: 'drag to spin · click a card for details',
    loading: 'booting 3D gallery…',
    items: projects.map((p: Project) => ({
      slug: p.slug,
      name: p.name,
      blurb: p.blurb,
      year: p.year,
      langs: [...p.langs],
      tech: [...p.tech],
      image: p.image,
      links: p.links.map((l: ProjectLink) => ({
        kind: l.kind,
        href: l.href,
        label: l.label,
        dead: l.dead,
      })),
    })),
  },

  vibecoding: {
    eyebrow: vibecoding.eyebrow,
    title: vibecoding.title,
    lead: vibecoding.lead,
    paragraphs: [...vibecoding.paragraphs],
    toolsLabel: 'Daily drivers',
    tools: [...vibecoding.tools],
    note: 'Fluent system design and engineering judgement, amplified by AI. Knowing why is what lets me point sharp tools at how — fast.',
  },

  goLinux: {
    eyebrow: goLinux.eyebrow,
    title: goLinux.title,
    paragraphs: [...goLinux.paragraphs],
    cta: goLinux.cta,
    terminal: [
      { prompt: true, text: 'go version', out: false },
      { prompt: false, text: 'go version go1.23 linux/amd64', out: true },
      { prompt: true, text: 'go run whoami.go', out: false },
      { prompt: false, text: 'Arthur Grigoryan — backend engineer.', out: true },
      { prompt: false, text: 'Writes Go for the love of it.', out: true },
      { prompt: false, text: 'Looking to make it the day job.', out: true },
      { prompt: true, text: '', out: false },
    ],
  },

  contact: {
    eyebrow: 'Contact',
    title: "Let's talk",
    subtitle:
      "I'd love to try myself in a Go role — but I'm equally at home in Node.js, and I won't turn down anything genuinely interesting. With my team (Claude & Codex), I pick up new ground fast.",
    intro: "Pick whatever's easiest — I'm quick to reply on Telegram and WhatsApp.",
    methods: contacts.map((c: ContactMethod) => ({
      kind: c.kind,
      href: c.href,
      label: c.label,
      hint: c.hint,
    })),
  },

  resume: {
    back: 'Back to site',
    savePdf: 'Save as PDF',
    roleSuffix: 'heading for Go',
    experienceTitle: 'Experience',
    skillsTitle: 'Skills',
    recognitionTitle: 'Recognition',
  },

  footer: {
    built: 'Built from scratch with React, Three.js & a lot of coffee-free evenings.',
    backToTop: 'Back to top',
  },

  linkLabels: {
    code: 'Code',
    video: 'Video',
    live: 'Live',
    download: 'Download',
    store: 'Store',
    offline: 'offline',
  },

  ui: {
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    resume: 'Résumé',
  },
}
