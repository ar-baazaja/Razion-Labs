import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'" + (process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""),
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

/**
 * 301 redirects: the site is a single page, so former pages and common
 * alternative URLs point at the matching home-page section.
 */
const REDIRECTS: [string, string][] = [
  ["/home", "/"],
  ["/index", "/"],
  ["/index.html", "/"],
  ["/about", "/"],
  ["/about-us", "/"],
  ["/services", "/#services"],
  ["/services/:slug*", "/#services"],
  ["/solutions", "/#solutions"],
  ["/solutions/:slug*", "/#solutions"],
  ["/industries", "/#solutions"],
  ["/work", "/#work"],
  ["/case-studies", "/#work"],
  ["/portfolio", "/#work"],
  ["/contact", "/#contact"],
  ["/contact-us", "/#contact"],
  ["/privacy", "/legal/privacy"],
  ["/privacy-policy", "/legal/privacy"],
  ["/cookies", "/legal/cookies"],
  ["/cookie-policy", "/legal/cookies"],
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Hide the Next.js "N" indicator during local development (it never shows in production).
  devIndicators: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return REDIRECTS.map(([source, destination]) => ({ source, destination, statusCode: 301 as const }));
  },
};

export default nextConfig;
