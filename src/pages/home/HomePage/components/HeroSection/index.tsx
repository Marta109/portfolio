import { ArrowRightOutlined, CaretRightOutlined, DeploymentUnitOutlined } from '@ant-design/icons'
import { Button, Card, Col, Flex, Image, Row, Space, Tag, Typography } from 'antd'
import styles from '../../HomePage.module.css'

const { Title, Paragraph, Text } = Typography

export function HeroSection() {
  return (
    <Row gutter={[40, 48]} align="middle" className={styles.hero}>
      <Col xs={24} lg={14}>
        <Space direction="vertical" size="large" className={styles.left}>
          <Tag className={styles.badge}>
            <Flex align="center" gap="small">
              <span className={styles.badgeDot} aria-hidden />
              AVAILABLE FOR NEW PROJECTS
            </Flex>
          </Tag>
          <div>
            <Title level={1} className={styles.title}>
              Hi, I&apos;m Marta —
            </Title>
            <Title level={1} className={`${styles.title} ${styles.titleGradient}`}>
              Frontend Developer
            </Title>
          </div>
          <Paragraph className={styles.lead}>
            I build fast, accessible interfaces with JavaScript and TypeScript — balancing aesthetics,
            performance, and maintainable code for products people enjoy using.
          </Paragraph>
          <Flex gap="middle" wrap="wrap" className={styles.ctas}>
            <Button type="primary" size="large" className={styles.btnPrimary}>
              View Projects
            </Button>
            <Button size="large" className={styles.btnCv}>
              Download CV
            </Button>
            <Button
              type="link"
              size="large"
              className={styles.btnContact}
              icon={<ArrowRightOutlined />}
              iconPosition="end"
            >
              Contact Me
            </Button>
          </Flex>
          <Card size="small" className={styles.introCard} bordered={false}>
            <Flex align="center" gap="middle">
              <Button
                type="primary"
                shape="circle"
                size="large"
                icon={<CaretRightOutlined />}
                className={styles.playBtn}
                aria-label="Play voice introduction"
              />
              <div>
                <Text type="secondary" className={styles.introLabel}>
                  INTRODUCTION
                </Text>
                <div>
                  <Text strong className={styles.introTitle}>
                    Play Voice Intro
                  </Text>
                </div>
              </div>
            </Flex>
          </Card>
        </Space>
      </Col>
      <Col xs={24} lg={10}>
        <div className={styles.visual}>
          <div className={styles.photoFrame}>
            <Image src="/marta-photo.png" alt="Marta" preview={false} rootClassName={styles.photo} />
          </div>
          <div className={`${styles.floatOrbit} ${styles.floatOrbitReact}`} aria-hidden>
            <Card size="small" className={`${styles.float} ${styles.floatReact}`} bordered={false}>
              <DeploymentUnitOutlined className={styles.floatIcon} />
              <div className={styles.floatLabel}>REACT</div>
            </Card>
          </div>
          <div className={`${styles.floatOrbit} ${styles.floatOrbitJs}`} aria-hidden>
            <Card size="small" className={`${styles.float} ${styles.floatJs}`} bordered={false}>
              <div className={styles.floatJsText}>JS</div>
              <div className={styles.floatLabel}>JavaScript</div>
            </Card>
          </div>
          <div className={`${styles.floatOrbit} ${styles.floatOrbitTs}`} aria-hidden>
            <Card size="small" className={`${styles.float} ${styles.floatTs}`} bordered={false}>
              <div className={styles.floatTsText}>&lt; &gt;</div>
              <div className={styles.floatLabel}>TS</div>
            </Card>
          </div>
        </div>
      </Col>
    </Row>
  )
}

