import {useMemo} from "react";
import {Button, Card, Col, Form, Input, Row, Space, Typography} from "antd";
import {
  EnvironmentOutlined,
  GithubOutlined,
  DiscordOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  SendOutlined,
} from "@ant-design/icons";
import styles from "@/pages/home/HomePage/HomePage.module.css";

type ContactInfoItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
};

function ContactInfoItem({icon, label, value, href}: ContactInfoItemProps) {
  return (
    <div className={styles.contactInfoItem}>
      <Space align="start" size={12}>
        <span className={styles.contactIcon}>{icon}</span>
        <div>
          <Typography.Text className={styles.contactLabel}>{label}</Typography.Text>
          {href ? (
            <Typography.Link href={href} target="_blank" className={styles.contactValue}>
              {value}
            </Typography.Link>
          ) : (
            <Typography.Text className={styles.contactValue}>{value}</Typography.Text>
          )}
        </div>
      </Space>
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
      <section id="contact" className={styles.contactSection}>
        <div className={styles.contactContainer}>
          <div className={styles.contactHeader}>
            <Typography.Text className={styles.kicker}>{contactData.title}</Typography.Text>
            <Typography.Title level={2} className={styles.sectionTitle}>
              Let's <span className={styles.sectionTitleMastery}>Work Together</span>
            </Typography.Title>
            <Typography.Paragraph className={styles.contactLead}>
              {contactData.description}
            </Typography.Paragraph>
          </div>
          <Row gutter={[24, 24]} className={styles.contactGrid}>
            <Col xs={24} lg={10} className={styles.contactCol}>
              <Card className={styles.contactCard} bordered={false}>
                <div className={styles.contactCardInner}>
                  <Typography.Title level={4} className={styles.contactCardTitle}>
                    Contact Information
                  </Typography.Title>
                  <Typography.Paragraph className={styles.contactCardText}>
                    Front-End Developer
                  </Typography.Paragraph>
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
                  <div className={styles.contactLinks}>
                    {socialList.map((social) =>
                      social.href ? (
                        <Typography.Link
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          className={styles.contactLink}>
                          {social.icon} {social.label}
                        </Typography.Link>
                      ) : (
                        <div key={social.label} className={styles.contactLink}>
                          {social.icon} {social.value}
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={14} className={styles.contactCol}>
              <Card className={styles.contactCard} bordered={false}>
                <div className={styles.contactCardInner}>
                  <Typography.Title level={4} className={styles.contactCardTitle}>
                    Send a message
                  </Typography.Title>
                  <Form layout="vertical" className={styles.contactForm} onFinish={onFinish}>
                    <Row gutter={16}>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          name="name"
                          rules={[{required: true, message: "Please enter your name."}]}
                          className={styles.contactField}>
                          <Input placeholder="Your Name" size="large" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item name="company" className={styles.contactField}>
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
                      className={styles.contactField}>
                      <Input placeholder="Email" size="large" />
                    </Form.Item>
                    <Form.Item
                      name="message"
                      rules={[{required: true, message: "Please write a message."}]}
                      className={styles.contactField}>
                      <Input.TextArea rows={10} placeholder="Tell me about the opportunity..." />
                    </Form.Item>
                    <Form.Item className={styles.contactButtonItem}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className={styles.contactFormButton}
                        icon={<SendOutlined />}>
                        Send Message
                      </Button>
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
