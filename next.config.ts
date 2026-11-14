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
 * 301 redirects (requirements §8 SEO): common alternative and legacy URLs.
 * Add old-site URLs here when Razion Labs supplies them.
 */
const REDIRECTS: [string, string][] = [
  ["/home", "/"],
  ["/index", "/"],
  ["/index.html", "/"],
  ["/about-us", "/about"],
  ["/contact-us", "/contact"],
  ["/case-studies", "/work"],
  ["/portfolio", "/work"],
  ["/industries", "/solutions"],
  ["/privacy", "/legal/privacy"],
  ["/privacy-policy", "/legal/privacy"],
  ["/cookies", "/legal/cookies"],
  ["/cookie-policy", "/legal/cookies"],
  ["/services/ai", "/services/ai-engineering"],
  ["/services/agents", "/services/ai-agents"],
  ["/services/automation", "/services/intelligent-automation"],
  ["/services/data", "/services/data-engineering"],
  ["/services/integration", "/services/custom-software"],
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return REDIRECTS.map(([source, destination]) => ({ source, destination, statusCode: 301 as const }));
  },
};

export default nextConfig;
