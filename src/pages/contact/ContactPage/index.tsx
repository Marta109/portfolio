import {useMemo} from "react";
import {Button, Card, Col, Form, Input, Row, Typography} from "antd";
import {
  EnvironmentOutlined,
  GithubOutlined,
  DiscordOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  SendOutlined,
} from "@ant-design/icons";
import styles from "./ContactPage.module.css";

type ContactInfoItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
};

function ContactInfoItem({icon, label, value, href}: ContactInfoItemProps) {
  return (
    <div className={styles.infoItem}>
      <span className={styles.iconShell}>{icon}</span>
      <div className={styles.infoContent}>
        <Typography.Text className={styles.infoLabel}>{label}</Typography.Text>
        {href ? (
          <Typography.Link href={href} target="_blank" className={styles.infoValue}>
            {value}
          </Typography.Link>
        ) : (
          <Typography.Text className={styles.infoValue}>{value}</Typography.Text>
        )}
      </div>
    </div>
  );
}

export function ContactPage() {
  const contactData = useMemo(
    () => ({
      title: "Get in touch",
      heading: "Let's Work Together",
      description:
        "Open to new opportunities, freelance projects, and collaborations. I usually respond within 24 hours.",
      email: "marta.hayrapetyan.a@gmail.com",
      phone: "+374 091-23-17-19",
      github: "https://github.com/Marta109",
      discord: "marta.a.h",
      linkedin: "https://www.linkedin.com/in/mh-marta-hayrapetyan/",
      location: "Armenia — Remote friendly",
      availability: "Open to work · Full-time / Freelance",
      fallbackImage: "/content-is-not-available.gif",
    }),
    [],
  );

  const socialList = [
    {
      icon: <GithubOutlined />,
      label: "GitHub",
      value: contactData.github,
      href: contactData.github,
    },
    {
      icon: <DiscordOutlined />,
      label: "Discord",
      value: contactData.discord,
      href: contactData.discord,
    },
    {
      icon: <LinkedinOutlined />,
      label: "LinkedIn",
      value: contactData.linkedin,
      href: contactData.linkedin,
    },
  ];

  const onFinish = (values: {name: string; company: string; email: string; message: string}) => {
    const mailto = `mailto:${contactData.email}?subject=${encodeURIComponent(
      `Portfolio inquiry from ${values.name || "Contact form"}`,
    )}&body=${encodeURIComponent(
      `Name: ${values.name}\nCompany: ${values.company}\nEmail: ${values.email}\n\n${values.message}`,
    )}`;

    window.location.href = mailto;
  };

  return (
    <div className={styles.root}>
      <section id="contact" className={styles.section}>
        <div className={styles.container}>
          <header className={styles.header}>
            <Typography.Text className={styles.kicker}>{contactData.title}</Typography.Text>
            <Typography.Title level={2} className={styles.pageTitle}>
              {contactData.heading}
            </Typography.Title>
            <Typography.Paragraph className={styles.lead}>
              {contactData.description}
            </Typography.Paragraph>
          </header>

          <Row gutter={[24, 24]} className={styles.grid}>
            <Col xs={24} lg={10} className={styles.col}>
              <Card className={styles.card} bordered={false}>
                <div className={styles.cardInner}>
                  <Typography.Title level={4} className={styles.cardTitle}>
                    Contact Information
                  </Typography.Title>
                  <Typography.Paragraph className={styles.cardSubtitle}>
                    Front-End Developer
                  </Typography.Paragraph>

                  <div className={styles.infoList}>
                    <ContactInfoItem
                      icon={<MailOutlined />}
                      label="Email"
                      value={contactData.email}
                      href={`mailto:${contactData.email}`}
                    />
                    <ContactInfoItem
                      icon={<PhoneOutlined />}
                      label="Phone"
                      value={contactData.phone}
                      href={`tel:${contactData.phone.replace(/\s+/g, "")}`}
                    />
                    <ContactInfoItem
                      icon={<EnvironmentOutlined />}
                      label="Location"
                      value={contactData.location}
                    />
                    <ContactInfoItem
                      icon={<SendOutlined />}
                      label="Availability"
                      value={contactData.availability}
                    />
                  </div>

                  <div className={styles.socialSection}>
                    <div className={styles.socialLinks}>
                      {socialList.map((social) =>
                        social.href ? (
                          <Typography.Link
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            className={styles.socialLink}>
                            {social.icon} {social.label}
                          </Typography.Link>
                        ) : (
                          <div key={social.label} className={styles.socialLink}>
                            {social.icon} {social.value}
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </Col>

            <Col xs={24} lg={14} className={styles.col}>
              <Card className={styles.card} bordered={false}>
                <div className={styles.cardInner}>
                  <Typography.Title level={4} className={styles.cardTitle}>
                    Send a message
                  </Typography.Title>
                  <Form layout="vertical" className={styles.form} onFinish={onFinish}>
                    <Row gutter={16}>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          name="name"
                          rules={[{required: true, message: "Please enter your name."}]}
                          className={styles.formField}>
                          <Input placeholder="Your Name" size="large" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item name="company" className={styles.formField}>
                          <Input placeholder="Company" size="large" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item
                      name="email"
                      rules={[
                        {required: true, message: "Please enter your email."},
                        {type: "email", message: "Enter a valid email."},
                      ]}
                      className={styles.formField}>
                      <Input placeholder="Email" size="large" />
                    </Form.Item>
                    <Form.Item
                      name="message"
                      rules={[{required: true, message: "Please write a message."}]}
                      className={styles.formField}>
                      <Input.TextArea rows={6} placeholder="Tell me about the opportunity..." />
                    </Form.Item>
                    <Form.Item className={styles.submitItem}>
                      <div className={styles.submitWrap}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className={styles.submitBtn}
                          icon={<SendOutlined />}>
                          Send Message
                        </Button>
                      </div>
                    </Form.Item>
                  </Form>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
}
