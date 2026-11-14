import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageHero } from "@/components/Primitives";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: `How ${site.legalName} collects and uses personal data submitted through this website.`,
  alternates: { canonical: "/legal/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero crumbs={[{ href: "/legal/privacy", label: "Privacy notice" }]} title="Privacy notice" />
      <section className="section section--tight">
        <div className="wrap legal">
          <p className="notice">
            Draft for legal review. Final wording must be approved by {site.legalName}&apos;s legal reviewer before launch.
          </p>
          <p>Last updated: 13 November 2026</p>

          <h2>Who we are</h2>
          <p>
            {site.legalName} (&quot;Razion Labs&quot;, &quot;we&quot;) is the controller of personal data collected
            through this website. Contact: <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>

          <h2>What we collect</h2>
          <ul>
            <li>Contact form: your name, business email, company, service interest and message.</li>
            <li>Optional: your choice to receive occasional updates.</li>
            <li>Technical: server logs (IP address, browser type, time of request) kept for security and abuse prevention.</li>
          </ul>
          <p>The interactive demos on this site run entirely in your browser. Nothing you select in them is sent to us.</p>

          <h2>Why and on what legal basis</h2>
          <ul>
            <li>To respond to your inquiry and take steps before entering a contract (GDPR Art. 6(1)(b)).</li>
            <li>To keep the website secure and prevent spam (legitimate interest, Art. 6(1)(f)).</li>
            <li>To send updates, only if you opted in (consent, Art. 6(1)(a)), withdrawable at any time.</li>
          </ul>

          <h2>How long we keep it</h2>
          <p>
            Inquiries that do not lead to a business relationship are deleted within 24 months. Server logs are kept for
            no longer than 90 days.
          </p>

          <h2>Who we share it with</h2>
          <p>
            Only with service providers that host this website or deliver form submissions to us, under data-processing
            agreements. We do not sell personal data.
          </p>

          <h2>Your rights</h2>
          <p>
            You may request access, correction, deletion, restriction or portability of your data, and object to
            processing, by emailing <a href={`mailto:${site.email}`}>{site.email}</a>. You may also lodge a complaint with
            the Romanian supervisory authority (ANSPDCP) or the authority in your country.
          </p>
        </div>
      </section>
    </>
  );
}
