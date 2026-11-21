import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/Primitives";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { site } from "@/content/site";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

// Sora for headings (geometric, echoes the logo), Geist for body copy, Geist Mono for small labels.
const display = Sora({ subsets: ["latin", "latin-ext"], variable: "--font-display", display: "swap" });
const body = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-body", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | AI engineering, process mining & automation`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: site.name, locale: "en_GB", url: "/" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF8" },
    { media: "(prefers-color-scheme: dark)", color: "#070A0B" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.locale} className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available before paint so no-JS fallbacks only apply without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js');" + themeInitScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <AnalyticsProvider />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.name,
            legalName: site.legalName,
            url: site.url,
            email: site.email,
            description: site.description,
            logo: new URL("/icon.svg", site.url).toString(),
          }}
        />
      </body>
    </html>
  );
}
