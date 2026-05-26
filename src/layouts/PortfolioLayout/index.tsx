import {useEffect, useState, type ReactNode} from "react";
import {Button, Flex, Layout, Typography} from "antd";
import {CloseOutlined, MenuOutlined, MoonOutlined, SunOutlined} from "@ant-design/icons";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

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
              className={styles.mobileMenuButton}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setIsMobileMenuOpen((value) => !value)}
              icon={isMobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
            />
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
      <div
        className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.mobileMenuOverlayOpen : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-nav-title">
        <div className={styles.mobileMenuPanel} onClick={(event) => event.stopPropagation()}>
          <div className={styles.mobileMenuHeader}>
            <Typography.Text id="mobile-nav-title" className={styles.mobileMenuTitle}>
              Menu
            </Typography.Text>
            <Button
              type="text"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              icon={<CloseOutlined />}
              className={styles.mobileMenuClose}
            />
          </div>
          <nav id="mobile-nav" className={styles.mobileMenuNav} aria-label="Mobile navigation">
            {NAV_KEYS.map((key) => (
              <Button
                key={key}
                type="text"
                block
                size="large"
                className={
                  isRouteActive(key)
                    ? `${styles.mobileMenuItem} ${styles.mobileMenuItemActive}`
                    : styles.mobileMenuItem
                }
                onClick={() => {
                  navigate(NAV_ROUTE[key]);
                  setIsMobileMenuOpen(false);
                }}>
                {NAV_LABEL[key]}
              </Button>
            ))}
            <Button
              type="text"
              block
              size="large"
              className={
                isRouteActive("ai")
                  ? `${styles.mobileMenuItem} ${styles.mobileMenuItemActive}`
                  : styles.mobileMenuItem
              }
              onClick={() => {
                navigate(NAV_ROUTE.ai);
                setIsMobileMenuOpen(false);
              }}>
              Ask Marta
            </Button>
          </nav>
          <div className={styles.mobileMenuFooter}>
            <Button
              type="default"
              className={styles.themeToggle}
              onClick={onToggleTheme}
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}>
              <span className={styles.themeToggleIcon} aria-hidden>
                {isDark ? <SunOutlined /> : <MoonOutlined />}
              </span>
            </Button>
            <Button
              type="primary"
              block
              className={styles.mobileResumeBtn}
              onClick={() => {
                navigate("/resume");
                setIsMobileMenuOpen(false);
              }}>
              Resume
            </Button>
          </div>
        </div>
      </div>
      <Content className={styles.content}>{children}</Content>
    </Layout>
  );
}
