import { useState } from 'react'
import type { ReactNode } from 'react'
import { Button, Flex, Layout, Typography } from 'antd'
import { SunOutlined } from '@ant-design/icons'
import './PortfolioLayout.css'

const { Header, Content } = Layout

const NAV_KEYS = ['work', 'about', 'skills', 'contact'] as const
type NavKey = (typeof NAV_KEYS)[number]

type PortfolioLayoutProps = {
  children: ReactNode
  isDark: boolean
  onToggleTheme: () => void
}

const NAV_LABEL: Record<NavKey, string> = {
  work: 'Work',
  about: 'About',
  skills: 'Skills',
  contact: 'Contact',
}

export function PortfolioLayout({ children, isDark, onToggleTheme }: PortfolioLayoutProps) {
  const [activeNav, setActiveNav] = useState<NavKey>('skills')

  return (
    <Layout className={isDark ? 'portfolio-layout' : 'portfolio-layout portfolio-layout--light'}>
      <Header className="portfolio-layout__header">
        <Flex align="center" justify="space-between" className="portfolio-layout__header-bar" wrap="wrap" gap="middle">
          <Typography.Text strong className="portfolio-layout__logo">
            Marta.dev
          </Typography.Text>
          <Flex gap="small" className="portfolio-layout__nav" wrap="wrap">
            {NAV_KEYS.map((key) => (
              <Button
                key={key}
                type="text"
                className={
                  activeNav === key
                    ? 'portfolio-layout__nav-btn portfolio-layout__nav-btn--active'
                    : 'portfolio-layout__nav-btn'
                }
                onClick={() => setActiveNav(key)}
              >
                {NAV_LABEL[key]}
              </Button>
            ))}
          </Flex>
          <Flex gap="small" align="center">
            <Button
              type="text"
              icon={<SunOutlined />}
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              onClick={onToggleTheme}
              className="portfolio-layout__icon-btn"
            />
            <Button type="primary" className="portfolio-layout__resume-btn">
              Resume
            </Button>
          </Flex>
        </Flex>
      </Header>
      <Content className="portfolio-layout__content">{children}</Content>
    </Layout>
  )
}
