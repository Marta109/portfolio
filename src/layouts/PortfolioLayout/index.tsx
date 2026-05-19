import type {ReactNode} from "react";
import {Button, Flex, Layout, Typography} from "antd";
import {MoonOutlined, SunOutlined} from "@ant-design/icons";
import {useLocation, useNavigate} from "react-router-dom";
import styles from "./PortfolioLayout.module.css";

const {Header, Content} = Layout;

const NAV_KEYS = ["about", "work", "skills", "contact", "resume"] as const;
type NavKey = (typeof NAV_KEYS)[number];
type NavRouteKey = NavKey | "ai";

type PortfolioLayoutProps = {
  children: ReactNode;
  isDark: boolean;
  onToggleTheme: () => void;
};

const NAV_LABEL: Record<NavKey, string> = {
  work: "Projects",
  about: "Home",
  skills: "Skills",
  contact: "Contact",
  resume: "Resume",
};

const NAV_ROUTE: Record<NavRouteKey, string> = {
  work: "/projects",
  about: "/",
  skills: "/skills",
  contact: "/contact",
  resume: "/resume",
  ai: "/ai-playground",
};

export function PortfolioLayout({children, isDark, onToggleTheme}: PortfolioLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const themeMode = isDark ? "dark" : "light";
  const layoutClassName = styles.layout;
  const pathname = location.pathname;

  const isRouteActive = (key: NavRouteKey) => {
    if (key === "about") {
      return pathname === "/";
    }
    const route = NAV_ROUTE[key];
    return pathname === route || pathname.startsWith(`${route}/`);
  };

  return (
    <Layout className={layoutClassName} data-theme={themeMode}>
      <Header className={styles.header}>
        <Flex
          align="center"
          justify="space-between"
          className={styles.headerBar}
          wrap="wrap"
          gap="middle">
          <Typography.Text
            strong
            className={styles.logo}
            role="button"
            tabIndex={0}
            onClick={() => navigate("/")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") navigate("/");
            }}>
            Marta Dev
          </Typography.Text>
          <Flex gap="small" className={styles.nav} wrap={false}>
            {NAV_KEYS.map((key) => (
              <Button
                key={key}
                type="text"
                className={
                  isRouteActive(key) ? `${styles.navBtn} ${styles.navBtnActive}` : styles.navBtn
                }
                onClick={() => navigate(NAV_ROUTE[key])}>
                {NAV_LABEL[key]}
              </Button>
            ))}
            <Button
              type="text"
              className={
                isRouteActive("ai") ? `${styles.navBtn} ${styles.navBtnActive}` : styles.navBtn
              }
              onClick={() => navigate(NAV_ROUTE.ai)}>
              <span className={styles.navAiLabelFull}>Ask About Marta</span>
              <span className={styles.navAiLabelShort}>Ask Marta</span>
            </Button>
          </Flex>
          <Flex gap="small" align="center" className={styles.headerActions}>
            <Button
              type="text"
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              onClick={onToggleTheme}
              className={`${styles.themeToggle} ${isDark ? styles.themeToggleDark : styles.themeToggleLight}`}>
              <span className={styles.themeToggleIcon} aria-hidden>
                {isDark ? <SunOutlined /> : <MoonOutlined />}
              </span>
            </Button>
            <Button type="primary" className={styles.resumeBtn} onClick={() => navigate("/resume")}>
              Resume
            </Button>
          </Flex>
        </Flex>
      </Header>
      <Content className={styles.content}>{children}</Content>
    </Layout>
  );
}
