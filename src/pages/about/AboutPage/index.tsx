import {useEffect} from "react";
import {ExpertiseSection} from "../../home/HomePage/components/ExpertiseSection";
import {HeroSection} from "../../home/HomePage/components/HeroSection";
import {SiteFooter} from "../../home/HomePage/components/SiteFooter";
import styles from "../../home/HomePage/HomePage.module.css";

type AboutPageProps = {
  scrollToId?: "about" | "skills";
};

function scrollToSection(id: NonNullable<AboutPageProps["scrollToId"]>) {
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({behavior: "smooth", block: "start"});
}

export function AboutPage({scrollToId}: AboutPageProps) {
  useEffect(() => {
    if (!scrollToId) return;
    scrollToSection(scrollToId);
  }, [scrollToId]);

  return (
    <div className={styles.root}>
      <section id="about">
        <HeroSection />
      </section>
      <section id="skills">
        <ExpertiseSection />
      </section>
      <SiteFooter />
    </div>
  );
}
