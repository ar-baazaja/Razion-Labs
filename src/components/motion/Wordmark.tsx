"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/** Oversized "RAZION" at the foot of every page: rises and fills as the footer scrolls in. */
export function Wordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["35%", "0%"]);
  const clip = useTransform(scrollYProgress, [0.35, 1], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);

  return (
    <div ref={ref} className="wordmark" aria-hidden="true">
      <motion.div className="wordmark__inner" style={reduce ? undefined : { y }}>
        <span className="wordmark__outline">RAZION</span>
        <motion.span className="wordmark__fill" style={{ clipPath: reduce ? "none" : clip }}>
          RAZION
        </motion.span>
      </motion.div>
    </div>
  );
}
