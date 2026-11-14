"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";

type Item = { name: string; text: string; outcome: string };

/** Bloom-style service list: one row open at a time, "+" circle on the right. */
export function ServiceAccordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(0);
  const base = useId();
  return (
    <ul className="sacc">
      {items.map((s, i) => {
        const isOpen = open === i;
        return (
          <li key={s.name} className={`sacc__item ${isOpen ? "is-open" : ""}`}>
            <h3>
              <button type="button" aria-expanded={isOpen} aria-controls={`${base}-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                <span className="sacc__name">{s.name}</span>
                <span className="sacc__icon" aria-hidden="true" />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${base}-${i}`}
                  className="sacc__panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
                >
                  <div className="sacc__body">
                    <p>{s.text}</p>
                    <p className="sacc__outcome">
                      <span>Outcome</span> {s.outcome}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
