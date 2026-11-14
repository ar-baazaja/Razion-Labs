import type { Metadata } from "next";
import Link from "next/link";
import { solutions } from "@/content/solutions";
import { PageHero } from "@/components/Primitives";
import { CtaBlock } from "@/components/CtaBlock";

import { FadeIn } from "@/components/motion/Text";

export const metadata: Metadata = {
  title: "Solutions",
  description: "Operations optimization, customer service, enterprise search and forecasting solutions from Razion Labs.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/solutions", label: "Solutions" }]}
        title="Solutions"
        lede="Use-case-led solutions for operations optimization, customer service, enterprise search and forecasting."
      />
      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <ul className="scards scards--work scards--sol">
            {solutions.map((s, i) => (
              <FadeIn as="li" key={s.slug} delay={(i % 2) * 0.08} className="scard">
                <span className="scard__label">Solution</span>
                <h2 className="scard__name">
                  <Link href={`/solutions/${s.slug}`}>{s.name}</Link>
                </h2>
                <p className="scard__desc">{s.summary}</p>
                <div className="scard__outcome">
                  <span>Measured by</span>
                  <p>{s.measures.slice(0, 2).join(" · ")}</p>
                </div>
                <span className="scard__more" aria-hidden="true">
                  Explore <i>→</i>
                </span>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>
      <CtaBlock />
    </>
  );
}
