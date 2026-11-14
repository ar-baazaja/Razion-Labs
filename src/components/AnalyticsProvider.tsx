"use client";

import { Analytics } from "@vercel/analytics/next";
import { useEffect } from "react";
import { analyticsEnabled, track } from "@/lib/analytics";

/**
 * Loads Vercel Web Analytics when enabled, and records CTA clicks for any
 * element marked `data-track="label"` (one listener, no per-button wiring).
 */
export function AnalyticsProvider() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>("[data-track]");
      if (el) track("cta_click", { label: el.dataset.track ?? "unknown", page: window.location.pathname });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return analyticsEnabled ? <Analytics /> : null;
}
