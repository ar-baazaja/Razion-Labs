# Razion Labs — website

One-page website for Razion Labs S.R.L., with content from the *Website Requirements Specification v1.0* (services, solutions, projects and delivery steps) in a Bloom-inspired layout.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · plain CSS with design tokens · [Motion](https://motion.dev) for scroll animation · two [React Bits](https://reactbits.dev) WebGL backgrounds · Plus Jakarta Sans self-hosted through `next/font`.

## Page structure

The home page (`src/app/page.tsx`) is a single framed page:

1. **Hero:** React Bits **Orb** background (`components/reactbits/Orb.tsx`), the headline "Engineer intelligence. Transform operations." and the "Discuss a project" call to action.
2. **About us:** statement plus three figures (6 services, 4 solution areas, 5 delivery steps).
3. **Services:** a panel with the four solution areas as chips and the six services as an accordion (`components/home/ServiceAccordion.tsx`).
4. **Projects:** the four example projects as horizontally scrolling cards.
5. **How we deliver:** Discover → Design → Build → Deploy → Improve.
6. **Banner:** React Bits **Threads** background (`components/reactbits/Threads.tsx`).
7. **Contact:** an inquiry form (name, email, optional company, message).

Every page ends with the large **RAZION** wordmark in the footer. Other pages: `/legal/privacy`, `/legal/cookies`. Former URLs (`/services`, `/work`, `/contact`, …) 301-redirect to the matching home section (`next.config.ts`).

The React Bits components are used under their license (MIT + Commons Clause). They load only in the browser (`components/fx/Backdrops.tsx`) and respect `prefers-reduced-motion`.

## Editing content

All home-page text is in `src/content/home.ts` (hero, about, services, solutions, projects, steps, contact). Company name, email and navigation are in `src/content/site.ts`; values marked **APPROVAL** need sign-off before launch.

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
```

## Deploy on Vercel

1. In Vercel, choose **Add New → Project** and import `ar-baazaja/Razion-Labs` from GitHub.
2. Framework preset: **Next.js** (detected automatically). Leave the build settings on their defaults.
3. Add environment variables (Project → Settings → Environment Variables):
   - `CONTACT_WEBHOOK_URL`: where contact-form messages are delivered (Slack/Teams webhook, Zapier, Make, CRM). Without it, the form shows a friendly error in production.
   - `NEXT_PUBLIC_ANALYTICS`: set to `vercel` (and enable Web Analytics in the Vercel dashboard) to turn on cookieless analytics. Off by default.
   - `NEXT_PUBLIC_SITE_URL`: your custom domain, e.g. `https://razionlabs.com`. Optional; defaults to the Vercel production domain.
4. Click **Deploy**. Every push to `main` redeploys production; other branches get preview URLs.

Requires Node.js 20.9 or newer.

## Operations

- **Analytics:** events `cta_click` (button label) and `contact_submit` contain no personal data. Add tracking to any button with `data-track="label"`.
- **Security:** CSP, HSTS and other headers in `next.config.ts`. The contact API validates on the server and uses a honeypot, a minimum fill time and per-IP rate limiting. The webhook URL stays server-side.
- **Dependency updates:** Dependabot opens weekly pull requests (`.github/dependabot.yml`).
- **Backup and recovery:** GitHub is the source of truth. To roll back, use Vercel's Instant Rollback or revert the commit. The site stores no data.

## Before launch

1. Confirm the business email and legal name in `src/content/site.ts`.
2. Have the privacy and cookie pages reviewed (both are marked as drafts).
3. Set `CONTACT_WEBHOOK_URL` and send a test message.
