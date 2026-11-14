/** Contact form schema: used for client hints and authoritative server validation. */
export type ContactInput = {
  name: string;
  email: string;
  company: string;
  message: string;
};

export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

export const LIMITS = { name: 120, email: 200, company: 160, message: 4000, messageMin: 10 } as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(raw: Record<string, unknown>): { data?: ContactInput; errors: FieldErrors } {
  const str = (k: string) => (typeof raw[k] === "string" ? (raw[k] as string).trim() : "");
  const data: ContactInput = { name: str("name"), email: str("email"), company: str("company"), message: str("message") };
  const errors: FieldErrors = {};

  if (!data.name) errors.name = "Please tell us your name.";
  else if (data.name.length > LIMITS.name) errors.name = "That name is too long.";

  if (!data.email) errors.email = "We need an email address to reply.";
  else if (data.email.length > LIMITS.email || !EMAIL_RE.test(data.email)) errors.email = "That email address doesn't look right.";

  if (data.company.length > LIMITS.company) errors.company = "That company name is too long.";

  if (data.message.length < LIMITS.messageMin) errors.message = "Tell us a little about what you need.";
  else if (data.message.length > LIMITS.message) errors.message = `Please keep it under ${LIMITS.message} characters.`;

  return Object.keys(errors).length ? { errors } : { data, errors };
}
