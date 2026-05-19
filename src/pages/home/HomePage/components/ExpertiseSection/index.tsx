import {Typography} from 'antd'
import {TECH_STACK} from '../../constants'
import styles from './ExpertiseSection.module.css'
import {TechTile} from './TechTile'

const {Title, Paragraph, Text} = Typography

export function ExpertiseSection() {
  return (
    <section className={styles.section} aria-labelledby="expertise-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <Text className={styles.kicker}>EXPERTISE</Text>
          <Title level={2} id="expertise-heading" className={styles.pageTitle}>
            Mastery & Toolkit
          </Title>
          <Paragraph className={styles.lead}>
            Built web applications using HTML, CSS, JavaScript, and TypeScript without third-party
            libraries.
          </Paragraph>
        </header>

        <div className={styles.showcase}>
          <div className={styles.grid} role="list">
            {TECH_STACK.map((tech) => (
              <TechTile key={tech.key} tech={tech} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
