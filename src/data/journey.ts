import type { JourneyStep } from './types'

/**
 * The technology journey — the climb from bare metal up to Go, told as a
 * chapter per language. First-person, honest, and personal. `ru` overrides
 * every string; the shape lives here.
 */
export const journey = {
  eyebrow: 'The path',
  title: 'From bare metal to Go',
  subtitle:
    'The book lit the fuse. What followed was a decade of climbing the stack — one language, one obsession at a time.',
  steps: [
    {
      tag: 'Assembly',
      title: 'Straight to the metal',
      body: "Tanenbaum's book sent me as deep as I could go. In Assembly I finally saw what really happens under the hood — but it was far too low to build anything real.",
    },
    {
      tag: 'C / C++',
      title: 'One rung up, into Windows',
      body: 'So I climbed a level and started writing system apps in C and C++ — for Windows, my daily OS back then, long before I fell for Linux.',
    },
    {
      tag: 'C# · .NET',
      title: 'Framework over ceremony',
      body: 'Win32 was pure ceremony: define a window procedure, register a window class, instantiate the window, run a message loop — all just to put something on screen. I wanted to build apps, not plumbing. Framework or a new language? I picked C# and .NET — shipping to the Microsoft Store and, via Xamarin, to Android.',
    },
    {
      tag: 'ASP.NET MVC',
      title: 'The backend was always missing',
      body: 'Every app idea kept hitting the same wall — it needed a backend. ASP.NET MVC was the first one I learned.',
    },
    {
      tag: 'JavaScript · HTML · CSS',
      title: 'Pulled into the web',
      body: 'Back then, one codebase that ran everywhere was painful — except on the web. I picked up JavaScript, HTML and CSS3 and got completely pulled in. Projects like Rooms — a real, working chat app that gathered a small crowd online — ran .NET on the back and React on the front.',
    },
    {
      tag: 'Node.js → TypeScript',
      title: 'One language, whole stack',
      body: 'Then I bumped into Node.js and instantly saw it: the entire codebase in a single language. Too good to pass up — I migrated fully to JavaScript, and then to TypeScript.',
    },
    {
      tag: 'Backend',
      title: 'Choosing a side',
      body: "Commercial work taught me full-stack isn't all that practical — teams always split into front and back. I had to choose. I chose backend.",
    },
    {
      tag: 'Python & Rust',
      title: 'Detours, out of pure curiosity',
      body: 'Curiosity kept pulling me sideways. Python came easy — three books deep, even a little machine learning. Rust was the bigger leap: a genuinely new way of thinking about code. I read the book every Rustacean starts with — The Rust Programming Language — and loved it, though back then it was still young and thin on crates, so you wrote much of the logic yourself.',
    },
    {
      tag: 'Go',
      title: 'And then, Go',
      body: "Right after Rust, I met Go — and started falling for it. Yes, it's garbage-collected — but it's fast (especially with enough green tea in the tank). Yes, it's simple — but all the great things are. It feels like writing JavaScript and C++ at once, in one codebase. I love it.",
    },
  ] as JourneyStep[],
  mentionsTitle: 'Honorable mentions',
  mentions:
    'I spent real time with Kotlin and Android too — but it was one world too many, and I chose the Web yet again. And Linux? That is its own story: rough at the start, and now the only OS I run. More on that further down.',
}
