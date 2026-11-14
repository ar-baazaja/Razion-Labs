import type { Metadata } from "next";
import { work } from "@/content/work";
import { services } from "@/content/services";
import { PageHero } from "@/components/Primitives";
import { CtaBlock } from "@/components/CtaBlock";
import { WorkCard } from "@/components/WorkCard";
import { WorkFilter } from "@/components/WorkFilter";

export const metadata: Metadata = {
  title: "Work",
  description: "Capabilities showcase: reference architectures for process mining, AI assistants, intelligent automation and enterprise search.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const used = new Set(work.flatMap((w) => w.services));
  const options = services.filter((s) => used.has(s.slug)).map((s) => ({ value: s.slug, label: s.name }));
  const cards = Object.fromEntries(work.map((w) => [w.slug, <WorkCard key={w.slug} item={w} />]));

  return (
    <>
      <PageHero
        crumbs={[{ href: "/work", label: "Work" }]}
        title="Work"
        lede="A capabilities showcase: the challenge, approach and architecture of engagements we deliver. Client-approved case studies with verified results will be published here."
      />
      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <WorkFilter items={work.map(({ slug, services }) => ({ slug, services }))} cards={cards} options={options} />
        </div>
      </section>
      <CtaBlock />
    </>
  );
}
