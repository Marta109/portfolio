import {InfoCircleOutlined} from "@ant-design/icons";
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
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

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
      <button
        type="button"
        className={styles.moreInfoBtn}
        aria-expanded={isDescriptionOpen}
        aria-controls={`project-desc-${project.id}`}
        onClick={(event) => {
          event.stopPropagation();
          setIsDescriptionOpen((open) => !open);
        }}>
        <InfoCircleOutlined aria-hidden />
        <span>{isDescriptionOpen ? "Hide details" : "More info"}</span>
      </button>
      <div
        id={`project-desc-${project.id}`}
        className={`${styles.hoverOverlay} ${isDescriptionOpen ? styles.hoverOverlayOpen : ""}`}
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}>
        <Paragraph className={styles.hoverText}>{project.description}</Paragraph>
        <button
          type="button"
          className={styles.overlayCloseBtn}
          aria-label="Close project details"
          onClick={(event) => {
            event.stopPropagation();
            setIsDescriptionOpen(false);
          }}>
          Close
        </button>
      </div>
    </div>
  );
}
