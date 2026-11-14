"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { LIMITS, validateContact, type ContactInput, type FieldErrors } from "@/lib/contact";
import { site } from "@/content/site";
import { track } from "@/lib/analytics";

type Status = { kind: "idle" | "sending" | "ok" | "error"; message?: string };

/** One-step contact form: name, email, company (optional), message. */
export function ContactForm() {
  const [values, setValues] = useState<ContactInput>({ name: "", email: "", company: "", message: "" });
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  useEffect(() => {
    if (status.kind === "ok" || status.kind === "error") statusRef.current?.focus();
  }, [status.kind]);

  const set = (k: keyof ContactInput, v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { errors: errs } = validateContact(values as unknown as Record<string, unknown>);
    if (Object.keys(errs).length) {
      setErrors(errs);
      formRef.current?.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website, startedAt: startedAt.current }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus({ kind: "ok" });
        track("contact_submit"); // no personal data
      } else if (json.errors) {
        setErrors(json.errors);
        setStatus({ kind: "idle" });
      } else {
        setStatus({ kind: "error", message: json.error });
      }
    } catch {
      setStatus({ kind: "error" });
    }
  }

  const field = (k: keyof ContactInput) => ({
    id: `cf-${k}`,
    name: k,
    value: values[k],
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `cf-${k}-err` : undefined,
  });
  const err = (k: keyof ContactInput) =>
    errors[k] ? (
      <p id={`cf-${k}-err`} className="field__error">
        {errors[k]}
      </p>
    ) : null;

  if (status.kind === "ok") {
    return (
      <motion.div className="form form--done" ref={statusRef} tabIndex={-1} role="status" initial={reduce ? false : { opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
        <svg viewBox="0 0 52 52" className="done-check" aria-hidden="true">
          <circle cx="26" cy="26" r="24" />
          <path d="M15 27 l7 7 l15 -16" />
        </svg>
        <h3>Thanks, we&apos;ve got it.</h3>
        <p className="muted">We&apos;ll reply within two working days.</p>
      </motion.div>
    );
  }

  return (
    <form ref={formRef} className="form" noValidate onSubmit={onSubmit}>
      <div className="form__row">
        <div className="field">
          <label htmlFor="cf-name">Name</label>
          <input {...field("name")} onChange={(e) => set("name", e.target.value)} autoComplete="name" maxLength={LIMITS.name} />
          {err("name")}
        </div>
        <div className="field">
          <label htmlFor="cf-email">Email</label>
          <input {...field("email")} type="email" onChange={(e) => set("email", e.target.value)} autoComplete="email" inputMode="email" spellCheck={false} maxLength={LIMITS.email} />
          {err("email")}
        </div>
      </div>
      <div className="field">
        <label htmlFor="cf-company">
          Company <span className="field__optional">(optional)</span>
        </label>
        <input {...field("company")} onChange={(e) => set("company", e.target.value)} autoComplete="organization" maxLength={LIMITS.company} />
        {err("company")}
      </div>
      <div className="field">
        <label htmlFor="cf-message">What would you like to fix?</label>
        <textarea {...field("message")} onChange={(e) => set("message", e.target.value)} maxLength={LIMITS.message} placeholder="e.g. We spend hours every week typing supplier invoices into our system." />
        {err("message")}
      </div>

      <div className="hp" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      {status.kind === "error" && (
        <div className="form__status--err" role="alert" ref={statusRef} tabIndex={-1}>
          {status.message ?? "Something went wrong."} You can also email <a href={`mailto:${site.email}`}>{site.email}</a>.
        </div>
      )}

      <div className="form__nav">
        <p className="form__privacy">
          We only use this to reply to you. <Link href="/legal/privacy">Privacy</Link>
        </p>
        <button type="submit" className="btn btn--primary btn--lg" disabled={status.kind === "sending"}>
          {status.kind === "sending" ? "Sending…" : "Send message"}
          <span className="btn__arrow" aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  );
}
