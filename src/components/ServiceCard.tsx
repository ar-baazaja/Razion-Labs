import Link from "next/link";
import type { Service } from "@/content/services";
import { FadeIn } from "./motion/Text";

/** Typographic service card: name, scope, outcome, link. No imagery. */
export function ServiceCard({ s, delay = 0 }: { s: Service; delay?: number }) {
  return (
    <FadeIn as="li" delay={delay} className="scard">
      <h3 className="scard__name">
        <Link href={`/services/${s.slug}`} data-track={`service_card_${s.slug}`}>
          {s.name}
        </Link>
      </h3>
      <p className="scard__desc">{s.short}</p>
      <div className="scard__outcome">
        <span>Outcome</span>
        <p>{s.outcome}</p>
      </div>
      <span className="scard__more" aria-hidden="true">
        Explore <i>→</i>
      </span>
    </FadeIn>
  );
}

export function ServiceCards({ items }: { items: Service[] }) {
  return (
    <ul className="scards">
      {items.map((s, i) => (
        <ServiceCard key={s.slug} s={s} delay={(i % 3) * 0.08} />
      ))}
    </ul>
  );
}
