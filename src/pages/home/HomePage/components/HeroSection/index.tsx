import {
  ArrowRightOutlined,
  CaretRightOutlined,
  DeploymentUnitOutlined,
  PauseOutlined,
} from "@ant-design/icons";
import {Button, Card, Col, Flex, Image, Row, Space, Tag, Typography} from "antd";
import {useNavigate} from "react-router-dom";
import {VOICE_INTRO_AUDIO_SRC, useVoiceIntroPlayback} from "@/hooks/useVoiceIntroPlayback";
import styles from "../../HomePage.module.css";

const {Title, Paragraph, Text} = Typography;

export function HeroSection() {
  const navigate = useNavigate();
  const {audioRef, uiState, errorMessage, togglePlayPause} = useVoiceIntroPlayback();

  const playButtonIcon = uiState === "playing" ? <PauseOutlined /> : <CaretRightOutlined />;
  const playButtonClass = [
    styles.playBtn,
    uiState === "playing" ? styles.playBtnActive : "",
    uiState === "paused" ? styles.playBtnPaused : "",
  ]
    .filter(Boolean)
    .join(" ");

  const playAriaLabel =
    uiState === "playing"
      ? "Pause voice intro"
      : uiState === "paused"
        ? "Resume voice intro"
        : "Play voice introduction";

  return (
    <div className={styles.heroShell}>
      <Row
        gutter={[
          {xs: 16, sm: 20, md: 32, lg: 48},
          {xs: 24, sm: 28, md: 36, lg: 56},
        ]}
        align="middle"
        className={styles.hero}>
        <Col xs={24} lg={14}>
          <Space direction="vertical" size={28} className={styles.left}>
            <Tag className={styles.badge}>
              <Flex align="center" gap="small">
                <span className={styles.badgeDot} aria-hidden />
                AVAILABLE FOR PROJECTS
              </Flex>
            </Tag>

            <div className={styles.titleBlock}>
              <Title level={1} className={styles.title}>
                Hi, I&apos;m <span className={styles.titleName}>Marta H</span>
              </Title>
              <Title level={1} className={`${styles.title} ${styles.titleGradient}`}>
                Front-End Developer
              </Title>
            </div>

            <Paragraph className={styles.lead}>
              I am an aspiring <span className={styles.leadHighlight}>Front-End Developer</span>,
              currently completing a JavaScript Front-End course at The Rolling Scopes School. I know
              how to create{" "}
              <span className={styles.leadHighlight}>modern, responsive web applications</span>. I am
              passionate about designing{" "}
              <span className={styles.leadHighlight}>user-friendly interfaces</span>, enjoy solving
              complex problems, and am eager to grow professionally. I am communicative and able to
              work effectively in a team.
            </Paragraph>

            <Flex gap="middle" wrap="wrap" className={styles.ctas}>
              <Button type="primary" size="large" onClick={() => navigate("/work")}>
                View Projects
              </Button>
              <Button
                size="large"
                className="portfolioBtnSecondary"
                onClick={handleDownloadCv}>
                Download CV
              </Button>
              <Button
                type="link"
                size="large"
                className={`portfolioBtnGhost ${styles.btnContact}`}
                icon={<ArrowRightOutlined />}
                iconPosition="end"
                onClick={() => navigate("/contact")}>
                Connect Me
              </Button>
            </Flex>

            <Card size="small" className={styles.introCard} bordered={false}>
              <Flex align="center" gap="middle">
                <Button
                  type="primary"
                  shape="circle"
                  size="large"
                  icon={playButtonIcon}
                  className={playButtonClass}
                  aria-label={playAriaLabel}
                  onClick={() => void togglePlayPause()}
                />
                <div>
                  <Text type="secondary" className={styles.introLabel}>
                    INTRODUCTION
                  </Text>
                  <div>
                    <Text strong className={styles.introTitle}>
                      {uiState === "playing"
                        ? "Playing intro"
                        : uiState === "paused"
                          ? "Intro paused"
                          : "Play Voice Intro"}
                    </Text>
                  </div>
                </div>
              </Flex>
              {errorMessage ? (
                <Text type="danger" className={styles.voiceError} role="alert">
                  {errorMessage}
                </Text>
              ) : null}
              <audio
                ref={audioRef}
                className={styles.voiceIntroAudio}
                src={VOICE_INTRO_AUDIO_SRC}
                preload="auto"
                data-voice-intro
                aria-hidden
              />
            </Card>
          </Space>
        </Col>

        <Col xs={24} lg={10}>
          <div className={styles.visual}>
            <div className={styles.visualGlow} aria-hidden />
            <div className={styles.photoFrame}>
              <Image
                src="/marta-photo.png"
                alt="Marta"
                preview={false}
                rootClassName={styles.photo}
              />
            </div>
            <div className={`${styles.floatOrbit} ${styles.floatOrbitReact}`} aria-hidden>
              <Card size="small" className={`${styles.float} ${styles.floatReact}`} bordered={false}>
                <DeploymentUnitOutlined className={styles.floatIcon} />
                <div className={styles.floatLabel}>REACT</div>
              </Card>
            </div>
            <div className={`${styles.floatOrbit} ${styles.floatOrbitJs}`} aria-hidden>
              <Card size="small" className={`${styles.float} ${styles.floatJs}`} bordered={false}>
                <div className={styles.floatJsText}>JS</div>
                <div className={styles.floatLabel}>JavaScript</div>
              </Card>
            </div>
            <div className={`${styles.floatOrbit} ${styles.floatOrbitTs}`} aria-hidden>
              <Card size="small" className={`${styles.float} ${styles.floatTs}`} bordered={false}>
                <div className={styles.floatTsText}>&lt; &gt;</div>
                <div className={styles.floatLabel}>TS</div>
              </Card>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

function handleDownloadCv() {
  const link = document.createElement("a");
  link.href = "/Marta_Hayrapetyan_Resume.pdf";
  link.download = "Marta_Hayrapetyan_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
