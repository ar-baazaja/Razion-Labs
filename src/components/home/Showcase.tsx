"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { showcase, services } from "@/content/home";
import { AgentChat, InvoiceExtract, ProcessMap } from "./Visuals";

const VISUALS = { mining: ProcessMap, agents: AgentChat, automation: InvoiceExtract } as const;
const ROTATE_MS = 7000;

/** ElevenLabs-style switcher: tabs on top, a live stage, services along the bottom. */
export function Showcase() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const base = useId();
  const tabsRef = useRef<HTMLDivElement>(null);
  const rotating = auto && !paused && !reduce;

  useEffect(() => {
    if (!rotating) return;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % showcase.length), ROTATE_MS);
    return () => window.clearTimeout(t);
  }, [rotating, active]);

  const pick = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  const onKey = (e: React.KeyboardEvent) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (active + dir + showcase.length) % showcase.length;
    pick(next);
    tabsRef.current?.querySelectorAll<HTMLButtonElement>("[role=tab]")[next]?.focus();
  };

  const item = showcase[active];
  const Visual = VISUALS[item.id];

  return (
    <div
      className="showcase"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="showcase__tabs" role="tablist" aria-label="What we build" ref={tabsRef} onKeyDown={onKey}>
        {showcase.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            id={`${base}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${base}-panel`}
            tabIndex={i === active ? 0 : -1}
            className="showcase__tab"
            onClick={() => pick(i)}
          >
            <span className={`showcase__dot showcase__dot--${s.id}`} aria-hidden="true" />
            {s.label}
            {i === active && rotating && <span key={active} className="showcase__progress" style={{ animationDuration: `${ROTATE_MS}ms` }} aria-hidden="true" />}
          </button>
        ))}
      </div>

      <div className="showcase__stage" role="tabpanel" id={`${base}-panel`} aria-labelledby={`${base}-tab-${active}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={item.id}
            className="showcase__grid"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <div className="showcase__copy">
              <p className="mono-label">0{active + 1} / 0{showcase.length}</p>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
            <div className="showcase__visual">
              <Visual />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="showcase__foot">
        <ul className="showcase__chips" aria-label="Services">
          {services.map((s) => (
            <li key={s.name}>
              <a href="#services">{s.name}</a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="btn btn--primary btn--sm" data-track="showcase_discuss_project">
          Discuss a project
        </a>
      </div>
    </div>
  );
}
