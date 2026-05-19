import {DownloadOutlined, EyeOutlined, CloseOutlined} from "@ant-design/icons";
import {Modal} from "antd";
import {useState} from "react";
import {portfolioData, CERTIFICATES, type Certificate} from "../../../data/portfolioData";
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
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDownload = () => {
    // Create a link to download the PDF file
    const link = document.createElement("a");
    link.href = "/Marta_Hayrapetyan_Resume.pdf";
    link.download = "Marta_Hayrapetyan_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCertificateClick = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedCertificate(null);
  };

  const renderSkills = (skills: string[]) => {
    const categories = {
      "Programming Languages & Frameworks": skills.filter(
        (skill) =>
          skill.toLowerCase().includes("javascript") ||
          skill.toLowerCase().includes("typescript") ||
          skill.toLowerCase().includes("react") ||
          skill.toLowerCase().includes("html") ||
          skill.toLowerCase().includes("css") ||
          skill.toLowerCase().includes("antd"),
      ),
      "Tools & Technologies": skills.filter(
        (skill) =>
          skill.toLowerCase().includes("git") ||
          skill.toLowerCase().includes("webpack") ||
          skill.toLowerCase().includes("vite") ||
          skill.toLowerCase().includes("node") ||
          skill.toLowerCase().includes("npm"),
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
          <button
            className={`${styles.downloadButton} portfolioCta`}
            onClick={handleDownload}>
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
                    <p className={styles.educationTitle}>{edu.trim().replace(/^[•\-*]\s*/, "")}</p>
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
                {CERTIFICATES.map((certificate) => (
                  <div
                    key={certificate.id}
                    className={styles.certificateCard}
                    onClick={() => handleCertificateClick(certificate)}>
                    <div className={styles.certificateImageWrapper}>
                      <img
                        src={certificate.imageUrl}
                        alt={`${certificate.issuer} Certificate`}
                        className={styles.certificateImage}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/content-is-not-available.gif";
                        }}
                      />
                      <div className={styles.certificateOverlay}>
                        <EyeOutlined className={styles.overlayIcon} />
                        <span className={styles.overlayText}>View Certificate</span>
                      </div>
                    </div>
                    <div className={styles.certificateInfo}>
                      <h3 className={styles.certificateTitle}>{certificate.title}</h3>
                      <p className={styles.certificateIssuer}>
                        {certificate.issuer} • {certificate.year}
                      </p>
                    </div>
                  </div>
                ))}
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

      <Modal
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        centered
        width="100%"
        style={{maxWidth: 880, top: 24, paddingBottom: 16}}
        closeIcon={<CloseOutlined style={{color: "var(--text-primary)"}} />}
        className={styles.certificateModal}>
        {selectedCertificate && (
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{selectedCertificate.title}</h2>
              <p className={styles.modalIssuer}>
                {selectedCertificate.issuer} • {selectedCertificate.year}
              </p>
            </div>
            <div className={styles.modalImageWrapper}>
              <img
                src={selectedCertificate.imageUrl}
                alt={`${selectedCertificate.issuer} Certificate`}
                className={styles.modalImage}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/content-is-not-available.gif";
                }}
              />
            </div>
            <div className={styles.modalActions}>
              <a
                href={selectedCertificate.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.viewOriginalLink}>
                <EyeOutlined />
                View Original Certificate
              </a>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
