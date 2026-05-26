import emailjs from "@emailjs/browser";
import {getEmailJsConfig} from "./config";
import {EmailJsSendError} from "./errors";
import {formatContactEmailBody} from "./formatContactEmailBody";
import type {ContactEmailPayload, ContactEmailTemplateParams, ContactFormValues} from "./types";
import {validateContactFormValues} from "./validateContactForm";

function toContactPayload(values: ContactFormValues): ContactEmailPayload {
  const company = values.company?.trim();

  return {
    fromName: values.name,
    company: company ? company : "Not provided",
    email: values.email,
    message: values.message,
  };
}

/** Maps validated form values to EmailJS template variables. */
export function toEmailJsTemplateParams(values: ContactFormValues): ContactEmailTemplateParams {
  const validated = validateContactFormValues(values);
  const payload = toContactPayload(validated);

  return {
    from_name: payload.fromName,
    company: payload.company,
    reply_to: payload.email,
    message: payload.message,
    email_content: formatContactEmailBody(payload),
  };
}

function toSendErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "text" in error) {
    const text = (error as {text?: unknown}).text;
    if (typeof text === "string" && text.trim()) {
      return text.trim();
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message.trim();
  }

  return "Unable to send your message right now. Please try again in a moment.";
}

/** Sends the contact form via EmailJS. */
export async function sendContactMessage(rawValues: ContactFormValues): Promise<void> {
  const config = getEmailJsConfig();
  const templateParams = toEmailJsTemplateParams(rawValues);

  try {
    const response = await emailjs.send(config.serviceId, config.templateId, templateParams, {
      publicKey: config.publicKey,
    });

    if (response.status !== 200) {
      throw new EmailJsSendError(toSendErrorMessage(response));
    }
  } catch (error) {
    if (error instanceof EmailJsSendError) {
      throw error;
    }

    throw new EmailJsSendError(toSendErrorMessage(error));
  }
}
