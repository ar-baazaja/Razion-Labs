import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, services } from "@/content/services";
import { JsonLd, PageHero } from "@/components/Primitives";
import { CtaBlock } from "@/components/CtaBlock";
import { ServiceCards } from "@/components/ServiceCard";
import { ScreenTile, type ScreenKind } from "@/components/screens/Screens";
import { FadeIn, SplitReveal } from "@/components/motion/Text";
import { Timeline } from "@/components/motion/Timeline";
import { Faq } from "@/components/motion/Faq";
import { site } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return {
    title: s.name,
    description: s.metaDescription,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: `${s.name} | ${site.name}`, description: s.metaDescription, url: `/services/${s.slug}` },
  };
}

/** Reusable service template (requirements §3): problem, outcomes, capabilities, approach, integrations, FAQ, CTA. */
export default async function ServicePage({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const others = services.filter((o) => o.slug !== s.slug).slice(0, 3);

  return (
    <>
      <PageHero
        crumbs={[
          { href: "/services", label: "Services" },
          { href: `/services/${s.slug}`, label: s.name },
        ]}
        title={s.name}
        lede={s.short}
        visual={<ScreenTile kind={s.slug as ScreenKind} />}
      />

      {/* Problem */}
      <section className="section" aria-labelledby="problem">
        <div className="wrap two-col">
          <div className="stack" style={{ "--stack": "0.75rem" } as React.CSSProperties}>
            <p className="label">The problem</p>
            <SplitReveal as="h2" id="problem" onView text={s.problem.heading} className="h2--md" />
          </div>
          <FadeIn className="prose">
            {s.problem.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* Outcomes */}
      <section className="section section--alt" aria-labelledby="outcomes">
        <div className="wrap">
          <header className="head">
            <SplitReveal as="h2" id="outcomes" onView text="Outcomes" />
          </header>
          <ul className="outcome-grid">
            {s.outcomes.map((o, i) => (
              <FadeIn as="li" key={o.title} delay={i * 0.1} className="outcome-card">
                <span className="outcome-card__check" aria-hidden="true">✓</span>
                <h3>{o.title}</h3>
                <p>{o.body}</p>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section" aria-labelledby="caps">
        <div className="wrap">
          <header className="head head--split">
            <SplitReveal as="h2" id="caps" onView text="Capabilities" />
            <p className="head__aside">What we deliver today is listed separately from what is on our roadmap.</p>
          </header>
          <div className="caps">
            <FadeIn className="caps__col glass">
              <h3>
                <span className="badge badge--accent">Available now</span>
              </h3>
              <ul className="tech__list">
                {s.capabilities.current.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </FadeIn>
            {s.capabilities.roadmap.length > 0 && (
              <FadeIn delay={0.1} className="caps__col caps__col--road">
                <h3>
                  <span className="badge">Roadmap</span>
                </h3>
                <ul className="tech__list tech__list--road">
                  {s.capabilities.roadmap.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                <p className="small-note">In development or available as a scoped pilot.</p>
              </FadeIn>
            )}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="section section--alt" aria-labelledby="approach">
        <div className="wrap">
          <header className="head">
            <SplitReveal as="h2" id="approach" onView text="Approach" />
          </header>
          <Timeline steps={s.approach.map((a) => ({ title: a.step, body: a.body }))} />
        </div>
      </section>

      {/* Integrations */}
      <section className="section section--tight" aria-labelledby="integrations">
        <div className="wrap two-col">
          <div className="stack" style={{ "--stack": "0.75rem" } as React.CSSProperties}>
            <SplitReveal as="h2" id="integrations" onView text="Integrations" className="h2--md" />
            <p className="small-note">Representative platforms. Product names belong to their owners and imply no partnership.</p>
          </div>
          <ul className="int-grid">
            {s.integrations.map((i, n) => (
              <FadeIn as="li" key={i} delay={n * 0.04} y={10}>
                {i}
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--alt" aria-labelledby="faq">
        <div className="wrap two-col">
          <SplitReveal as="h2" id="faq" onView text="FAQ" />
          <Faq items={s.faq} />
        </div>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: s.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }}
        />
      </section>

      <CtaBlock title={`Discuss ${s.name.toLowerCase()} with an engineer.`} service={s.name} />

      <section className="section section--tight" aria-labelledby="related">
        <div className="wrap">
          <header className="head">
            <h2 id="related" className="h2--sm">
              Related services
            </h2>
          </header>
          <ServiceCards items={others} />
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.name,
          description: s.metaDescription,
          provider: { "@type": "Organization", name: site.name, url: site.url },
          url: new URL(`/services/${s.slug}`, site.url).toString(),
        }}
      />
    </>
  );
}
