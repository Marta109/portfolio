import { ExpertiseSection } from './components/ExpertiseSection'
import { HeroSection } from './components/HeroSection'
import { SiteFooter } from './components/SiteFooter'
import styles from './HomePage.module.css'

export function HomePage() {
  return (
    <div className={styles.root}>
      <HeroSection />
      <ExpertiseSection />
      <SiteFooter />
    </div>
  )
}
