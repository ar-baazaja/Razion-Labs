"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";

/** Accordion with height animation; one open at a time. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <div className="faq">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="faq__item">
            <h3 style={{ margin: 0 }}>
              <button
                type="button"
                className="faq__q"
                aria-expanded={isOpen}
                aria-controls={`${base}-${i}`}
                id={`${base}-q-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {f.q}
                <span className="faq__icon" aria-hidden="true">+</span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${base}-${i}`}
                  role="region"
                  aria-labelledby={`${base}-q-${i}`}
                  className="faq__a"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
                >
                  <p>{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
