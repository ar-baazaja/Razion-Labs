/** Shared contact-form schema: used for client hints and authoritative server validation. */
import { services } from "@/content/services";

export const SERVICE_OPTIONS = [...services.map((s) => s.name), "Not sure yet"] as const;

export type ContactInput = {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  consent: boolean;
};

export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

export const LIMITS = { name: 120, email: 200, company: 160, message: 4000, messageMin: 20 } as const;

// Pragmatic check; the real proof is a reply landing in the inbox.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FREE_MAIL = /@(gmail|yahoo|hotmail|outlook|live|icloud|aol|proton|protonmail|gmx|yandex)\./i;

export function validateContact(raw: Record<string, unknown>): { data?: ContactInput; errors: FieldErrors } {
  const str = (k: string) => (typeof raw[k] === "string" ? (raw[k] as string).trim() : "");
  const data: ContactInput = {
    name: str("name"),
    email: str("email"),
    company: str("company"),
    service: str("service"),
    message: str("message"),
    consent: raw.consent === true || raw.consent === "on" || raw.consent === "true",
  };
  const errors: FieldErrors = {};

  if (!data.name) errors.name = "Please tell us your name.";
  else if (data.name.length > LIMITS.name) errors.name = "That name is too long.";

  if (!data.email) errors.email = "We need an email address to reply.";
  else if (data.email.length > LIMITS.email || !EMAIL_RE.test(data.email)) errors.email = "That email address doesn't look right.";
  else if (FREE_MAIL.test(data.email)) errors.email = "Please use your business email address.";

  if (!data.company) errors.company = "Which company are you with?";
  else if (data.company.length > LIMITS.company) errors.company = "That company name is too long.";

  if (!(SERVICE_OPTIONS as readonly string[]).includes(data.service)) errors.service = "Choose the closest match.";

  if (data.message.length < LIMITS.messageMin)
    errors.message = `A sentence or two helps us prepare (at least ${LIMITS.messageMin} characters).`;
  else if (data.message.length > LIMITS.message) errors.message = `Please keep it under ${LIMITS.message} characters.`;

  return Object.keys(errors).length ? { errors } : { data, errors };
}
