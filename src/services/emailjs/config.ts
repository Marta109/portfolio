import {EmailJsConfigError} from "./errors";
import type {EmailJsConfig} from "./types";

function readEnv(key: keyof ImportMetaEnv): string {
  const value = import.meta.env[key];
  return typeof value === "string" ? value.trim() : "";
}

export function getEmailJsConfig(): EmailJsConfig {
  const serviceId = readEnv("VITE_EMAILJS_SERVICE_ID");
  const templateId = readEnv("VITE_EMAILJS_TEMPLATE_ID");
  const publicKey = readEnv("VITE_EMAILJS_PUBLIC_KEY");

  if (!serviceId || !templateId || !publicKey) {
    throw new EmailJsConfigError(
      "Email service is not configured. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY to your environment.",
    );
  }

  return {serviceId, templateId, publicKey};
}

export function isEmailJsConfigured(): boolean {
  try {
    getEmailJsConfig();
    return true;
  } catch {
    return false;
  }
}
