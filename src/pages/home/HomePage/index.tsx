import {
  ArrowRightOutlined,
  BlockOutlined,
  BgColorsOutlined,
  CaretRightOutlined,
  ConsoleSqlOutlined,
  DeploymentUnitOutlined,
  HighlightOutlined,
  LayoutOutlined,
  VerifiedOutlined,
} from '@ant-design/icons'
import type { ComponentType } from 'react'
import { Button, Card, Col, Flex, Image, Progress, Row, Space, Tag, Typography } from 'antd'
import './HomePage.css'

const { Title, Paragraph, Text, Link } = Typography

type SkillIcon = ComponentType<{ className?: string }>

type SkillItem = {
  key: string
  themeKey: string
  title: string
  level: string
  description: string
  percent: number
  strokeFrom: string
  strokeTo: string
  Icon: SkillIcon
}

const SKILLS: SkillItem[] = [
  {
    key: 'react',
    themeKey: 'react',
    title: 'React',
    level: 'Advanced',
    description:
      'Modern hooks, state management with Redux/Zustand, and performance optimization.',
    percent: 95,
    strokeFrom: '#8b5cf6',
    strokeTo: '#6366f1',
    Icon: BlockOutlined,
  },
  {
    key: 'typescript',
    themeKey: 'ts',
    title: 'TypeScript',
    level: 'Expert',
    description: 'Type-safe development, generic patterns, and interface-driven architectural design.',
    percent: 90,
    strokeFrom: '#38bdf8',
    strokeTo: '#14b8a6',
    Icon: VerifiedOutlined,
  },
  {
    key: 'tailwind',
    themeKey: 'tailwind',
    title: 'Tailwind CSS',
    level: 'Master',
    description: 'Complex layouts, custom design systems, and utility-first styling at scale.',
    percent: 98,
    strokeFrom: '#fb923c',
    strokeTo: '#f97316',
    Icon: BgColorsOutlined,
  },
  {
    key: 'vanilla',
    themeKey: 'js',
    title: 'JavaScript (Vanilla)',
    level: 'Core',
    description: 'ES6+, asynchronous programming, DOM manipulation, and functional logic.',
    percent: 95,
    strokeFrom: '#7dd3fc',
    strokeTo: '#38bdf8',
    Icon: ConsoleSqlOutlined,
  },
  {
    key: 'htmlcss',
    themeKey: 'html',
    title: 'HTML & CSS',
    level: 'Expert',
    description: 'Semantic markup, CSS Grid/Flexbox, animations, and responsive architecture.',
    percent: 98,
    strokeFrom: '#c084fc',
    strokeTo: '#a855f7',
    Icon: LayoutOutlined,
  },
  {
    key: 'design',
    themeKey: 'design',
    title: 'Design Systems',
    level: 'Creative',
    description: 'Figma to code workflows, component documentation, and brand integrity.',
    percent: 85,
    strokeFrom: '#fcd9a8',
    strokeTo: '#fdba74',
    Icon: HighlightOutlined,
  },
]

