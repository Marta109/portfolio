import type {ContactEmailPayload} from "./types";

/** Readable email body matching the EmailJS template layout. */
export function formatContactEmailBody(payload: ContactEmailPayload): string {
  return [
    `Name: ${payload.fromName}`,
    "",
    `Company: ${payload.company}`,
    "",
    `Email: ${payload.email}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");
}
