/** Values collected from the contact form. */
export type ContactFormValues = {
  name: string;
  company?: string;
  email: string;
  message: string;
};

/**
 * Normalized payload before mapping to EmailJS template variables.
 * Form field `name` maps to `fromName`.
 */
export type ContactEmailPayload = {
  fromName: string;
  company: string;
  email: string;
  message: string;
};

/**
 * EmailJS template variables.
 *
 * Recommended template body (EmailJS dashboard → template Content):
 *
 *   {{email_content}}
 *
 * Or use separate fields:
 *
 *   Name: {{from_name}}
 *   Company: {{company}}
 *   Email: {{reply_to}}
 *   Message:
 *   {{message}}
 *
 * Set template Reply-To to {{reply_to}} for direct replies to the sender.
 */
export type ContactEmailTemplateParams = {
  from_name: string;
  company: string;
  reply_to: string;
  message: string;
  /** Full formatted body (Name, Company, Email, Message) — use as {{email_content}} in template. */
  email_content: string;
};

export type EmailJsConfig = {
  serviceId: string;
  templateId: string;
  publicKey: string;
};
