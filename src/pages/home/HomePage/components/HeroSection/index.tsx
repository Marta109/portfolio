import {ArrowRightOutlined, CaretRightOutlined, DeploymentUnitOutlined} from "@ant-design/icons";
import {Button, Card, Col, Flex, Image, Row, Space, Tag, Typography} from "antd";
import {useNavigate} from "react-router-dom";
import styles from "../../HomePage.module.css";

const {Title, Paragraph, Text} = Typography;

export function HeroSection() {
  const navigate = useNavigate();
  return (
    <Row gutter={[40, 48]} align="middle" className={styles.hero}>
      <Col xs={24} lg={14}>
        <Space direction="vertical" size="large" className={styles.left}>
          <Tag className={styles.badge}>
            <Flex align="center" gap="small">
              <span className={styles.badgeDot} aria-hidden />
              AVAILABLE FOR PROJECTS
            </Flex>
          </Tag>
          <div>
            <Title level={1} className={styles.title}>
              Hi, I&apos;m Marta H —
            </Title>
            <Title level={1} className={`${styles.title} ${styles.titleGradient}`}>
              Front-End Developer
            </Title>
          </div>
          <Paragraph className={styles.lead}>
            I am an aspiring Front-End Developer, currently completing a JavaScript Front-End course
            at The Rolling Scopes School. I know how to create modern, responsive web applications.
            I am passionate about designing user-friendly interfaces, enjoy solving complex
            problems, and am eager to grow professionally. I am communicative and able to work
            effectively in a team.
          </Paragraph>
          <Flex gap="middle" wrap="wrap" className={styles.ctas}>
            <Button
              type="primary"
              size="large"
              className={styles.btnPrimary}
              onClick={() => navigate("/work")}>
              View Projects
            </Button>
            <Button
              size="large"
              className={styles.btnCv}
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/Marta_Hayrapetyan_Resume.pdf";
                link.download = "Marta_Hayrapetyan_Resume.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}>
              Download CV
            </Button>
            <Button
              type="link"
              size="large"
              className={styles.btnContact}
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
                icon={<CaretRightOutlined />}
                className={styles.playBtn}
                aria-label="Play voice introduction"
              />
              <div>
                <Text type="secondary" className={styles.introLabel}>
                  INTRODUCTION
                </Text>
                <div>
                  <Text strong className={styles.introTitle}>
                    Play Voice Intro
                  </Text>
                </div>
              </div>
            </Flex>
          </Card>
        </Space>
      </Col>
      <Col xs={24} lg={10}>
        <div className={styles.visual}>
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
  );
}
