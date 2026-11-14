"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Inertial smooth scrolling (desktop pointer devices only). Disabled under
 * prefers-reduced-motion and on touch, where native scrolling is better.
 */
export function SmoothScroll() {
  const lenis = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !fine) return;

    const l = new Lenis({ duration: 1.1, anchors: { offset: -72 }, autoRaf: true });
    lenis.current = l;
    document.documentElement.classList.add("lenis");
    return () => {
      l.destroy();
      lenis.current = null;
      document.documentElement.classList.remove("lenis");
    };
  }, []);

  // New page starts at the top.
  useEffect(() => {
    lenis.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
