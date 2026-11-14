import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageHero } from "@/components/Primitives";

export const metadata: Metadata = {
  title: "Cookie policy",
  description: "Which cookies and similar technologies this website uses.",
  alternates: { canonical: "/legal/cookies" },
};

export default function CookiesPage() {
  return (
    <>
      <PageHero crumbs={[{ href: "/legal/cookies", label: "Cookie policy" }]} title="Cookie policy" />
      <section className="section section--tight">
        <div className="wrap legal">
          <p className="notice">
            Draft for legal review. Update this page before enabling any analytics, scheduler or CRM script.
          </p>
          <p>Last updated: 13 November 2026</p>

          <h2>Current use</h2>
          <p>
            This website does not set advertising, tracking or analytics cookies, and no third-party scripts are loaded.
            Because only strictly necessary technologies are used, no consent banner is shown.
          </p>

          <h2>If this changes</h2>
          <p>
            If we add privacy-aware analytics or an embedded meeting scheduler, this page will list each cookie, its
            provider, purpose and duration, and non-essential cookies will only be set after you consent.
          </p>

          <h2>Questions</h2>
          <p>
            Email <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
