import { Background } from '@/components/layout/Background'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/sections/Hero'
import { About } from '@/sections/About'
import { Skills } from '@/sections/Skills'
import { Experience } from '@/sections/Experience'
import { Projects } from '@/sections/Projects'
import { Vibecoding } from '@/sections/Vibecoding'
import { GoLinux } from '@/sections/GoLinux'
import { Contact } from '@/sections/Contact'

export function Home() {
  return (
    <>
      <Background />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Vibecoding />
        <GoLinux />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
