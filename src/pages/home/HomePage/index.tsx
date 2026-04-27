import { useEffect } from 'react'
import { ExpertiseSection } from './components/ExpertiseSection'
import { HeroSection } from './components/HeroSection'
import { SiteFooter } from './components/SiteFooter'
import styles from './HomePage.module.css'

type HomePageProps = {
  scrollToId?: 'work' | 'about' | 'skills' | 'contact'
}

function scrollToSection(id: NonNullable<HomePageProps['scrollToId']>) {
  const el = document.getElementById(id)
  if (!el) return

  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function HomePage({ scrollToId }: HomePageProps) {
  useEffect(() => {
    if (!scrollToId) return
    scrollToSection(scrollToId)
  }, [scrollToId])

  return (
    <div className={styles.root}>
      <div id="work" />
      <section id="about">
        <HeroSection />
      </section>
      <section id="skills">
        <ExpertiseSection />
      </section>
      <div id="contact">
        <SiteFooter />
      </div>
    </div>
  )
}
