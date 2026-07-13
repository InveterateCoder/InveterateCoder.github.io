import type { ContactMethod, SiteConfig } from './types'

export const site: SiteConfig = {
  name: 'Arthur Grigoryan',
  role: 'Backend Engineer',
  tagline:
    '11 years building software — deep in TypeScript & Node backends, with a soft spot for Go and Linux.',
  // TODO(arthur): confirm the city/country to display publicly.
  location: 'TODO — city, country',
  email: 'inveterate.coder@gmail.com',
  phone: '+79340120202',
  // TODO(arthur): paste your Web3Forms access key (https://web3forms.com — free, takes a minute).
  web3formsKey: 'TODO-web3forms-access-key',
  nav: [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'work', label: 'Work' },
    { id: 'ai', label: 'AI' },
    { id: 'go', label: 'Go · Linux' },
    { id: 'contact', label: 'Contact' },
  ],
  socials: [
    { label: 'GitHub', href: 'https://github.com/InveterateCoder', icon: 'github' },
    {
      label: 'Stack Overflow',
      href: 'https://stackoverflow.com/users/11964634/arthur-grigoryan',
      icon: 'stackoverflow',
    },
    // TODO(arthur): paste your LinkedIn profile URL.
    { label: 'LinkedIn', href: 'TODO-linkedin-url', icon: 'linkedin' },
  ],
}

/** Direct quick-write channels shown as buttons in the Contact section. */
export const contacts = [
  { kind: 'email', label: 'Email', href: 'mailto:inveterate.coder@gmail.com', hint: 'inveterate.coder@gmail.com' },
  { kind: 'telegram', label: 'Telegram', href: 'https://t.me/InveterateCoder', hint: '@InveterateCoder' },
  { kind: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/79340120202', hint: '+7 934 012 0202' },
  {
    kind: 'max',
    label: 'Max',
    href: 'https://max.ru/u/f9LHodD0cOKt7Iu1a_X29JcDTzFSA8L4mDYC9hFHHqhMGnEB6PuAGRlpRHQ',
    hint: 'Message me on Max',
  },
  { kind: 'phone', label: 'Call', href: 'tel:+79340120202', hint: '+7 934 012 0202' },
] satisfies ContactMethod[]
