import { ConfigProvider } from 'antd'
import { PortfolioLayout } from '@/layouts/PortfolioLayout'
import { HomePage } from '@/pages/home/HomePage'

export default function App() {
  return (
    <ConfigProvider>
      <PortfolioLayout>
        <HomePage />
      </PortfolioLayout>
    </ConfigProvider>
  )
}
