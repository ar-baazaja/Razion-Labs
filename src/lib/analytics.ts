"use client";

import { track as vercelTrack } from "@vercel/analytics";

/**
 * Privacy-aware conversion events (requirements §8 Analytics).
 *
 * - Events carry labels only (button text, service name, demo route), never
 *   names, emails, messages or other personal data.
 * - Vercel Web Analytics (cookieless) receives events only when
 *   NEXT_PUBLIC_ANALYTICS=vercel, so no third-party analytics run until
 *   Razion Labs approves it (requirements §7).
 * - Every event is also dispatched as a `rl:analytics` DOM event, so another
 *   approved provider can listen without touching components.
 */
export type AnalyticsEvent = "cta_click" | "demo_variant_select" | "contact_submit";
type Props = Record<string, string | number | boolean | null>;

export const analyticsEnabled = process.env.NEXT_PUBLIC_ANALYTICS === "vercel";

export function track(event: AnalyticsEvent, props: Props = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("rl:analytics", { detail: { event, ...props } }));
  if (analyticsEnabled) {
    try {
      vercelTrack(event, props);
    } catch {
      /* analytics must never break the page */
    }
  }
}
