import type { Metadata } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { PageHero } from "@/components/Primitives";
import { ContactForm } from "@/components/ContactForm";
import { FadeIn } from "@/components/motion/Text";

export const metadata: Metadata = {
  title: "Contact",
  description: "Discuss a project, request a demonstration or ask a question. Razion Labs replies within two working days.",
  alternates: { canonical: "/contact" },
};

type Props = { searchParams: Promise<{ service?: string; topic?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const { service, topic } = await searchParams;
  const preset = services.find((s) => s.name === service)?.name;
  const demo = topic === "demo";

  return (
    <>
      <PageHero
        crumbs={[{ href: "/contact", label: "Contact" }]}
        title={demo ? "Request a demonstration" : "Contact"}
        lede={demo ? "Tell us which process or use case you would like to see, and we will arrange a walkthrough." : "Discuss a project, request a demonstration or ask a question. An engineer replies within two working days."}
      />
      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="wrap contact-layout">
          <FadeIn className="stack" y={16}>
            <ol className="next-steps" aria-label="What happens next">
              <li>
                <b>Reply</b>
                <span>Within two working days.</span>
              </li>
              <li>
                <b>Discovery call</b>
                <span>30 minutes with an engineer.</span>
              </li>
              <li>
                <b>Proposal</b>
                <span>Scope, timeline, success metric.</span>
              </li>
            </ol>
            <a href={`mailto:${site.email}`} className="footer-mail" style={{ justifySelf: "start" }}>
              {site.email}
            </a>
          </FadeIn>
          <FadeIn delay={0.15} y={24}>
            <ContactForm defaultService={preset} />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
