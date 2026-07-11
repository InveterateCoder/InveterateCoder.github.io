import type { Project } from './types'

/**
 * The self-taught origin story (≈2014–2020). These are the projects Arthur
 * built while teaching himself to program — kept here as "where it started".
 * Several live demos ran on free hosts that are almost certainly offline now;
 * those links are marked `dead` so the UI can style/label them accordingly.
 */
export const projects = [
  {
    slug: 'rooms',
    name: 'Rooms',
    blurb: 'A real-time chat web app.',
    year: '2020',
    langs: ['C#', 'JavaScript'],
    tech: ['ASP.NET Core 3.1', 'SignalR', 'MySQL', 'React 16', 'Bootstrap 4'],
    image: '/projects/rooms.gif',
    links: [{ kind: 'live', href: 'https://webrooms.azurewebsites.net/', dead: true }],
  },
  {
    slug: 'groups',
    name: 'Groups',
    blurb: 'A group-chat web app with persistence.',
    year: '2020',
    langs: ['C#', 'JavaScript'],
    tech: ['ASP.NET Core 3.1', 'Entity Framework', 'SignalR', 'Azure'],
    image: '/projects/groups.png',
    links: [
      { kind: 'youtube', href: 'https://youtu.be/TNVyI6bFxRk' },
      { kind: 'repo', href: 'https://github.com/InveterateCoder/Groups' },
      { kind: 'live', href: 'https://webgroups.azurewebsites.net/', dead: true },
    ],
  },
  {
    slug: 'event-log',
    name: 'Event Log',
    blurb: 'A reminder app with more advanced scheduling.',
    year: '2019',
    langs: ['C#', 'XAML'],
    tech: ['UWP'],
    image: '/projects/el.png',
    links: [
      { kind: 'youtube', href: 'https://youtu.be/KuGEr7fDiIM' },
      { kind: 'repo', href: 'https://github.com/InveterateCoder/Event-Log' },
    ],
  },
  {
    slug: 'vkurse',
    name: 'вКурсе',
    blurb: 'A Russian news reader for mobile.',
    year: '2019',
    langs: ['C#', 'XAML'],
    tech: ['Xamarin.Forms'],
    image: '/projects/news.png',
    links: [
      { kind: 'repo', href: 'https://github.com/InveterateCoder/vKurse' },
    ],
  },
  {
    slug: 'aes',
    name: 'AES',
    blurb: 'An asymmetric encryption / decryption tool.',
    year: '2018',
    langs: ['C#'],
    tech: ['Windows Forms'],
    image: '/projects/aes.png',
    links: [
      { kind: 'youtube', href: 'https://youtu.be/Iov2HXSEtPs' },
      { kind: 'repo', href: 'https://github.com/InveterateCoder/AES' },
      { kind: 'download', href: '/downloads/AES.zip' },
    ],
  },
  {
    slug: 'volbar7',
    name: 'VolBar7',
    blurb: 'A custom volume bar for Windows.',
    year: '2017',
    langs: ['C++'],
    tech: ['Win32 API', 'COM'],
    image: '/projects/volbar.png',
    links: [
      { kind: 'youtube', href: 'https://youtu.be/1dXGOJ3Hx0Y' },
      { kind: 'repo', href: 'https://github.com/InveterateCoder/volBar7' },
      { kind: 'download', href: '/downloads/volBar7.zip' },
    ],
  },
  {
    slug: 'ansi',
    name: 'ansi',
    blurb: 'An ANSI-formatted text editor.',
    year: '2017',
    langs: ['C++'],
    tech: ['Win32 API'],
    image: '/projects/ansi.png',
    links: [
      { kind: 'youtube', href: 'https://youtu.be/Q-6gxdIslSk' },
      { kind: 'repo', href: 'https://github.com/InveterateCoder/ansi' },
      { kind: 'download', href: '/downloads/ansi.zip' },
    ],
  },
  {
    slug: 'wwwwindows',
    name: 'wwwwindows',
    blurb: 'A small JS library for draggable windows on web pages.',
    year: '2017',
    langs: ['JavaScript'],
    tech: ['jQuery'],
    image: '/projects/wwwwindows.png',
    links: [
      { kind: 'youtube', href: 'https://youtu.be/EGEYM_pgX0M' },
      { kind: 'repo', href: 'https://github.com/InveterateCoder/wwwwindows' },
      { kind: 'download', href: '/downloads/wwwwindows.zip' },
    ],
  },
  {
    slug: 'english-chatter',
    name: 'English Chatter',
    blurb: 'A chat room that stored its data in XML files.',
    year: '2016',
    langs: ['PHP', 'JavaScript'],
    tech: ['Web'],
    image: '/projects/ec.png',
    links: [
      { kind: 'repo', href: 'https://github.com/InveterateCoder/engchatter' },
      { kind: 'live', href: 'http://engchatter.c1.biz', dead: true },
    ],
  },
  {
    slug: 'tic-tac-toe',
    name: 'Tic-Tac-Toe',
    blurb: 'A one-player browser game.',
    year: '2016',
    langs: ['JavaScript'],
    tech: ['Web'],
    image: '/projects/tictactoe.png',
    links: [
      { kind: 'repo', href: 'https://github.com/InveterateCoder/TicTacToe' },
      { kind: 'live', href: 'http://tictactoe.rf.gd', dead: true },
    ],
  },
] satisfies Project[]
