import type { Metadata } from "next";
import { services } from "@/content/services";
import { PageHero } from "@/components/Primitives";
import { CtaBlock } from "@/components/CtaBlock";
import { ServiceIndex } from "@/components/ServiceIndex";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI engineering, AI agents, process mining, intelligent automation, data engineering and custom software integration from Razion Labs.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/services", label: "Services" }]}
        title="Services"
        lede="AI engineering, AI agents and assistants, process mining, intelligent automation, data engineering, and custom software and integration."
      />
      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <ServiceIndex items={services.map(({ slug, name, short, outcome }) => ({ slug, name, short, outcome }))} />
        </div>
      </section>
      <CtaBlock />
    </>
  );
}
