import { Button, Space, Typography } from 'antd'
import './HomePage.css'

const { Title, Paragraph } = Typography

export function HomePage() {
  return (
    <Space direction="vertical" size="large" className="home-page__stack">
      <Title level={2}>Frontend developer</Title>
      <Paragraph>
        This is a minimal starting point. Add your bio, projects, and contact details here, or
        introduce new pages under <code>src/pages</code> and compose them in <code>App.tsx</code>.
      </Paragraph>
      <Button type="primary">Primary call to action</Button>
    </Space>
  )
}