export function HomePage() {
  return (
    <div className="home-page">
      <Row gutter={[40, 48]} align="middle" className="home-page__hero">
        <Col xs={24} lg={14}>
          <Space direction="vertical" size="large" className="home-page__left">
            <Tag className="home-page__badge">
              <Flex align="center" gap="small">
                <span className="home-page__badge-dot" aria-hidden />
                AVAILABLE FOR NEW PROJECTS
              </Flex>
            </Tag>
            <div>
              <Title level={1} className="home-page__title">
                Hi, I&apos;m Marta —
              </Title>
              <Title level={1} className="home-page__title home-page__title--gradient">
                Frontend Developer
              </Title>
            </div>
            <Paragraph className="home-page__lead">
              I build fast, accessible interfaces with JavaScript and TypeScript — balancing aesthetics,
              performance, and maintainable code for products people enjoy using.
            </Paragraph>
            <Flex gap="middle" wrap="wrap" className="home-page__ctas">
              <Button type="primary" size="large" className="home-page__btn-primary">
                View Projects
              </Button>
              <Button size="large" className="home-page__btn-cv">
                Download CV
              </Button>
              <Button
                type="link"
                size="large"
                className="home-page__btn-contact"
                icon={<ArrowRightOutlined />}
                iconPosition="end"
              >
                Contact Me
              </Button>
            </Flex>
            <Card size="small" className="home-page__intro-card" bordered={false}>
              <Flex align="center" gap="middle">
                <Button
                  type="primary"
                  shape="circle"
                  size="large"
                  icon={<CaretRightOutlined />}
                  className="home-page__play-btn"
                  aria-label="Play voice introduction"
                />
                <div>
                  <Text type="secondary" className="home-page__intro-label">
                    INTRODUCTION
                  </Text>
                  <div>
                    <Text strong className="home-page__intro-title">
                      Play Voice Intro
                    </Text>
                  </div>
                </div>
              </Flex>
            </Card>
          </Space>
        </Col>
        <Col xs={24} lg={10}>
          <div className="home-page__visual">
            <div className="home-page__photo-frame">
              <Image
                src="/marta-photo.png"
                alt="Marta"
                preview={false}
                rootClassName="home-page__photo"
              />
            </div>
            <div className="home-page__float-orbit home-page__float-orbit--react" aria-hidden>
              <Card size="small" className="home-page__float home-page__float--react" bordered={false}>
                <DeploymentUnitOutlined className="home-page__float-icon" />
                <div className="home-page__float-label">REACT</div>
              </Card>
            </div>
            <div className="home-page__float-orbit home-page__float-orbit--js" aria-hidden>
              <Card size="small" className="home-page__float home-page__float--js" bordered={false}>
                <div className="home-page__float-js">JS</div>
                <div className="home-page__float-label">JavaScript</div>
              </Card>
            </div>
            <div className="home-page__float-orbit home-page__float-orbit--ts" aria-hidden>
              <Card size="small" className="home-page__float home-page__float--ts" bordered={false}>
                <div className="home-page__float-ts">&lt; &gt;</div>
                <div className="home-page__float-label">TS</div>
              </Card>
            </div>
          </div>
        </Col>
      </Row>

      <section className="home-page__expertise" aria-labelledby="expertise-heading">
        <Row gutter={[32, 24]} className="home-page__expertise-header" align="top">
          <Col xs={24} lg={14}>
            <Text className="home-page__kicker">EXPERTISE</Text>
            <Title level={2} id="expertise-heading" className="home-page__section-title">
              <span className="home-page__section-title-mastery">Mastery</span>
              <span className="home-page__section-title-rest"> & Toolkit</span>
            </Title>
          </Col>
          <Col xs={24} lg={10}>
            <Paragraph className="home-page__expertise-lead">
              Bridging the gap between design systems and scalable frontend architectures.
            </Paragraph>
          </Col>
        </Row>

        <Row gutter={[24, 24]} className="home-page__skill-grid">
          {SKILLS.map((skill) => {
            const Icon = skill.Icon
            return (
              <Col key={skill.key} xs={24} md={12} lg={8}>
                <Card
                  bordered={false}
                  className={`home-page__skill-card home-page__skill-card--${skill.themeKey}`}
                >
                  <Flex vertical gap="middle">
                    <Flex justify="space-between" align="flex-start" gap="small">
                      <div className="home-page__skill-icon-shell">
                        <Icon className="home-page__skill-icon" aria-hidden />
                      </div>
                      <Text className="home-page__skill-level">{skill.level}</Text>
                    </Flex>
                    <Title level={4} className="home-page__skill-title">
                      {skill.title}
                    </Title>
                    <Paragraph className="home-page__skill-desc">{skill.description}</Paragraph>
                    <div className="home-page__skill-meter">
                      <Flex justify="space-between" align="baseline" className="home-page__skill-meter-head">
                        <Text className="home-page__skill-prof-label">PROFICIENCY</Text>
                        <Text className="home-page__skill-pct">{skill.percent}%</Text>
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

      <footer className="home-page__site-footer">
        <Flex justify="space-between" align="center" wrap="wrap" gap="middle" className="home-page__site-footer-inner">
          <Text className="home-page__footer-copy">© 2024 Marta Hayrapetyan. All rights reserved.</Text>
          <Space size="large" className="home-page__footer-links">
            <Link href="https://github.com/Marta109" className="home-page__footer-link">
              GitHub
            </Link>
            <Link href="#" className="home-page__footer-link">
              LinkedIn
            </Link>
            <Link href="#" className="home-page__footer-link">
              Twitter
            </Link>
          </Space>
        </Flex>
      </footer>
    </div>
  )
}
