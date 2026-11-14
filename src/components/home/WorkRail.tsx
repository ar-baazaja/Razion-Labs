import Link from "next/link";
import type { WorkItem } from "@/content/work";
import { FadeIn } from "../motion/Text";

/** Selected work as typographic cards, matching the service cards. */
export function WorkRail({ items }: { items: WorkItem[] }) {
  return (
    <ul className="scards scards--work" aria-label="Selected work">
      {items.map((w, i) => (
        <FadeIn as="li" key={w.slug} delay={(i % 2) * 0.08} className="scard">
          <span className="scard__label">{w.sector}</span>
          <h3 className="scard__name">
            <Link href={`/work#${w.slug}`}>{w.title}</Link>
          </h3>
          <p className="scard__desc">{w.summary}</p>
          <span className="scard__more" aria-hidden="true">
            View project <i>→</i>
          </span>
        </FadeIn>
      ))}
    </ul>
  );
}
