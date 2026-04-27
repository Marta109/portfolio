import { useState } from 'react'
import { ConfigProvider, theme } from 'antd'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { PortfolioLayout } from '@/layouts/PortfolioLayout'
import { HomePage } from '@/pages/home/HomePage'
import { AboutPage } from '@/pages/about/AboutPage'
import { AIPlayground } from '@/pages/ai-playground/AIPlayground'

export default function App() {
  const [isDark, setIsDark] = useState(true)

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#8B5CF6',
          colorBgLayout: isDark ? '#05070A' : '#f4f6fb',
          colorBgContainer: isDark ? 'rgba(10, 25, 47, 0.85)' : 'rgba(255, 255, 255, 0.92)',
          colorText: isDark ? 'rgba(255, 255, 255, 0.92)' : 'rgba(15, 23, 42, 0.92)',
          colorTextSecondary: isDark ? 'rgba(255, 255, 255, 0.55)' : 'rgba(15, 23, 42, 0.65)',
          colorBorderSecondary: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(15, 23, 42, 0.12)',
          fontFamily: `'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
          borderRadiusLG: 16,
        },
      }}
    >
      <BrowserRouter>
        <PortfolioLayout isDark={isDark} onToggleTheme={() => setIsDark((v) => !v)}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/work" element={<HomePage scrollToId="work" />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/skills" element={<HomePage scrollToId="skills" />} />
            <Route path="/contact" element={<HomePage scrollToId="contact" />} />
            <Route path="/ai-playground" element={<AIPlayground />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PortfolioLayout>
      </BrowserRouter>
    </ConfigProvider>
  )
}
