import Link from "next/link";
import { FadeIn } from "./motion/Text";

export function CtaBlock({ title = "Discuss a project with an engineer.", service }: { title?: string; service?: string }) {
  const href = service ? `/contact?service=${encodeURIComponent(service)}` : "/contact";
  return (
    <section className="section section--tight" aria-labelledby="cta-title">
      <div className="wrap">
        <FadeIn className="cta-band">
          <div className="stack" style={{ "--stack": "0.75rem" } as React.CSSProperties}>
            <h2 id="cta-title">{title}</h2>
            <p className="lede">Book a discovery call or request a demonstration.</p>
          </div>
          <div className="cta-row">
            <Link href={href} className="btn btn--primary btn--lg">
              Discuss a project <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
            <Link href="/contact?topic=demo" className="btn btn--ghost btn--lg">
              Request a demonstration
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
