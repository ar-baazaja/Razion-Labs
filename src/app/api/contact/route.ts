import { NextResponse } from "next/server";
import { validateContact } from "@/lib/contact";

/**
 * Contact inquiry endpoint.
 * - Server-side validation (authoritative), honeypot and minimum fill time.
 * - Per-IP rate limit (in-memory; swap for Redis/Upstash when running on multiple instances).
 * - Delivery to CONTACT_WEBHOOK_URL, a server-only secret never bundled for the browser.
 */
export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MIN_FILL_MS = 3000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // bound memory
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many submissions. Please try again in a few minutes." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Anti-spam: hidden field must be empty and the form must not be submitted instantly.
  const startedAt = Number(body.startedAt);
  if (body.website || !Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) {
    // Respond as success so bots learn nothing.
    return NextResponse.json({ ok: true });
  }

  const { data, errors } = validateContact(body);
  if (!data) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] CONTACT_WEBHOOK_URL not set; inquiry received in development:", {
        ...data,
        message: `${data.message.slice(0, 80)}…`,
      });
      return NextResponse.json({ ok: true });
    }
    console.error("[contact] CONTACT_WEBHOOK_URL is not configured");
    return NextResponse.json(
      { ok: false, error: "Our form is temporarily unavailable. Please email us directly." },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "website_inquiry",
        receivedAt: new Date().toISOString(),
        ...data,
        text: `New inquiry from ${data.name} (${data.company}) about ${data.service}`,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (err) {
    console.error("[contact] delivery failed", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't deliver your message. Please try again or email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
