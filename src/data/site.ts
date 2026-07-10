import type { SiteConfig } from './types'

export const site: SiteConfig = {
  name: 'Arthur Grigoryan',
  role: 'Backend Engineer',
  tagline:
    '11 years building software. Deep in TypeScript & Node backends — writing Go and looking to make it my next chapter.',
  // TODO(arthur): confirm the city/country to display publicly.
  location: 'TODO — city, country',
  email: 'inveterate.coder@gmail.com',
  // TODO(arthur): add a phone number here if you want it shown.
  // phone: '+00 000 000 0000',
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
    { label: 'Email', href: 'mailto:inveterate.coder@gmail.com', icon: 'mail' },
  ],
}
