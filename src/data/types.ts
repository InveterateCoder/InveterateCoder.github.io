/** Shapes for the site's content layer. All data in this folder is authored
 *  with `satisfies` against these types, so the compiler catches drift. */

export type SocialIcon = 'github' | 'linkedin' | 'stackoverflow' | 'mail' | 'twitter'

export interface SocialLink {
  label: string
  href: string
  icon: SocialIcon
}

export type ContactKind = 'email' | 'phone' | 'telegram' | 'whatsapp' | 'max'

export interface ContactMethod {
  kind: ContactKind
  label: string
  href: string
  /** Small secondary line under the label (handle / number). */
  hint?: string
}

export interface NavItem {
  id: string
  label: string
}

export interface SiteConfig {
  name: string
  /** Short professional headline. */
  role: string
  /** One-liner under the name. */
  tagline: string
  location: string
  email: string
  phone?: string
  /** Web3Forms public access key. */
  web3formsKey: string
  nav: readonly NavItem[]
  socials: readonly SocialLink[]
}

export interface ExperienceItem {
  company: string
  role: string
  /** e.g. "Oct 2014" */
  start: string
  /** e.g. "Apr 2016" or "Present" */
  end: string
  location: string
  current?: boolean
  summary: string
  highlights?: readonly string[]
  stack: readonly string[]
}

export type ProjectLinkKind = 'repo' | 'live' | 'youtube' | 'download' | 'store'

export interface ProjectLink {
  kind: ProjectLinkKind
  href: string
  label?: string
  /** Mark links to hosts that are almost certainly offline now. */
  dead?: boolean
}

export interface Project {
  slug: string
  name: string
  blurb: string
  /** Release / build year, shown as a tag. */
  year: string
  langs: readonly string[]
  tech: readonly string[]
  /** Absolute public path, e.g. "/projects/aes.png". */
  image: string
  links: readonly ProjectLink[]
}

export interface Skill {
  name: string
  /** 0..100 — a rough self-assessment for the bar. */
  level: number
  /** Optional honest caveat, e.g. "no commercial experience yet". */
  note?: string
  /** Visually emphasise (Go, Linux). */
  highlight?: boolean
}

export interface SkillGroup {
  title: string
  skills: readonly Skill[]
}

export interface AboutBlock {
  id: string
  title: string
  /** Paragraphs; rendered one <p> per array entry. */
  body: readonly string[]
}

export interface Recognition {
  title: string
  href: string
}

export interface JourneyStep {
  /** The language / tech that defines this chapter, e.g. "C# · .NET". */
  tag: string
  /** Short headline for the chapter. */
  title: string
  /** The story for this step. */
  body: string
}
