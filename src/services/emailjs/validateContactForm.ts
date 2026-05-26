import {EmailJsValidationError} from "./errors";
import type {ContactFormValues} from "./types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactFormValues(values: ContactFormValues): ContactFormValues {
  const name = values.name?.trim() ?? "";
  const email = values.email?.trim() ?? "";
  const message = values.message?.trim() ?? "";
  const company = values.company?.trim() ?? "";

  if (!name) {
    throw new EmailJsValidationError("Please enter your name.");
  }

  if (name.length > 120) {
    throw new EmailJsValidationError("Name must be 120 characters or fewer.");
  }

  if (!email) {
    throw new EmailJsValidationError("Please enter your email.");
  }

  if (!EMAIL_PATTERN.test(email)) {
    throw new EmailJsValidationError("Enter a valid email address.");
  }

  if (!message) {
    throw new EmailJsValidationError("Please write a message.");
  }

  if (message.length < 10) {
    throw new EmailJsValidationError("Message must be at least 10 characters.");
  }

  if (message.length > 4000) {
    throw new EmailJsValidationError("Message must be 4000 characters or fewer.");
  }

  if (company.length > 120) {
    throw new EmailJsValidationError("Company must be 120 characters or fewer.");
  }

  return {
    name,
    email,
    message,
    company: company || undefined,
  };
}
