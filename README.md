# Razion Labs — website

Corporate website for Razion Labs S.R.L., built to the *Website Requirements Specification v1.0* (12 Nov 2026).

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · plain CSS with design tokens · [Motion](https://motion.dev) for animation · [Lenis](https://lenis.darkroom.engineering) for smooth scroll · Google fonts self-hosted through `next/font` (Sora, IBM Plex Sans, IBM Plex Mono).

## How the build maps to the requirements

**Homepage (§4)** follows the specified sequence, except that section 04 (AI in action / assistant demo, §4 and §6) has been removed at the client's request: 01 Hero (proposed headline and both CTAs) → 02 Core capabilities → 03 Process mining spotlight → 05 How we deliver → 06 Selected work (capabilities showcase) → 07 Conversion (CTA + inquiry form).

**Service pages (§3)** use one template: problem, outcomes, capabilities (available now vs. roadmap, per §5), approach, integrations, FAQ and CTA.

**Visual direction**, based on current Dribbble AI landing-page references, balances motion and realistic product UI:

| Element | Where |
| --- | --- |
| Drifting aurora light (CSS) | `fx/Aurora.tsx`: hero, AI section, inner-page heroes, contact panel |
| Product panel that tilts upright on scroll (illustrative data) | `fx/HeroPanel.tsx` |
| Capability cards showing each service's product screen | `home/Bento.tsx`, `screens/Screens.tsx` |
| Process analytics screen that tilts into place on scroll | `home/Spotlight.tsx` |
| Delivery accordion, horizontal work rail | `home/Delivery.tsx`, `home/WorkRail.tsx` |
| Platform logo strip (Simple Icons, CC0) | `LogoStrip.tsx` |
| Interactive process-mining demo (§6), introduced as a preview of the Process mining service | `ProcessMiningDemo.tsx` |

Typography: Plus Jakarta Sans, light weights with italic accent words.

**Visuals** are product UI screens built in HTML/CSS (`src/components/screens/Screens.tsx`): one compact application window per service (process analytics, enterprise search, service desk assistant, invoice intake, data pipelines, CRM/ERP integration) plus an engagement overview, all with labelled sample data. They are original and owned outright, so nothing needs licensing (§9). Platform logos describe compatibility only and imply no partnership.

Everything respects `prefers-reduced-motion`, and the footer has a Motion on/off switch.

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
```

## Deploy on Vercel

1. In Vercel, choose **Add New → Project** and import `ar-baazaja/Razion-Labs` from GitHub.
2. Framework preset: **Next.js** (detected automatically). Leave build command, output directory and install command on their defaults.
3. Add environment variables (Project → Settings → Environment Variables):
   - `CONTACT_WEBHOOK_URL`: where contact-form inquiries are delivered. Without it, the form shows a friendly error in production.
   - `NEXT_PUBLIC_ANALYTICS`: set to `vercel` (and enable Web Analytics in the Vercel dashboard) once analytics is approved. Off by default.
   - `NEXT_PUBLIC_SITE_URL`: your custom domain, e.g. `https://razionlabs.com`. Optional: if unset, the Vercel production domain is used for canonical URLs, the sitemap and Open Graph.
4. Click **Deploy**. Every push to `main` redeploys production; other branches get preview URLs.
5. To use a custom domain: Project → Settings → Domains, then set `NEXT_PUBLIC_SITE_URL` to it and redeploy.

Requires Node.js 20.9 or newer (Vercel's default runtime satisfies this).

## Operations

- **Analytics (§8):** cookieless Vercel Web Analytics plus conversion events `contact_submit` (service only), `demo_variant_select` (route) and `cta_click` (button label). Events never contain names, emails or messages. Off until `NEXT_PUBLIC_ANALYTICS=vercel`. Add tracking to any new button with `data-track="label"`. Events are also dispatched as `rl:analytics` DOM events for another approved provider.
- **Redirects (§8):** 301 redirects for common alternative URLs are in `next.config.ts`. Add old-site URLs there before launch.
- **Dependency updates (§8):** Dependabot opens weekly update pull requests (`.github/dependabot.yml`).
- **Backup and recovery (§8):** the GitHub repository is the source of truth, and every Vercel deployment is immutable. To recover, use **Instant Rollback** in the Vercel dashboard (Deployments → ⋯ → Promote/Rollback), or revert the commit and push. The site holds no database, and contact inquiries are delivered to the webhook rather than stored.
- **Hosting, monitoring, DNS and maintenance** are covered by a separate operational agreement (§8 Availability).

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, sitemap and Open Graph. |
| `CONTACT_WEBHOOK_URL` | **Server-only.** HTTPS endpoint that receives contact inquiries as JSON (Slack/Teams webhook, Zapier/Make, CRM intake). In development, inquiries are logged to the console when it is unset. In production, the form returns a clear error if it is unset, so inquiries are never silently lost. |

## Editing content

All copy lives in typed files under `src/content/` and is never hard-coded into pages:

- `site.ts`: company identity, contact email, navigation. Values marked **APPROVAL** need sign-off before launch.
- `services.ts`: the six services. Each entry drives the overview list, the detail page template (problem, outcomes, capabilities, approach, integrations, FAQ) and the FAQ structured data. `capabilities.current` and `capabilities.roadmap` are rendered separately.
- `solutions.ts`: use-case pages.
- `work.ts`: reference architectures. To publish an approved case study, add an entry with `kind: "case-study"` and fill `results` only with verified, client-approved figures.

This structure can be moved into a headless CMS (Sanity, Payload, Contentful) later without changing the page components.

## Sitemap

`/` · `/services` · `/services/[slug]` ×6 · `/solutions` · `/solutions/[slug]` ×4 · `/work` · `/about` · `/contact` · `/legal/privacy` · `/legal/cookies` · `sitemap.xml` · `robots.txt` · generated Open Graph image.

## How the requirements are met

- **Demos (§6):** `ProcessMiningDemo` uses a synthetic order-to-cash log with 4 selectable variants, KPI cards, a process graph and an event-log sample. `AssistantDemo` has 4 scripted scenarios, including a write action held for approval. Both are labelled as demos and make no network calls.
- **Accessibility (§2):** skip link, landmarks, visible focus, labelled controls, `aria-live` updates, keyboard-operable demos, a pause control for looping motion, `prefers-reduced-motion` support. Scroll reveals never hide content that is already on screen or when JS is off.
- **Performance (§8):** nearly every route is statically pre-rendered, the only client components are interactive islands, fonts are self-hosted, and the hero uses no images.
- **Security (§7, §8):** CSP, HSTS, frame, referrer and permissions headers (`next.config.ts`). The contact API validates on the server and uses a honeypot, a minimum fill time and per-IP rate limiting. The webhook secret stays server-side.
- **SEO (§8):** per-page titles, descriptions and canonicals; Organization, Service, FAQPage and BreadcrumbList JSON-LD; sitemap; robots.

## Before launch (open items from §13)

1. Confirm the business email, registration details and final logo in `src/content/site.ts`.
2. Have the legal reviewer approve the privacy and cookie pages (both are marked as drafts).
3. Set `CONTACT_WEBHOOK_URL` and send a test inquiry.
4. Replace the in-memory rate limiter in `src/app/api/contact/route.ts` with a shared store (e.g. Upstash Redis) if you deploy to more than one instance.
5. If you add analytics or a scheduler, update the cookie policy and add consent first. The form already dispatches a `rl:conversion` browser event that an analytics adapter can listen for.
