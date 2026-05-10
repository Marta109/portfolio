import {useEffect, useMemo, useState} from "react";
import {ConfigProvider, theme} from "antd";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {PortfolioLayout} from "@/layouts/PortfolioLayout";
import {AboutPage} from "@/pages/about/AboutPage";
import {AboutMarkdown} from "@/pages/about-markdown/AboutMarkdown";
import {AIPlayground} from "@/pages/ai-playground/AIPlayground";
import {ContactPage} from "@/pages/contact/ContactPage";
import {ResumePage} from "@/pages/resume/ResumePage";
import {WorksPage} from "@/pages/works/WorksPage";

export default function App() {
  const [isDark, setIsDark] = useState(true);

  const themeToken = useMemo(
    () => ({
      colorPrimary: "#8B5CF6",
      colorBgLayout: isDark ? "#05070A" : "#f4f6fb",
      colorBgContainer: isDark ? "rgba(10, 25, 47, 0.85)" : "rgba(255, 255, 255, 0.92)",
      colorText: isDark ? "rgba(255, 255, 255, 0.92)" : "rgba(15, 23, 42, 0.92)",
      colorTextSecondary: isDark ? "rgba(255, 255, 255, 0.55)" : "rgba(15, 23, 42, 0.65)",
      colorBorderSecondary: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(15, 23, 42, 0.12)",
      fontFamily: `'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
      borderRadiusLG: 16,
    }),
    [isDark],
  );

  useEffect(() => {
    document.documentElement.style.setProperty("--app-bg", themeToken.colorBgLayout);
  }, [themeToken.colorBgLayout]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          ...themeToken,
        },
      }}>
      <BrowserRouter>
        <PortfolioLayout isDark={isDark} onToggleTheme={() => setIsDark((v) => !v)}>
          <Routes>
            <Route path="/" element={<AboutPage />} />
            <Route path="/work" element={<WorksPage />} />
            <Route path="/skills" element={<AboutPage scrollToId="skills" />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/about-markdown" element={<AboutMarkdown />} />
            <Route path="/ai-playground" element={<AIPlayground />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PortfolioLayout>
      </BrowserRouter>
    </ConfigProvider>
  );
}
