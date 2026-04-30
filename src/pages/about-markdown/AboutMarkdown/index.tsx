import ReactMarkdown from 'react-markdown'
import { Card, Typography } from 'antd'
import savedResponsesMd from '@/content/savedResponses.md?raw'
import styles from './AboutMarkdown.module.css'

export function AboutMarkdown() {
  return (
    <div className={styles.root}>
      <Typography.Title level={2} className={styles.title}>
        About
      </Typography.Title>
      <Typography.Paragraph className={styles.subtitle}>
        Static markdown content from <code>src/content/savedResponses.md</code>
      </Typography.Paragraph>

      <Card className={styles.card}>
        <div className={styles.markdown}>
          <ReactMarkdown>{savedResponsesMd}</ReactMarkdown>
        </div>
      </Card>
    </div>
  )
}