import type { SkillGroup } from './types'

/**
 * Levels are a rough self-assessment used only to derive chip emphasis
 * (daily-driver vs toolkit) — never shown as a number.
 * Go and Linux are `highlight`ed as personal loves, not a job-search target.
 */
export const skillGroups = [
  {
    title: 'Languages',
    skills: [
      { name: 'TypeScript', level: 95 },
      { name: 'JavaScript', level: 95 },
      {
        name: 'Go',
        level: 55,
        highlight: true,
        note: 'Can build in Go — the language I love (no commercial experience yet)',
      },
      { name: 'Python', level: 55 },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', level: 92 },
      { name: 'NestJS', level: 90 },
      { name: 'REST APIs', level: 92 },
      { name: 'Express', level: 78 },
      { name: 'Gin', level: 55 },
      { name: 'Fiber', level: 50 },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'React', level: 82 },
      { name: 'React Native', level: 60 },
      { name: 'Vue', level: 40, note: 'less hands-on experience here' },
    ],
  },
  {
    title: 'Data',
    skills: [
      { name: 'PostgreSQL', level: 85 },
      { name: 'Redis', level: 78 },
      { name: 'MongoDB', level: 72 },
    ],
  },
  {
    title: 'Infra & DevOps',
    skills: [
      { name: 'Linux', level: 85, highlight: true },
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 85 },
      { name: 'Kubernetes', level: 58 },
      { name: 'CI/CD', level: 78 },
      { name: 'AWS', level: 72 },
    ],
  },
  {
    title: 'Craft',
    skills: [
      { name: 'System design', level: 82 },
      { name: 'AI-assisted development', level: 92 },
    ],
  },
] satisfies SkillGroup[]
