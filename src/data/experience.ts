import type { ExperienceItem, Recognition } from './types'

/**
 * Adapted to English from Arthur's résumé (≈11 yrs 9 mos total).
 * NOTE(arthur): Constructor Tech and EBAC both read as "Present" — confirm
 * which is primary / whether EBAC has ended, and fill the TODO locations/stacks.
 */
export const experience = [
  {
    company: 'Constructor Tech',
    role: 'Backend Developer',
    start: 'Jun 2026',
    end: 'Present',
    location: 'TODO — remote / city',
    current: true,
    summary:
      "Automating business processes and weaving AI into the company's customer-support system.",
    highlights: [
      'Design and maintain the application backend (plus parts of the web client).',
      'Integrate AI solutions into the support workflow.',
      'Scale server infrastructure and own CI/CD for the team.',
      'Turn fuzzy requirements into formal, algorithmic specs — then ship them.',
    ],
    stack: ['TODO — stack (Node.js / TypeScript?)'],
  },
  {
    company: 'EBAC — Escola Britânica de Artes Criativas e Tecnologia',
    role: 'Software Developer · BPM team',
    start: 'Mar 2022',
    end: 'Present',
    location: 'Remote — Brazil',
    current: true,
    summary:
      'Business Process Management team — building and running backend services in production.',
    highlights: [
      'Backend services in NestJS + TypeScript, deployed on AWS.',
      'PostgreSQL data modelling and Redis-backed workflows.',
    ],
    stack: ['Node.js', 'TypeScript', 'NestJS', 'PostgreSQL', 'Redis', 'AWS'],
  },
  {
    company: 'Maximum (Automotive Holding)',
    role: 'Web Programmer',
    start: 'Jul 2021',
    end: 'Mar 2022',
    location: 'TODO — remote / city',
    summary:
      'Owned the backend: kept existing infrastructure healthy and built a new microservice architecture from scratch.',
    highlights: [
      'Built a NestJS microservice backend from the ground up.',
      'Maintained existing Next.js / Node.js infrastructure.',
    ],
    stack: ['NestJS', 'Node.js', 'Next.js', 'TypeScript'],
  },
  {
    company: 'Umnico',
    role: 'Software Developer',
    start: 'Aug 2020',
    end: 'Jul 2021',
    location: 'TODO — remote / city',
    summary: 'Full-stack across the product — landing page, app frontend, and backend microservices.',
    highlights: [
      'Backend microservices in Node.js.',
      'App frontend in React; marketing landing in Vue.js.',
    ],
    stack: ['Node.js', 'React', 'Vue.js', 'JavaScript'],
  },
  {
    company: 'TODO — company name',
    role: 'Web Developer',
    start: 'Mar 2016',
    end: 'Jun 2020',
    location: 'TODO — remote / city',
    summary: 'Full-stack web application development — both client and server.',
    stack: ['JavaScript', 'Node.js', 'PHP', 'Web'],
  },
  {
    company: 'TODO — company name',
    role: '.NET Developer',
    start: 'Oct 2014',
    end: 'Apr 2016',
    location: 'TODO — remote / city',
    summary: 'Built desktop and mobile applications.',
    stack: ['C#', '.NET', 'XAML'],
  },
] satisfies ExperienceItem[]

export const recognitions = [
  { title: 'Digital Breakthrough — regional stage winner', href: '/diploma.pdf' },
  { title: 'Digital Breakthrough — national finalist', href: '/certificate.jpg' },
] satisfies Recognition[]
