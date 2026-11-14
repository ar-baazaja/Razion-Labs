import Link from "next/link";
import { getService } from "@/content/services";
import type { WorkItem } from "@/content/work";

/**
 * Minimal work card (service-card style). Challenge, approach and
 * architecture (requirements §3) sit in a collapsed "Details" section.
 */
export function WorkCard({ item }: { item: WorkItem }) {
  return (
    <article className="scard wcard" id={item.slug} aria-labelledby={`w-${item.slug}`}>
      <span className="scard__label">{item.sector}</span>
      <h2 id={`w-${item.slug}`} className="scard__name">
        {item.title}
      </h2>
      <p className="scard__desc">{item.summary}</p>

      <details className="wcard__details">
        <summary>
          <span>Project details</span>
          <i aria-hidden="true">
            <svg viewBox="0 0 16 16" width="14" height="14">
              <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </i>
        </summary>
        <dl>
          <div>
            <dt>Challenge</dt>
            <dd>{item.challenge}</dd>
          </div>
          <div>
            <dt>Approach</dt>
            <dd>{item.approach.join(" · ")}</dd>
          </div>
          <div>
            <dt>Architecture</dt>
            <dd>{item.architecture.join(" → ")}</dd>
          </div>
          {item.results && (
            <div>
              <dt>Verified results</dt>
              <dd>{item.results.join(" · ")}</dd>
            </div>
          )}
        </dl>
      </details>

      <ul className="wcard__services" aria-label="Services involved">
        {item.services.map((s) => {
          const svc = getService(s);
          return svc ? (
            <li key={s}>
              <Link href={`/services/${s}`}>{svc.name}</Link>
            </li>
          ) : null;
        })}
      </ul>
    </article>
  );
}
