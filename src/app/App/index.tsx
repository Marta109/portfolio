import {useEffect, useMemo, useState} from "react";
import {App as AntApp, ConfigProvider, theme} from "antd";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {PortfolioLayout} from "@/layouts/PortfolioLayout";
import {AboutPage} from "@/pages/about/AboutPage";
import {AboutMarkdown} from "@/pages/about-markdown/AboutMarkdown";
import {AIPlayground} from "@/pages/ai-playground/AIPlayground";
import {ContactPage} from "@/pages/contact/ContactPage";
import {ResumePage} from "@/pages/resume/ResumePage";
import {ProjectsPage} from "@/pages/projects/ProjectsPage";

export default function App() {
  const [isDark, setIsDark] = useState(true);

  const themeToken = useMemo(
    () => ({
      colorPrimary: "#6366f1",
      colorBgLayout: isDark ? "#070a12" : "#edeaf4",
      colorBgContainer: isDark ? "rgba(14, 20, 38, 0.92)" : "#ffffff",
      colorBgElevated: isDark ? "rgba(18, 26, 48, 0.96)" : "#faf9ff",
      colorText: isDark ? "#f8fafc" : "#1a1f36",
      colorTextSecondary: isDark ? "#cbd5e1" : "#3d4466",
      colorTextPlaceholder: isDark ? "rgba(148, 163, 184, 0.75)" : "#7a8299",
      colorBorder: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(71, 77, 115, 0.22)",
      colorBorderSecondary: isDark ? "rgba(255, 255, 255, 0.09)" : "rgba(71, 77, 115, 0.14)",
      fontFamily: `'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
      borderRadius: 12,
      borderRadiusLG: 20,
    }),
    [isDark],
  );

  useEffect(() => {
    const mode = isDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", mode);
    document.documentElement.style.colorScheme = mode;
    document.documentElement.style.setProperty("--app-bg", themeToken.colorBgLayout);
  }, [isDark, themeToken.colorBgLayout]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          ...themeToken,
        },
      }}>
      <AntApp notification={{placement: "top"}}>
        <BrowserRouter>
          <PortfolioLayout isDark={isDark} onToggleTheme={() => setIsDark((v) => !v)}>
            <Routes>
              <Route path="/" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/skills" element={<AboutPage scrollToId="skills" />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/resume" element={<ResumePage />} />
              <Route path="/about-markdown" element={<AboutMarkdown />} />
              <Route path="/ai-playground" element={<AIPlayground />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </PortfolioLayout>
        </BrowserRouter>
      </AntApp>
    </ConfigProvider>
  );
}
