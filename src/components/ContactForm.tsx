"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { LIMITS, SERVICE_OPTIONS, validateContact, type ContactInput, type FieldErrors } from "@/lib/contact";
import { site } from "@/content/site";
import { track } from "@/lib/analytics";

type Status = { kind: "idle" | "sending" | "ok" | "error"; message?: string };

const STEPS: { title: string; fields: (keyof ContactInput)[] }[] = [
  { title: "Service interest", fields: ["service"] },
  { title: "Your details", fields: ["name", "email", "company"] },
  { title: "Project message", fields: ["message"] },
];

/**
 * Three-step inquiry form. Values live in state, so moving between steps
 * never loses input. Validation runs per step on the client and fully on the
 * server (/api/contact).
 */
export function ContactForm({ defaultService, idPrefix = "cf" }: { defaultService?: string; idPrefix?: string }) {
  const [step, setStep] = useState(defaultService ? 1 : 0);
  const [dir, setDir] = useState(1);
  const [values, setValues] = useState<ContactInput>({
    name: "",
    email: "",
    company: "",
    service: defaultService ?? "",
    message: "",
    consent: false,
  });
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const startedAt = useRef(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status.kind === "ok" || status.kind === "error") statusRef.current?.focus();
  }, [status.kind]);

  const id = (k: string) => `${idPrefix}-${k}`;
  const set = <K extends keyof ContactInput>(k: K, v: ContactInput[K]) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const stepErrors = (i: number) => {
    const { errors: all } = validateContact(values as unknown as Record<string, unknown>);
    return Object.fromEntries(STEPS[i].fields.filter((f) => all[f]).map((f) => [f, all[f]])) as FieldErrors;
  };

  const focusFirstError = (errs: FieldErrors) => {
    const first = Object.keys(errs)[0];
    requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus());
  };

  const go = (to: number) => {
    if (to > step) {
      const errs = stepErrors(step);
      if (Object.keys(errs).length) {
        setErrors(errs);
        focusFirstError(errs);
        return;
      }
    }
    setDir(to > step ? 1 : -1);
    setStep(to);
    requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>("h3")?.focus());
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step < STEPS.length - 1) return go(step + 1);
    const { errors: errs } = validateContact(values as unknown as Record<string, unknown>);
    if (Object.keys(errs).length) {
      setErrors(errs);
      const bad = STEPS.findIndex((s) => s.fields.some((f) => errs[f]));
      if (bad !== step) {
        setDir(-1);
        setStep(bad);
      }
      focusFirstError(errs);
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
        // No personal data: only the chosen service is recorded.
        track("contact_submit", { service: values.service });
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

  const fieldA11y = (k: keyof FieldErrors) => ({
    id: id(k),
    name: k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? id(`${k}-err`) : undefined,
  });
  const err = (k: keyof FieldErrors) =>
    errors[k] ? (
      <p id={id(`${k}-err`)} className="field__error">
        {errors[k]}
      </p>
    ) : null;

  if (status.kind === "ok") {
    return (
      <motion.div
        className="form form--done"
        ref={statusRef}
        tabIndex={-1}
        role="status"
        initial={reduce ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <svg viewBox="0 0 52 52" className="done-check" aria-hidden="true">
          <circle cx="26" cy="26" r="24" />
          <path d="M15 27 l7 7 l15 -16" />
        </svg>
        <h3>Received. We&apos;ll reply within two working days.</h3>
        <p className="muted">An engineer reads every inquiry.</p>
      </motion.div>
    );
  }

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * -40 }),
  };

  return (
    <form className="form" noValidate onSubmit={onSubmit} aria-describedby={id("privacy")}>
      <div className="form__progress" aria-hidden="true">
        {STEPS.map((s, i) => (
          <span key={s.title} className={i <= step ? "on" : ""} />
        ))}
      </div>
      <p className="form__count">
        Step {step + 1} of {STEPS.length}
      </p>

      <div ref={panelRef} className="form__panel">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={step}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
            className="form__step"
          >
            <h3 tabIndex={-1}>{STEPS[step].title}</h3>

            {step === 0 && (
              <fieldset className="choice" aria-describedby={errors.service ? id("service-err") : undefined}>
                <legend className="visually-hidden">Service interest</legend>
                {SERVICE_OPTIONS.map((o) => (
                  <label key={o} className="choice__item">
                    <input
                      type="radio"
                      name="service"
                      value={o}
                      checked={values.service === o}
                      onChange={() => set("service", o)}
                    />
                    <span>{o}</span>
                  </label>
                ))}
                {err("service")}
              </fieldset>
            )}

            {step === 1 && (
              <div className="stack" style={{ "--stack": "1rem" } as React.CSSProperties}>
                <div className="field">
                  <label htmlFor={id("name")}>Name</label>
                  <input {...fieldA11y("name")} value={values.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" maxLength={LIMITS.name} />
                  {err("name")}
                </div>
                <div className="field">
                  <label htmlFor={id("email")}>Business email</label>
                  <input
                    {...fieldA11y("email")}
                    type="email"
                    value={values.email}
                    onChange={(e) => set("email", e.target.value)}
                    autoComplete="email"
                    inputMode="email"
                    spellCheck={false}
                    maxLength={LIMITS.email}
                  />
                  {err("email")}
                </div>
                <div className="field">
                  <label htmlFor={id("company")}>Company</label>
                  <input {...fieldA11y("company")} value={values.company} onChange={(e) => set("company", e.target.value)} autoComplete="organization" maxLength={LIMITS.company} />
                  {err("company")}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="stack" style={{ "--stack": "1rem" } as React.CSSProperties}>
                <div className="field">
                  <label htmlFor={id("message")}>Project message: the process or system, and what you want to improve</label>
                  <textarea {...fieldA11y("message")} value={values.message} onChange={(e) => set("message", e.target.value)} maxLength={LIMITS.message} />
                  {err("message") ?? <p className="field__hint">{values.message.length} / {LIMITS.message}</p>}
                </div>
                <label className="check" htmlFor={id("consent")}>
                  <input id={id("consent")} type="checkbox" checked={values.consent} onChange={(e) => set("consent", e.target.checked)} />
                  <span>Optional: send me occasional Razion Labs insights.</span>
                </label>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Honeypot */}
      <div className="hp" aria-hidden="true">
        <label htmlFor={id("website")}>Website</label>
        <input id={id("website")} name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      {status.kind === "error" && (
        <div className="form__status form__status--err" role="alert" ref={statusRef} tabIndex={-1}>
          {status.message ?? "Something went wrong."} You can also email <a href={`mailto:${site.email}`}>{site.email}</a>.
        </div>
      )}

      <div className="form__nav">
        {step > 0 ? (
          <button type="button" className="btn btn--ghost" onClick={() => go(step - 1)}>
            ← Back
          </button>
        ) : (
          <span />
        )}
        <button type="submit" className="btn btn--primary" disabled={status.kind === "sending"}>
          {step < STEPS.length - 1 ? "Continue" : status.kind === "sending" ? "Sending…" : "Send inquiry"}
          <span className="btn__arrow" aria-hidden="true">→</span>
        </button>
      </div>
      <p id={id("privacy")} className="form__privacy">
        Used only to reply to you. <Link href="/legal/privacy">Privacy notice</Link>.
      </p>
    </form>
  );
}
