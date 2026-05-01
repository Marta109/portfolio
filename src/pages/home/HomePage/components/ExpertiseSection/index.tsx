import { Card, Col, Flex, Progress, Row, Typography } from 'antd'
import { SKILLS } from '../../constants'
import styles from '../../HomePage.module.css'

const { Title, Paragraph, Text } = Typography

const THEME_CLASS: Record<(typeof SKILLS)[number]['themeKey'], string> = {
  react: styles.skillCardReact,
  ts: styles.skillCardTs,
  tailwind: styles.skillCardTailwind,
  js: styles.skillCardJs,
  html: styles.skillCardHtml,
  design: styles.skillCardDesign,
}

export function ExpertiseSection() {
  return (
    <section className={styles.expertise} aria-labelledby="expertise-heading">
      <Row gutter={[32, 24]} className={styles.expertiseHeader} align="top">
        <Col xs={24} lg={14}>
          <Text className={styles.kicker}>EXPERTISE</Text>
          <Title level={2} id="expertise-heading" className={styles.sectionTitle}>
            <span className={styles.sectionTitleMastery}>Mastery</span>
            <span className={styles.sectionTitleRest}> & Toolkit</span>
          </Title>
        </Col>
        <Col xs={24} lg={10}>
          <Paragraph className={styles.expertiseLead}>
            Skilled in designing intuitive interfaces, solving complex technical problems, and eager
            to contribute to innovative projects.
          </Paragraph>
        </Col>
      </Row>

      <Row gutter={[24, 24]} className={styles.skillGrid}>
        {SKILLS.map((skill) => {
          const Icon = skill.Icon
          return (
            <Col key={skill.key} xs={24} md={12} lg={8}>
              <Card bordered={false} className={`${styles.skillCard} ${THEME_CLASS[skill.themeKey]}`}>
                <Flex vertical gap="middle">
                  <Flex justify="space-between" align="flex-start" gap="small">
                    <div className={styles.skillIconShell}>
                      <Icon className={styles.skillIcon} aria-hidden />
                    </div>
                    <Text className={styles.skillLevel}>{skill.level}</Text>
                  </Flex>
                  <Title level={4} className={styles.skillTitle}>
                    {skill.title}
                  </Title>
                  <Paragraph className={styles.skillDesc}>{skill.description}</Paragraph>
                  <div className={styles.skillMeter}>
                    <Flex justify="space-between" align="baseline" className={styles.skillMeterHead}>
                      <Text className={styles.skillProfLabel}>PROFICIENCY</Text>
                      <Text className={styles.skillPct}>{skill.percent}%</Text>
                    </Flex>
                    <Progress
                      percent={skill.percent}
                      showInfo={false}
                      strokeWidth={5}
                      trailColor="rgba(255, 255, 255, 0.08)"
                      strokeColor={{
                        '0%': skill.strokeFrom,
                        '100%': skill.strokeTo,
                      }}
                    />
                  </div>
                </Flex>
              </Card>
            </Col>
          )
        })}
      </Row>
    </section>
  )
}

