"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Screen } from "../screens/Screens";

/** Process analytics screen on a gradient stage; tilts and settles as it scrolls into view. */
export function SpotlightMedia() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateY = useTransform(scrollYProgress, [0, 1], [-14, -4]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [10, 2]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <div ref={ref} className="stage stage--process-mining stage--tall">
      <motion.div className="stage__float" style={reduce ? undefined : { rotateX, rotateY, y }}>
        <Screen kind="process-mining" />
      </motion.div>
    </div>
  );
}
