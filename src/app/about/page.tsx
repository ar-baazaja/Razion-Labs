import type { Metadata } from "next";
import { PageHero } from "@/components/Primitives";
import { CtaBlock } from "@/components/CtaBlock";
import { FadeIn, SplitReveal } from "@/components/motion/Text";
import { ScreenTile } from "@/components/screens/Screens";

export const metadata: Metadata = {
  title: "About",
  description: "Razion Labs is an engineering-led company working in AI engineering, intelligent automation and process mining.",
  alternates: { canonical: "/about" },
};

/** About (requirements §3): company story, mission, engineering approach. Team section added when approved. */
const PRINCIPLES = [
  { t: "Measure first", b: "Every engagement starts with a baseline from your own system data, so improvement can be proven." },
  { t: "Production, not prototypes", b: "Evaluation, monitoring, security and failure modes are designed in from the start." },
  { t: "Humans in the loop", b: "Consequential actions keep an approval step and a complete audit trail." },
  { t: "Ownership transfers", b: "Source code, documentation and runbooks are handed over at the end of the engagement." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/about", label: "About" }]}
        title="Engineering-led."
        accent="Outcome-measured."
        lede="Razion Labs works in AI engineering, intelligent automation and process mining, for enterprise operations teams."
        visual={<ScreenTile kind="brand" />}
      />

      <section className="section" aria-labelledby="story">
        <div className="wrap two-col">
          <div className="stack" style={{ "--stack": "0.75rem" } as React.CSSProperties}>
            <p className="label">Company story</p>
            <SplitReveal as="h2" id="story" onView text="Between the strategy deck and the server room." className="h2--md" />
          </div>
          <FadeIn className="prose">
            <p>
              Organisations have no shortage of AI ambition. What is often missing is the engineering in between: the event logs nobody has
              extracted, the integration that was always out of scope, the evaluation that would show whether an assistant is actually right.
            </p>
            <p>
              We work in that space. Process mining shows where time and effort really go. Data engineering makes the numbers trustworthy. AI
              and automation are then applied where they have a measurable effect, and built so your own team can run them.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="mission">
        <div className="wrap two-col">
          <div className="stack" style={{ "--stack": "0.75rem" } as React.CSSProperties}>
            <p className="label">Mission</p>
            <SplitReveal as="h2" id="mission" onView text="Make operational improvement provable." className="h2--md" />
          </div>
          <FadeIn className="prose">
            <p>Every engagement should end with a measured change, a system that keeps running, and a team that understands why.</p>
          </FadeIn>
        </div>
      </section>

      <section className="section" aria-labelledby="principles">
        <div className="wrap">
          <header className="head">
            <SplitReveal as="h2" id="principles" onView text="Engineering approach" />
          </header>
          <ul className="principles">
            {PRINCIPLES.map((p, i) => (
              <FadeIn as="li" key={p.t} delay={(i % 2) * 0.1} className="principle">
                <span className="principle__num" aria-hidden="true">{i + 1}</span>
                <h3>{p.t}</h3>
                <p>{p.b}</p>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>


      <CtaBlock title="Partnerships and recruitment inquiries are welcome." />
    </>
  );
}
