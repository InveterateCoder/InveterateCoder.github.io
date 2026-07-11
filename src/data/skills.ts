import type { SkillGroup } from './types'

/**
 * Levels are a rough self-assessment (for the bars), not a benchmark.
 * Go and Linux are marked `highlight` to match Arthur's career direction —
 * and Go carries an honest "no commercial experience yet" note.
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
        note: 'Can build in Go — seeking my first commercial Go role',
      },
      { name: 'Python', level: 55 },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'NestJS', level: 90 },
      { name: 'Node.js', level: 92 },
      { name: 'REST APIs', level: 92 },
      { name: 'Express', level: 85 },
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
      { name: 'Docker', level: 85 },
      { name: 'Git', level: 90 },
      { name: 'CI/CD', level: 78 },
      { name: 'AWS', level: 72 },
      { name: 'Kubernetes', level: 58 },
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
