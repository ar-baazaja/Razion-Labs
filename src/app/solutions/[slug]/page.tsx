import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSolution, solutions } from "@/content/solutions";
import { getService } from "@/content/services";
import { PageHero } from "@/components/Primitives";
import { CtaBlock } from "@/components/CtaBlock";
import { ServiceCards } from "@/components/ServiceCard";
import { ScreenTile, type ScreenKind } from "@/components/screens/Screens";

const SOL_ART: Record<string, ScreenKind> = {
  "operations-optimization": "process-mining",
  "customer-service": "ai-agents",
  "enterprise-search": "ai-engineering",
  forecasting: "data-engineering",
};

import { FadeIn, SplitReveal } from "@/components/motion/Text";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => solutions.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getSolution((await params).slug);
  if (!s) return {};
  return { title: s.name, description: s.metaDescription, alternates: { canonical: `/solutions/${s.slug}` } };
}

export default async function SolutionPage({ params }: Props) {
  const s = getSolution((await params).slug);
  if (!s) notFound();

  return (
    <>
      <PageHero
        crumbs={[
          { href: "/solutions", label: "Solutions" },
          { href: `/solutions/${s.slug}`, label: s.name },
        ]}
        title={s.name}
        lede={s.summary}
        visual={<ScreenTile kind={SOL_ART[s.slug]} />}
      />

      <section className="section" aria-labelledby="signals">
        <div className="wrap">
          <header className="head">
            <SplitReveal as="h2" id="signals" onView text="Signals" />
          </header>
          <ul className="symptoms">
            {s.signals.map((x, i) => (
              <FadeIn as="li" key={x} delay={i * 0.1} className="symptom">
                <span className="symptom__icon" aria-hidden="true">?</span>
                <p>{x}</p>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="build" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <header className="head">
            <SplitReveal as="h2" id="build" onView text="What we build" />
          </header>
          <ul className="outcome-grid">
            {s.whatWeBuild.map((w, i) => (
              <FadeIn as="li" key={w.title} delay={i * 0.1} className="outcome-card">
                <span className="outcome-card__check" aria-hidden="true">✓</span>
                <h3>{w.title}</h3>
                <p>{w.body}</p>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="measure" style={{ paddingTop: 0 }}>
        <div className="wrap two-col">
          <div className="stack" style={{ "--stack": "1.25rem" } as React.CSSProperties}>
            <SplitReveal as="h2" id="measure" onView text="How success is measured" />
            <p className="muted">Baselined from your own data during discovery. We publish only substantiated claims.</p>
          </div>
          <ul className="checklist">
            {s.measures.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="svc" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <header className="head">
            <h2 id="svc" className="visually-hidden">Services involved</h2>
          </header>
          <ServiceCards items={s.services.map((slug) => getService(slug)!)} />
        </div>
      </section>

      <CtaBlock title={`Discuss ${s.name.toLowerCase()} with an engineer.`} />
    </>
  );
}
