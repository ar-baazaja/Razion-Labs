"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { WorkItem } from "@/content/work";

/** Filter chips with a sliding active pill; cards re-flow with layout animation. */
export function WorkFilter({
  items,
  cards,
  options,
}: {
  items: Pick<WorkItem, "slug" | "services">[];
  cards: Record<string, React.ReactNode>;
  options: { value: string; label: string }[];
}) {
  const [filter, setFilter] = useState("all");
  const visible = items.filter((i) => filter === "all" || i.services.includes(filter));

  return (
    <>
      <div className="filter" role="group" aria-label="Filter by service">
        {[{ value: "all", label: "All" }, ...options].map((o) => (
          <button key={o.value} type="button" className="chip" aria-pressed={filter === o.value} onClick={() => setFilter(o.value)}>
            {filter === o.value && <motion.span layoutId="chip-pill" className="chip__pill" transition={{ type: "spring", stiffness: 450, damping: 36 }} />}
            <span className="chip__label">{o.label}</span>
          </button>
        ))}
      </div>
      <p className="visually-hidden" aria-live="polite">
        {visible.length} {visible.length === 1 ? "item" : "items"} shown
      </p>
      <motion.ul layout className="scards scards--work">
        <AnimatePresence mode="popLayout">
          {visible.map((i) => (
            <motion.li
              key={i.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
            >
              {cards[i.slug]}
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
