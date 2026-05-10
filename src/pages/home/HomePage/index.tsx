import {useEffect} from "react";
import {ExpertiseSection} from "./components/ExpertiseSection";
import {HeroSection} from "./components/HeroSection";
import {SiteFooter} from "./components/SiteFooter";
import styles from "./HomePage.module.css";

type HomePageProps = {
  scrollToId?: "work" | "about" | "skills" | "contact";
};

function scrollToSection(id: NonNullable<HomePageProps["scrollToId"]>) {
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({behavior: "smooth", block: "start"});
}

export function HomePage({scrollToId}: HomePageProps) {
  useEffect(() => {
    if (!scrollToId) return;
    scrollToSection(scrollToId);
  }, [scrollToId]);

  return (
    <div className={styles.root}>
      <div id="work" />
      <section id="about">
        <HeroSection />
      </section>
      <section id="skills">
        <ExpertiseSection />
      </section>
      <div id="contact">
        <SiteFooter />
      </div>
      <section id="certificates" className={styles.certificatesSection}>
        <div className={styles.certificatesHeader}>
          <h2 className={styles.certificatesTitle}>Certificates</h2>
          <p className={styles.certificatesDescription}>
            Verified certificates that highlight my frontend development journey and recent
            achievements.
          </p>
        </div>
        <div className={styles.certificatesGrid}>
          <a
            className={styles.certificateCard}
            href="https://app.rs.school/certificate/zl52p7q1"
            target="_blank"
            rel="noopener noreferrer">
            <div className={styles.certificateCardThumb}>RS School</div>
            <div className={styles.certificateCardTitle}>Rolling Scopes School</div>
            <div className={styles.certificateCardText}>
              JavaScript / Front-end Course certificate.
            </div>
            <div className={styles.certificateCardLink}>View certificate</div>
          </a>
          <a
            className={styles.certificateCard}
            href="https://drive.google.com/file/d/1dPPDDbBJ9ajuj8TDO_0hgzrew5ND16sV/view"
            target="_blank"
            rel="noopener noreferrer">
            <div className={styles.certificateCardThumb}>Google Drive</div>
            <div className={styles.certificateCardTitle}>AGBU Women Coders</div>
            <div className={styles.certificateCardText}>
              Certificate from AGBU Women Coders program.
            </div>
            <div className={styles.certificateCardLink}>View certificate</div>
          </a>
        </div>
      </section>
    </div>
  );
}
