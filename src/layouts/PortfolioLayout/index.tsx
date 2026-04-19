import type { ReactNode } from 'react'
import { Layout, Typography } from 'antd'
import './PortfolioLayout.css'

const { Header, Content, Footer } = Layout

type PortfolioLayoutProps = {
  children: ReactNode
}

export function PortfolioLayout({ children }: PortfolioLayoutProps) {
  return (
    <Layout className="portfolio-layout">
      <Header className="portfolio-layout__header">
        <Typography.Text strong className="portfolio-layout__brand">
          Portfolio
        </Typography.Text>
      </Header>
      <Content className="portfolio-layout__content">{children}</Content>
      <Footer className="portfolio-layout__footer">
        React · TypeScript · Vite · Ant Design
      </Footer>
    </Layout>
  )
}
