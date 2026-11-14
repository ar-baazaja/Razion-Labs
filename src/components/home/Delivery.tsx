"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";

/** How we deliver (requirements §4.05) as an accordion. */
const STEPS = [
  { n: "Discover", d: "We map the process, the data sources and the people involved, and agree the success criteria and baseline." },
  { n: "Design", d: "Architecture, integrations, security model and failure modes are designed and reviewed with your IT team before build." },
  { n: "Build", d: "Working increments on your real data every sprint, with evaluation built in from the first release." },
  { n: "Deploy", d: "Staged rollout with monitoring, runbooks and a rollback plan. Shadow mode first where risk is high." },
  { n: "Improve", d: "Results are measured against the baseline, the next iteration is prioritised, and everything is handed over." },
];

export function Delivery() {
  const [open, setOpen] = useState(0);
  const base = useId();
  return (
    <div className="deliver">
      <ol className="acc">
        {STEPS.map((s, i) => {
          const isOpen = open === i;
          return (
            <li key={s.n} className={`acc__item ${isOpen ? "is-open" : ""}`}>
              <h3>
                <button type="button" aria-expanded={isOpen} aria-controls={`${base}-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                  <span className="acc__num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="acc__title">{s.n}</span>
                  <span className="acc__icon" aria-hidden="true" />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`${base}-${i}`}
                    className="acc__panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
                  >
                    <p>{s.d}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>
      <ul className="pills" aria-label="In every phase">
        <li>Governance</li>
        <li>Security</li>
        <li>Integration</li>
      </ul>
    </div>
  );
}
