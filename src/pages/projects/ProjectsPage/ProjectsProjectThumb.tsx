import {Spin, Typography} from "antd";
import {useState} from "react";
import type {WorkProject} from "@/data/portfolioProjects";
import styles from "./ProjectsPage.module.css";

const {Paragraph} = Typography;

type WorkProjectThumbProps = {
  project: WorkProject;
};

export function WorkProjectThumb({project}: WorkProjectThumbProps) {
  const [phase, setPhase] = useState<"loading" | "loaded" | "error">("loading");

  const showSpinner = phase === "loading";

  return (
    <div className={styles.thumbWrap}>
      {showSpinner ? (
        <div className={styles.thumbSpinner} aria-busy="true" aria-label="Loading preview">
          <Spin size="large" />
        </div>
      ) : null}
      {phase !== "error" ? (
        <img
          className={`${styles.thumbImg} ${phase === "loaded" ? styles.thumbImgLoaded : ""}`}
          src={project.imageUrl}
          alt=""
          loading="lazy"
          decoding="async"
          onLoad={() => setPhase("loaded")}
          onError={() => setPhase("error")}
        />
      ) : null}
      <div className={styles.hoverOverlay}>
        <Paragraph className={styles.hoverText}>{project.description}</Paragraph>
      </div>
    </div>
  );
}
