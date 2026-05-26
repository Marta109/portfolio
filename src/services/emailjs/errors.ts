export class EmailJsConfigError extends Error {
  readonly code = "EMAILJS_CONFIG" as const;

  constructor(message = "Email service is not configured. Please try again later.") {
    super(message);
    this.name = "EmailJsConfigError";
  }
}

export class EmailJsValidationError extends Error {
  readonly code = "EMAILJS_VALIDATION" as const;

  constructor(message: string) {
    super(message);
    this.name = "EmailJsValidationError";
  }
}

export class EmailJsSendError extends Error {
  readonly code = "EMAILJS_SEND" as const;

  constructor(message: string) {
    super(message);
    this.name = "EmailJsSendError";
  }
}

export function getContactFormErrorMessage(error: unknown): string {
  if (error instanceof EmailJsConfigError) {
    return error.message;
  }

  if (error instanceof EmailJsValidationError) {
    return error.message;
  }

  if (error instanceof EmailJsSendError) {
    return error.message;
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return "Something went wrong while sending your message. Please try again.";
}
