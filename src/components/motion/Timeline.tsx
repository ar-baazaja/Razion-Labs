"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/** Steps joined by a line that draws itself as you scroll. */
export function Timeline({ steps }: { steps: { title: string; body: string }[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <ol ref={ref} className="timeline">
      <span className="timeline__line" aria-hidden="true">
        <motion.span style={{ "--p": reduce ? 1 : scale } as unknown as React.CSSProperties} />
      </span>
      {steps.map((s, i) => (
        <motion.li
          key={s.title}
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, delay: i * 0.08 }}
        >
          <span className="timeline__dot">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}

/** A KPI label with a bar that fills on view (illustrative emphasis, no numbers). */
export function Meter({ label, i }: { label: string; i: number }) {
  const reduce = useReducedMotion();
  return (
    <li className="meter">
      <span>{label}</span>
      <div className="meter__bar" aria-hidden="true">
        <motion.i
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: i * 0.1, ease: [0.2, 0.7, 0.2, 1] }}
        />
      </div>
    </li>
  );
}
