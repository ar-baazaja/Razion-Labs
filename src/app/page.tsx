import Link from "next/link";
import { work } from "@/content/work";
import { SplitReveal, FadeIn, Appear } from "@/components/motion/Text";
import { Aurora } from "@/components/fx/Aurora";
import { HeroPanel } from "@/components/fx/HeroPanel";
import { LogoStrip } from "@/components/LogoStrip";
import { ServiceCards } from "@/components/ServiceCard";
import { services } from "@/content/services";
import { SpotlightMedia } from "@/components/home/Spotlight";
import { Delivery } from "@/components/home/Delivery";
import { WorkRail } from "@/components/home/WorkRail";
import { Finale } from "@/components/home/Finale";
import { ProcessMiningDemo } from "@/components/ProcessMiningDemo";

const SPOTLIGHT = [
  { t: "Event logs", d: "Case, activity and timestamp from ERP, CRM and ticketing systems." },
  { t: "Variants", d: "The distinct paths cases actually take." },
  { t: "Bottlenecks", d: "Measured waiting time between activities." },
  { t: "Improvement opportunities", d: "Changes ranked by measured impact." },
];

/** Homepage section sequence follows requirements §4 (01–07). */
export default function Home() {
  return (
    <>
      {/* 01 — Hero */}
      <section className="hero" aria-labelledby="hero-title">
        <Aurora />
        <div className="wrap hero__inner">
          <h1 id="hero-title" className="hero__title appear">
            Engineer <em>intelligence.</em>
            <br />
            Transform <em>operations.</em>
          </h1>
          <Appear delay={0.12}>
            <p className="hero__sub">
              Practical AI, process intelligence and enterprise systems, engineered for production and measured against your own
              operational data.
            </p>
          </Appear>
          <Appear delay={0.3} className="cta-row hero__ctas">
            <Link href="/contact" className="btn btn--primary btn--lg" data-track="hero_discuss_project">
              Discuss a project <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
            <Link href="#capabilities" className="btn btn--ghost btn--lg" data-track="hero_explore_capabilities">
              Explore capabilities
            </Link>
          </Appear>
        </div>
        <div className="wrap">
          <HeroPanel />
        </div>
      </section>

      <LogoStrip />

      {/* 02 — Core capabilities */}
      <section className="section" id="capabilities" aria-labelledby="cap-title">
        <div className="wrap">
          <header className="head head--center">
            <p className="kicker">Core capabilities</p>
            <SplitReveal as="h2" id="cap-title" onView text="Six services." accent="One engineering team." className="h2--mixed" />
          </header>
          <ServiceCards items={services} />
        </div>
      </section>

      {/* 03 — Process mining spotlight */}
      <section className="section section--alt" aria-labelledby="pm-title">
        <div className="wrap">
          <div className="split">
            <div className="split__copy">
              <p className="kicker">Process mining spotlight</p>
              <SplitReveal as="h2" id="pm-title" onView text="See the process" accent="that actually runs." className="h2--mixed" />
              <p className="lede">Your systems already record how work flows. We turn those records into a map of the real process.</p>
              <dl className="defs">
                {SPOTLIGHT.map((s) => (
                  <div key={s.t}>
                    <dt>{s.t}</dt>
                    <dd>{s.d}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <SpotlightMedia />
          </div>
          <FadeIn className="spotlight-demo">
            <ProcessMiningDemo />
          </FadeIn>
        </div>
      </section>

      {/* 05 — How we deliver */}
      <section className="section" aria-labelledby="deliver-title">
        <div className="wrap split split--top">
          <div className="split__copy">
            <p className="kicker">How we deliver</p>
            <SplitReveal as="h2" id="deliver-title" onView text="Five steps." accent="No black boxes." className="h2--mixed" />
            <p className="lede">Governance, security and integration are part of every phase, not added at the end.</p>
          </div>
          <Delivery />
        </div>
      </section>

      {/* 06 — Selected work */}
      <section className="section section--alt" aria-labelledby="work-title">
        <div className="wrap">
          <header className="head head--split">
            <div>
              <p className="kicker">Selected work</p>
              <SplitReveal as="h2" id="work-title" onView text="Built for" accent="real operations." className="h2--mixed" />
            </div>
            <p className="head__aside">A capabilities showcase until client-approved case studies are available.</p>
          </header>
          <WorkRail items={work} />
        </div>
      </section>

      {/* 07 — Conversion */}
      <section className="section" id="contact" aria-labelledby="contact-title">
        <div className="wrap">
          <Finale />
        </div>
      </section>
    </>
  );
}
