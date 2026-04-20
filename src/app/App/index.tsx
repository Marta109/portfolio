import { useState } from 'react'
import { ConfigProvider, theme } from 'antd'
import { PortfolioLayout } from '@/layouts/PortfolioLayout'
import { HomePage } from '@/pages/home/HomePage'

export default function App() {
  const [isDark, setIsDark] = useState(true)

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#8B5CF6',
          colorBgLayout: '#05070A',
          colorBgContainer: 'rgba(10, 25, 47, 0.85)',
          colorText: 'rgba(255, 255, 255, 0.92)',
          colorTextSecondary: 'rgba(255, 255, 255, 0.55)',
          colorBorderSecondary: 'rgba(255, 255, 255, 0.12)',
          fontFamily: `'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
          borderRadiusLG: 16,
        },
      }}
    >
      <PortfolioLayout isDark={isDark} onToggleTheme={() => setIsDark((v) => !v)}>
        <HomePage />
      </PortfolioLayout>
    </ConfigProvider>
  )
}
