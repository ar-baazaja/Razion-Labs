import { hero, about, services, solutions, projects, steps, stepsNote, contact } from "@/content/home";
import { site } from "@/content/site";
import { FadeIn, Appear } from "@/components/motion/Text";
import { HeroOrb, BannerThreads } from "@/components/fx/Backdrops";
import { ServiceAccordion } from "@/components/home/ServiceAccordion";
import { ContactForm } from "@/components/ContactForm";

/** Pill button with a turquoise circle icon (Bloom-style). */
function PillLink({ href, label, track, icon = "+" }: { href: string; label: string; track: string; icon?: string }) {
  return (
    <a href={href} className="pill-btn" data-track={track}>
      <span className="pill-btn__icon" aria-hidden="true">
        {icon}
      </span>
      {label}
    </a>
  );
}

export default function Home() {
  return (
    <div className="frame">
      {/* Hero: framed panel with the glowing orb */}
      <section className="b-hero" aria-labelledby="hero-title">
        <HeroOrb />
        <div className="b-hero__shade" aria-hidden="true" />
        <div className="b-hero__content">
          <h1 id="hero-title" className="b-hero__title appear">
            {hero.title}
            <br />
            {hero.accent}
          </h1>
          <Appear delay={0.12}>
            <p className="b-hero__sub">{hero.body}</p>
          </Appear>
          <Appear delay={0.22} className="b-hero__ctas">
            <PillLink href="#contact" label={hero.primary.label} track="hero_discuss_project" />
            <a href="#services" className="b-link" data-track="hero_explore_capabilities">
              {hero.secondary.label} →
            </a>
          </Appear>
        </div>
      </section>

      {/* About */}
      <section className="b-section" aria-labelledby="about-title">
        <div className="b-split">
          <p className="b-label">
            {about.label}
            <small>Razion Labs</small>
          </p>
          <FadeIn>
            <h2 id="about-title" className="b-statement">
              {about.statement}
            </h2>
          </FadeIn>
        </div>
        <dl className="b-stats">
          {about.stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.08}>
              <dt>{s.value}</dt>
              <dd>
                <b>{s.label}</b>
                <span>{s.text}</span>
              </dd>
            </FadeIn>
          ))}
        </dl>
      </section>

      {/* Services panel */}
      <section className="b-section b-section--tight" id="services" aria-labelledby="services-title">
        <FadeIn className="b-panel">
          <div className="b-panel__head">
            <div className="b-panel__intro">
              <p className="b-label b-label--dark">
                Services
                <small>Six, one team</small>
              </p>
              <PillLink href="#contact" label="Discuss a project" track="services_discuss_project" icon="→" />
            </div>
            <div>
              <h2 id="services-title" className="b-panel__title">
                Find the right engineering support for whatever slows your operations down
              </h2>
              <ul className="b-chips" aria-label="Solution areas" id="solutions">
                {solutions.map((s) => (
                  <li key={s.name} title={s.text}>
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <ServiceAccordion items={services} />
        </FadeIn>
      </section>

      {/* Projects */}
      <section className="b-section" id="work" aria-labelledby="work-title">
        <div className="b-split">
          <p className="b-label">
            Projects
            <small>Capabilities showcase</small>
          </p>
          <FadeIn>
            <h2 id="work-title" className="b-statement">
              See how we help operations teams remove delays, automate routine work and trust their numbers
            </h2>
          </FadeIn>
        </div>
        <div className="b-projects">
          <FadeIn className="b-summary">
            <p className="b-summary__num">
              4<small> projects</small>
            </p>
            <p className="b-summary__text">Typical engagements we deliver. Client case studies will be added once approved.</p>
            <PillLink href="#contact" label="Discuss yours" track="projects_discuss" icon="→" />
          </FadeIn>
          <ul className="b-cards">
            {projects.map((p, i) => (
              <FadeIn as="li" key={p.name} delay={i * 0.06} className="b-card">
                <div className="b-card__top">
                  <span>{p.sector}</span>
                </div>
                <h3>{p.name}</h3>
                <p>{p.solution}</p>
                <p className="b-card__tag">{p.problem}</p>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      {/* How we deliver */}
      <section className="b-section" id="process" aria-labelledby="process-title">
        <div className="b-split">
          <p className="b-label">
            How we deliver
            <small>Five steps</small>
          </p>
          <FadeIn>
            <h2 id="process-title" className="b-statement">
              {stepsNote}
            </h2>
          </FadeIn>
        </div>
        <ol className="b-steps">
          {steps.map((s, i) => (
            <FadeIn as="li" key={s.title} delay={i * 0.06}>
              <span className="b-steps__num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </FadeIn>
          ))}
        </ol>
      </section>

      {/* Banner */}
      <section className="b-banner" aria-labelledby="banner-title">
        <BannerThreads />
        <div className="b-banner__content">
          <h2 id="banner-title">
            Engineers ready to
            <br />
            start on your process
          </h2>
          <PillLink href="#contact" label="Discuss a project" track="banner_discuss_project" />
        </div>
      </section>

      {/* Contact */}
      <section className="b-section" id="contact" aria-labelledby="contact-title">
        <div className="b-contact">
          <div className="b-contact__copy">
            <p className="b-label">
              Contact
              <small>Reply within two working days</small>
            </p>
            <h2 id="contact-title" className="b-statement">
              {contact.text}
            </h2>
            <p className="finale__mail">
              Prefer email?{" "}
              <a href={`mailto:${site.email}`} data-track="contact_email">
                {site.email}
              </a>
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
