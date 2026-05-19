import {CodeOutlined} from "@ant-design/icons";
import {Button, Card, Col, Empty, Flex, Row, Space, Tag, Typography} from "antd";
import {useMemo, useState} from "react";
import {WORK_FILTER_ORDER, WORK_PROJECTS, type WorkFilterKey} from "@/pages/projects/constants";
import {WorkProjectThumb} from "./ProjectsProjectThumb";
import styles from "./ProjectsPage.module.css";

const {Text, Title} = Typography;

export function ProjectsPage() {
  const [filter, setFilter] = useState<WorkFilterKey>("all");

  const visible = useMemo(() => {
    if (filter === "all") return WORK_PROJECTS;
    return WORK_PROJECTS.filter((p) => p.filters.includes(filter));
  }, [filter]);

  return (
    <div className={styles.page}>
      <Row className={styles.headerRow} align="middle" justify="space-between" gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Text className={styles.kicker}>PORTFOLIO</Text>
          <Title level={2} className={styles.sectionTitle}>
            Featured Works
          </Title>
        </Col>
        <Col xs={24} lg={12}>
          <Flex gap="small" className={styles.filters} wrap="wrap">
            {WORK_FILTER_ORDER.map(({key, label}) => (
              <Button
                key={key}
                type="text"
                size="middle"
                className={
                  filter === key
                    ? `${styles.filterBtn} ${styles.filterBtnActive}`
                    : styles.filterBtn
                }
                onClick={() => setFilter(key)}>
                {label}
              </Button>
            ))}
          </Flex>
        </Col>
      </Row>

      {visible.length === 0 ? (
        <Empty description="No projects in this category yet." styles={{root: {marginTop: 48}}} />
      ) : (
        <Row gutter={[24, 24]}>
          {visible.map((project) => (
            <Col key={project.id} xs={24} md={12} lg={8} className={styles.cardCol}>
              <Card
                bordered={false}
                className={styles.projectCard}
                tabIndex={0}
                role="button"
                onClick={() => window.open(project.liveUrl, "_blank", "noopener,noreferrer")}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    window.open(project.liveUrl, "_blank", "noopener,noreferrer");
                  }
                }}>
                <WorkProjectThumb project={project} />
                <div className={styles.cardBody}>
                  <Space size={[8, 8]} wrap className={styles.tagRow}>
                    {project.tagLabels.map((t) => (
                      <Tag key={t} className={styles.techTag}>
                        {t}
                      </Tag>
                    ))}
                  </Space>
                  <Title level={4} className={styles.cardTitle}>
                    {project.title}
                  </Title>
                  <Flex gap="small" className={styles.actions} wrap="wrap">
                    <Button
                      type="primary"
                      size="large"
                      className={styles.demoBtn}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => event.stopPropagation()}>
                      Live Demo
                    </Button>
                    <Button
                      size="large"
                      className={styles.codeBtn}
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      title="Open on GitHub"
                      icon={<CodeOutlined />}
                      aria-label="View source code"
                    />
                  </Flex>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
