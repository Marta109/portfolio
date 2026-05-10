import {DownloadOutlined, TrophyOutlined} from "@ant-design/icons";
import {portfolioData} from "../../../data/portfolioData";
import styles from "./ResumePage.module.css";

// Parse portfolio data from markdown
function parsePortfolioData(data: string) {
  const sections: Record<string, string[]> = {};
  const lines = data.split("\n");
  let currentSection = "";
  let currentContent: string[] = [];

  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (currentSection) {
        sections[currentSection] = currentContent;
      }
      currentSection = line.replace("## ", "").toLowerCase();
      currentContent = [];
    } else if (line.trim() && !line.startsWith("#") && !line.startsWith("---")) {
      currentContent.push(line);
    }
  }

  if (currentSection) {
    sections[currentSection] = currentContent;
  }

  return sections;
}

export function ResumePage() {
  const sections = parsePortfolioData(portfolioData);

  const handleDownload = () => {
    // Create a link to download the PDF file
    const link = document.createElement("a");
    link.href = "/Marta_Hayrapetyan_Resume.pdf";
    link.download = "Marta_Hayrapetyan_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderSkills = (skills: string[]) => {
    const categories = {
      "Programming Languages & Frameworks": skills.filter(
        (skill) =>
          skill.toLowerCase().includes("javascript") ||
          skill.toLowerCase().includes("typescript") ||
          skill.toLowerCase().includes("react") ||
          skill.toLowerCase().includes("html") ||
          skill.toLowerCase().includes("css"),
      ),
      "Tools & Technologies": skills.filter(
        (skill) =>
          skill.toLowerCase().includes("git") ||
          skill.toLowerCase().includes("webpack") ||
          skill.toLowerCase().includes("vite") ||
          skill.toLowerCase().includes("node") ||
          skill.toLowerCase().includes("npm"),
      ),
      "Libraries & Frameworks": skills.filter(
        (skill) =>
          skill.toLowerCase().includes("bootstrap") ||
          skill.toLowerCase().includes("material ui") ||
          skill.toLowerCase().includes("antd"),
      ),
      "Development Tools": skills.filter(
        (skill) =>
          skill.toLowerCase().includes("eslint") ||
          skill.toLowerCase().includes("prettier") ||
          skill.toLowerCase().includes("jshint") ||
          skill.toLowerCase().includes("figma"),
      ),
    };

    return Object.entries(categories).map(([category, categorySkills]) => {
      if (categorySkills.length === 0) return null;

      return (
        <div key={category} className={styles.skillCategory}>
          <h3 className={styles.skillTitle}>{category}</h3>
          <div className={styles.skillList}>
            {categorySkills.map((skill, index) => (
              <span key={index} className={styles.skill}>
                {skill.trim().replace(/^[•\-*]\s*/, "")}
              </span>
            ))}
          </div>
        </div>
      );
    });
  };

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <h1 className={styles.title}>Resume</h1>
            <p className={styles.subtitle}>Front-End Developer</p>
          </div>
          <button className={styles.downloadButton} onClick={handleDownload}>
            <DownloadOutlined />
            Download PDF Resume
          </button>
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.mainContent}>
          {sections.summary && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>About Me</h2>
              <p className={styles.summary}>
                {sections.summary.join(" ").replace(/^[•\-*]\s*/, "")}
              </p>
            </section>
          )}

          {sections.skills && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Skills</h2>
              <div className={styles.skillCategories}>{renderSkills(sections.skills)}</div>
            </section>
          )}

          {sections.education && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Education</h2>
              <div className={styles.educationList}>
                {sections.education.map((edu, index) => (
                  <div key={index} className={styles.educationItem}>
                    <h3 className={styles.educationTitle}>
                      {edu
                        .trim()
                        .replace(/^[•\-*]\s*/, "")
                        .split("—")[0]
                        ?.trim()}
                    </h3>
                    <p className={styles.educationPeriod}>
                      {edu
                        .trim()
                        .replace(/^[•\-*]\s*/, "")
                        .split("—")[1]
                        ?.trim()}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className={styles.sidebar}>
          {sections.languages && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Languages</h2>
              <div className={styles.languages}>
                {sections.languages.map((language, index) => (
                  <span key={index} className={styles.language}>
                    {language.trim().replace(/^[•\-*]\s*/, "")}
                  </span>
                ))}
              </div>
            </section>
          )}

          {sections.certificates && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Certificates</h2>
              <div className={styles.certificatesGrid}>
                {sections.certificates.map((cert, index) => {
                  const text = cert.trim().replace(/^[•\-*]\s*/, "");
                  const urlMatch = text.match(/(https?:\/\/[^\s]+)/);
                  const description = text.replace(/(https?:\/\/[^\s]+)/, "").trim();

                  return (
                    <div key={index} className={styles.certificateCard}>
                      <TrophyOutlined className={styles.certificateIcon} />
                      <p className={styles.certificateText}>{description}</p>
                      {urlMatch ? (
                        <a
                          href={urlMatch[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.certificateLink}>
                          View
                        </a>
                      ) : (
                        <span className={styles.certificateHint}>Soon</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {sections.experience && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Experience</h2>
              <p className={styles.summary}>
                {sections.experience.join(" ").replace(/^[•\-*]\s*/, "")}
              </p>
            </section>
          )}

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Contact</h2>
            <p className={styles.contactNote}>
              All contact details and the message form are now available on the{" "}
              <a href="/contact">Contact page</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
