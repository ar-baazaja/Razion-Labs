"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Service } from "@/content/services";
import { ScreenTile, type ScreenKind } from "./screens/Screens";

/** Services overview list; the hovered/focused row shows its diagram alongside. */
export function ServiceIndex({ items }: { items: Pick<Service, "slug" | "name" | "short" | "outcome">[] }) {
  const [active, setActive] = useState(items[0].slug);

  return (
    <div className="svc-index">
      <ul className="svc-index__list">
        {items.map((s) => (
          <li key={s.slug} className={`svc-index__row ${active === s.slug ? "is-active" : ""}`}>
            <Link href={`/services/${s.slug}`} onPointerEnter={() => setActive(s.slug)} onFocus={() => setActive(s.slug)}>
              <span className="svc-index__text">
                <span className="svc-index__name">{s.name}</span>
                <span className="svc-index__kicker">{s.short}</span>
                <span className="svc-index__tech">Outcome: {s.outcome}</span>
              </span>
              <span className="svc-index__arrow" aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="svc-index__preview" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.div
            key={active}
            className="svc-index__photo"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            <ScreenTile kind={active as ScreenKind} className="stage--fill" />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
