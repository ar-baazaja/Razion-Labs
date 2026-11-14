/**
 * Global site settings. This is the single place to change company identity,
 * contact details and navigation. Values marked `APPROVAL` must be confirmed
 * by Razion Labs before launch (requirements §9 and §13).
 */
/**
 * Canonical origin: NEXT_PUBLIC_SITE_URL when set (your custom domain), otherwise
 * the Vercel production domain, otherwise the planned domain.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://razionlabs.com");

export const site = {
  name: "Razion Labs",
  legalName: "Razion Labs S.R.L.",
  url: siteUrl,
  tagline: "Engineer intelligence. Transform operations.",
  description:
    "Razion Labs builds production AI systems, process-mining analytics and intelligent automation for enterprise operations teams.",
  // APPROVAL: primary business inbox supplied by Razion Labs.
  email: "hello@razionlabs.com",
  // APPROVAL: registered office / registration number for the legal footer.
  registration: "Registered in Romania",
  locale: "en",
} as const;

export type NavItem = { href: string; label: string };

export const primaryNav: NavItem[] = [
  { href: "/#services", label: "Services" },
  { href: "/#solutions", label: "Solutions" },
  { href: "/#work", label: "Projects" },
  { href: "/#process", label: "How we deliver" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Explore",
    items: [
      { href: "/#services", label: "Services" },
      { href: "/#solutions", label: "Solutions" },
      { href: "/#work", label: "Projects" },
      { href: "/#process", label: "How we deliver" },
      { href: "/#contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    items: [
      { href: "/legal/privacy", label: "Privacy" },
      { href: "/legal/cookies", label: "Cookies" },
    ],
  },
];
