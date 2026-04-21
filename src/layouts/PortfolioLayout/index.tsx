import { useState } from 'react'
import type { ReactNode } from 'react'
import { Button, Flex, Layout, Typography } from 'antd'
import { SunOutlined } from '@ant-design/icons'
import styles from './PortfolioLayout.module.css'

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
  const themeMode = isDark ? 'dark' : 'light'
  const layoutClassName = isDark ? styles.layout : `${styles.layout} ${styles.layoutLight}`

  return (
    <Layout className={layoutClassName} data-theme={themeMode}>
      <Header className={styles.header}>
        <Flex
          align="center"
          justify="space-between"
          className={styles.headerBar}
          wrap="wrap"
          gap="middle"
        >
          <Typography.Text strong className={styles.logo}>
            Marta.dev
          </Typography.Text>
          <Flex gap="small" className={styles.nav} wrap="wrap">
            {NAV_KEYS.map((key) => (
              <Button
                key={key}
                type="text"
                className={activeNav === key ? `${styles.navBtn} ${styles.navBtnActive}` : styles.navBtn}
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
              className={styles.iconBtn}
            />
            <Button type="primary" className={styles.resumeBtn}>
              Resume
            </Button>
          </Flex>
        </Flex>
      </Header>
      <Content className={styles.content}>{children}</Content>
    </Layout>
  )
}
