"use client";

import { useEffect, useState } from "react";

const KEY = "rl-motion";

/**
 * Site-wide "Motion on/off" switch (WCAG 2.2.2 pause control for all looping
 * animation). Adds html.motion-off, which pauses CSS animation, SVG/SMIL and
 * the hero canvas. Preference is remembered per browser.
 */
export function MotionSwitch() {
  const [off, setOff] = useState(false);

  const apply = (value: boolean) => {
    document.documentElement.classList.toggle("motion-off", value);
    document.querySelectorAll("svg").forEach((s) => (value ? s.pauseAnimations() : s.unpauseAnimations()));
    window.dispatchEvent(new CustomEvent("rl:motion", { detail: { off: value } }));
  };

  useEffect(() => {
    let stored = false;
    try {
      stored = localStorage.getItem(KEY) === "off";
    } catch {}
    if (stored) {
      setOff(true);
      apply(true);
    }
  }, []);

  const toggle = () => {
    const next = !off;
    setOff(next);
    apply(next);
    try {
      localStorage.setItem(KEY, next ? "off" : "on");
    } catch {}
  };

  return (
    <button type="button" className="motion-switch" role="switch" aria-checked={!off} onClick={toggle}>
      <span className="motion-switch__track" aria-hidden="true">
        <span className="motion-switch__thumb" />
      </span>
      Motion {off ? "off" : "on"}
    </button>
  );
}
