import { Flex, Space, Typography } from 'antd'
import styles from '../../HomePage.module.css'

const { Text, Link } = Typography

export function SiteFooter() {
  return (
    <footer className={styles.siteFooter}>
      <Flex
        justify="space-between"
        align="center"
        wrap="wrap"
        gap="middle"
        className={styles.siteFooterInner}
      >
        <Text className={styles.footerCopy}>© 2026 Marta Hayrapetyan. All rights reserved.</Text>
        <Space size="large" className={styles.footerLinks}>
          <Link href="https://github.com/Marta109" className={styles.footerLink}>
            GitHub
          </Link>
          <Link href="https://discord.com/users/marta.a.h" className={styles.footerLink}>
            Discord
          </Link>
          <Link href="https://linkedin.com/in/martahayrapetyan" className={styles.footerLink}>
            LinkedIn
          </Link>
        </Space>
      </Flex>
    </footer>
  )
}

