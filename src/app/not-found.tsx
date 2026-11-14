import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap not-found">
      <p className="not-found__code" aria-hidden="true">404</p>
      <h1 style={{ fontSize: "var(--step-3)" }}>This path isn&apos;t in the event log.</h1>
      <div className="cta-row" style={{ justifyContent: "center" }}>
        <Link href="/" className="btn btn--primary">
          Back home
        </Link>
        <Link href="/services" className="btn btn--ghost">
          Services
        </Link>
      </div>
    </section>
  );
}
