import Link from "next/link";
import { site } from "@/content/site";
import { Appear, SplitReveal } from "./motion/Text";
import { Aurora } from "./fx/Aurora";

export function Eyebrow({ num, children }: { num?: string; children: React.ReactNode }) {
  return (
    <p className="eyebrow">
      {num && <span className="eyebrow__num">{num}</span>}
      <span>{children}</span>
    </p>
  );
}

/** Structured data. Content comes only from our own content files; "<" is escaped. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export type Crumb = { href: string; label: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ href: "/", label: "Home" }, ...items];
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {all.map((c, i) => (
          <li key={c.href}>{i === all.length - 1 ? <span aria-current="page">{c.label}</span> : <Link href={c.href}>{c.label}</Link>}</li>
        ))}
      </ol>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: new URL(c.href, site.url).toString() })),
        }}
      />
    </nav>
  );
}

export function PageHero({
  crumbs,
  kicker,
  title,
  accent,
  lede,
  visual,
  children,
}: {
  crumbs: Crumb[];
  kicker?: string;
  title: string;
  accent?: string;
  lede?: string;
  visual?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <Aurora variant="soft" />
      <div className={`wrap page-hero__inner ${visual ? "page-hero__inner--visual" : ""}`}>
        <div className="page-hero__copy">
          <Appear>
            <Breadcrumbs items={crumbs} />
          </Appear>
          {kicker && (
            <Appear delay={0.05}>
              <p className="page-hero__kicker">{kicker}</p>
            </Appear>
          )}
          <SplitReveal text={title} accent={accent} delay={0.1} />
          {lede && (
            <Appear delay={0.45}>
              <p className="page-hero__lede">{lede}</p>
            </Appear>
          )}
          {children}
        </div>
        {visual && (
          <Appear delay={0.3} className="page-hero__visual">
            {visual}
          </Appear>
        )}
      </div>
    </section>
  );
}
