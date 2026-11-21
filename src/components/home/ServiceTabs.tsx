"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useRef, useState } from "react";

type Item = { name: string; text: string; outcome: string };

/** Simple line glyphs, one per service, drawn in the panel corner. */
const GLYPHS = [
  // AI engineering: document with spark
  "M14 6h18l8 8v28H14z M32 6v8h8 M20 24h14 M20 30h10 M42 38l3-6 3 6-6-3 6 0z",
  // Agents: chat bubbles
  "M8 12h26v18H18l-8 6v-6H8z M34 20h8v16h-4v5l-6-5H22v-6",
  // Process mining: connected nodes
  "M10 34a4 4 0 1 0 0.1 0 M26 14a4 4 0 1 0 0.1 0 M42 30a4 4 0 1 0 0.1 0 M13 31l10-13 M29 17l10 11",
  // Automation: gear-ish loop arrows
  "M12 24a12 12 0 0 1 22-7 M36 24a12 12 0 0 1-22 7 M34 10v7h-7 M14 38v-7h7",
  // Data engineering: stacked cylinders
  "M10 12c0-3 28-3 28 0s-28 3-28 0 M10 12v8c0 3 28 3 28 0v-8 M10 20v8c0 3 28 3 28 0v-8 M10 28v8c0 3 28 3 28 0v-8",
  // Integration: plug
  "M18 6v10 M30 6v10 M12 16h24v8a12 12 0 0 1-24 0z M24 36v8",
];

/** Linq-style sticky list on the left, detail panel on the right. */
export function ServiceTabs({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const base = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const s = items[active];

  const onKey = (e: React.KeyboardEvent) => {
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (active + dir + items.length) % items.length;
    setActive(next);
    listRef.current?.querySelectorAll<HTMLButtonElement>("[role=tab]")[next]?.focus();
  };

  return (
    <div className="stabs">
      <div className="stabs__list" role="tablist" aria-orientation="vertical" aria-label="Services" ref={listRef} onKeyDown={onKey}>
        {items.map((it, i) => (
          <button
            key={it.name}
            type="button"
            role="tab"
            id={`${base}-t${i}`}
            aria-selected={i === active}
            aria-controls={`${base}-p`}
            tabIndex={i === active ? 0 : -1}
            className="stabs__tab"
            onClick={() => setActive(i)}
          >
            <span className="stabs__num">{String(i + 1).padStart(2, "0")}</span>
            {it.name}
          </button>
        ))}
      </div>
      <div className="stabs__panel" role="tabpanel" id={`${base}-p`} aria-labelledby={`${base}-t${active}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            className="stabs__inner"
            initial={reduce ? false : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: -12 }}
            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <svg className="stabs__glyph" viewBox="0 0 48 48" aria-hidden="true">
              <path d={GLYPHS[active % GLYPHS.length]} />
            </svg>
            <h3>{s.name}</h3>
            <p className="stabs__text">{s.text}</p>
            <p className="stabs__outcome">
              <span>Outcome</span>
              {s.outcome}
            </p>
            <a href="#contact" className="link-arrow" data-track={`service_${active + 1}_discuss`}>
              Talk to an engineer <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
