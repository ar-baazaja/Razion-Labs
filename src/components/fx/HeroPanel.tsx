"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const FEED = [
  { k: "ok", t: "Invoice INV-2041 matched to PO-20931", s: "Automation" },
  { k: "ok", t: "Ticket #8812 resolved by assistant", s: "AI agents" },
  { k: "warn", t: "Bottleneck detected · Manual review", s: "Process mining" },
  { k: "ok", t: "Warehouse refresh · 12 quality checks passed", s: "Data" },
];

const BARS = [42, 55, 48, 63, 58, 71, 66, 79, 74, 86, 82, 91];

/**
 * Product panel that tilts upright as the page scrolls (perspective reveal).
 * Illustrative data, labelled as such.
 */
export function HeroPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 25%"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <div ref={ref} className="hpanel-wrap">
      <motion.div
        className="hpanel"
        style={reduce ? undefined : { rotateX, scale, y }}
        role="img"
        aria-label="Example operations dashboard showing cycle time, throughput, automation rate, a weekly trend and recent activity."
      >
        <div className="hpanel__bar" aria-hidden="true">
          <span className="hpanel__dots">
            <i />
            <i />
            <i />
          </span>
          <span>Operations overview</span>
        </div>
        <div className="hpanel__body" aria-hidden="true">
          <div className="hpanel__kpis">
            {[
              ["Cycle time", "8.4", "days", "−18%"],
              ["Throughput", "48", "/ week", "+9%"],
              ["Automated", "62", "%", "+14%"],
            ].map(([k, v, u, d]) => (
              <div key={k} className="hpanel__kpi">
                <small>{k}</small>
                <b>
                  {v}
                  <em>{u}</em>
                </b>
                <span>{d}</span>
              </div>
            ))}
          </div>
          <div className="hpanel__chart">
            <small>Cases resolved per week</small>
            <div className="hpanel__bars">
              {BARS.map((h, i) => (
                <i key={i} style={{ height: `${h}%`, animationDelay: `${i * 0.05}s` }} />
              ))}
            </div>
          </div>
          <ul className="hpanel__feed">
            {FEED.map((f) => (
              <li key={f.t} className={`is-${f.k}`}>
                <span className="hpanel__dot" />
                <span className="hpanel__t">{f.t}</span>
                <span className="hpanel__s">{f.s}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
