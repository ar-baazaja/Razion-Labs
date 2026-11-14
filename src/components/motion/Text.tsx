"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.2, 0.7, 0.2, 1] as const;

/**
 * Heading with an optional highlighted second phrase.
 * Above the fold (`onView` false) it uses a CSS entrance so it appears on
 * first paint; further down it fades up when scrolled into view.
 */
export function SplitReveal({
  text,
  accent,
  as = "h1",
  className,
  delay = 0,
  onView = false,
  id,
}: {
  text: string;
  accent?: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  onView?: boolean;
  id?: string;
}) {
  const reduce = useReducedMotion();
  const content = (
    <>
      {text}
      {accent && (
        <>
          {" "}
          <span className="is-accent">{accent}</span>
        </>
      )}
    </>
  );

  if (!onView) {
    const Tag = as;
    return (
      <Tag id={id} className={`appear ${className ?? ""}`} style={{ animationDelay: `${delay}s` }}>
        {content}
      </Tag>
    );
  }

  const Comp = motion[as];
  return (
    <Comp
      id={id}
      className={`fx ${className ?? ""}`}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {content}
    </Comp>
  );
}

/** CSS-only entrance for above-the-fold blocks (no hydration wait, works without JS). */
export function Appear({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <div className={`appear ${className ?? ""}`} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

/** Fade/rise any block into view. */
export function FadeIn({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={`fx ${className ?? ""}`}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}
