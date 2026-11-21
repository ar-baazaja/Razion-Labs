import { hero, about, services, projects, steps, stepsNote, systems, features } from "@/content/home";
import { site } from "@/content/site";
import { FadeIn, Appear } from "@/components/motion/Text";
import { BannerThreads } from "@/components/fx/Backdrops";
import { Showcase } from "@/components/home/Showcase";
import { ServiceTabs } from "@/components/home/ServiceTabs";
import { featureVisuals } from "@/components/home/Visuals";

export default function Home() {
  return (
    <>
      {/* Hero: split headline (ElevenLabs layout) + tabbed showcase */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__glow" aria-hidden="true" />
        <div className="wrap">
          <div className="hero__top">
            <div>
              <h1 id="hero-title" className="hero__title appear" style={{ animationDelay: "0.05s" }}>
                {hero.title}
                <br />
                <span className="hl">{hero.accent}</span>
              </h1>
            </div>
            <Appear delay={0.15} className="hero__side">
              <p>{hero.body}</p>
              <div className="cta-row">
                <a href={hero.primary.href} className="btn btn--primary" data-track="hero_discuss_project">
                  {hero.primary.label}
                </a>
                <a href={hero.secondary.href} className="btn btn--ghost" data-track="hero_explore_capabilities">
                  {hero.secondary.label}
                </a>
              </div>
            </Appear>
          </div>
          <Appear delay={0.25}>
            <Showcase />
          </Appear>
        </div>
      </section>

      {/* Systems strip */}
      <section className="systems" aria-labelledby="systems-title">
        <div className="wrap systems__head">
          <h2 id="systems-title">Built to connect with the systems you already run</h2>
          <a href="#contact" className="btn btn--ghost btn--sm">
            Ask about yours
          </a>
        </div>
        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            {[...systems, ...systems].map((s, i) => (
              <span key={i}>{s}</span>
            ))}
          </div>
        </div>
        <p className="visually-hidden">{systems.join(", ")}</p>
      </section>

      {/* About: centred statement + stats */}
      <section className="section about" aria-labelledby="about-title">
        <div className="wrap">
          <FadeIn>
            <h2 id="about-title" className="statement">
              {about.statement}
            </h2>
          </FadeIn>
          <dl className="stats">
            {about.stats.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.08} className="stats__item">
                <dt>
                  <span className="stats__num">{s.value}</span>
                  {s.label}
                </dt>
                <dd>{s.text}</dd>
              </FadeIn>
            ))}
          </dl>
        </div>
      </section>

      {/* Solutions: alternating rows (Linq layout) */}
      <section className="section" id="solutions" aria-labelledby="solutions-title">
        <div className="wrap">
          <FadeIn className="section-head">
            <h2 id="solutions-title">
              Four places operations lose time.
              <br />
              <span className="accent">Four ways we win it back.</span>
            </h2>
          </FadeIn>
          <div className="rows">
            {features.map((f, i) => {
              const Visual = featureVisuals[f.visual];
              return (
                <article key={f.id} className={`row${i % 2 ? " row--flip" : ""}`} aria-labelledby={`f-${f.id}`}>
                  <FadeIn className="row__copy">
                    <h3 id={`f-${f.id}`}>{f.title}</h3>
                    <p>{f.text}</p>
                    <ul className="ticks">
                      {f.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </FadeIn>
                  <FadeIn delay={0.1} className="row__visual">
                    <Visual />
                  </FadeIn>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services: sticky tabs */}
      <section className="section section--tint" id="services" aria-labelledby="services-title">
        <div className="wrap">
          <FadeIn className="section-head section-head--split">
            <div>
              <h2 id="services-title">
                Six services. <span className="accent">One engineering team.</span>
              </h2>
            </div>
            <p>From the first look at your data to software your team keeps, the same engineers carry the work through.</p>
          </FadeIn>
          <FadeIn>
            <ServiceTabs items={services} />
          </FadeIn>
        </div>
      </section>

      {/* Projects */}
      <section className="section" id="work" aria-labelledby="work-title">
        <div className="wrap">
          <FadeIn className="section-head section-head--split">
            <div>
              <h2 id="work-title">
                The kind of work <span className="accent">we deliver.</span>
              </h2>
            </div>
            <p>Typical engagements, described plainly. Client case studies will be added once approved.</p>
          </FadeIn>
          <ul className="projects">
            {projects.map((p, i) => (
              <FadeIn as="li" key={p.name} delay={(i % 2) * 0.08} className="project">
                <div className="project__art" aria-hidden="true">
                  <span className="project__num">0{i + 1}</span>
                  <span className={`project__shape project__shape--${i + 1}`} />
                </div>
                <div className="project__body">
                  <p className="chip">{p.sector}</p>
                  <h3>{p.name}</h3>
                  <dl>
                    <div>
                      <dt>Problem</dt>
                      <dd>{p.problem}</dd>
                    </div>
                    <div>
                      <dt>What we built</dt>
                      <dd>{p.solution}</dd>
                    </div>
                  </dl>
                </div>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      {/* How we deliver */}
      <section className="section section--tint" id="process" aria-labelledby="process-title">
        <div className="wrap">
          <FadeIn className="section-head section-head--split">
            <div>
              <h2 id="process-title">
                Five steps, <span className="accent">measured from day one.</span>
              </h2>
            </div>
            <p>{stepsNote}</p>
          </FadeIn>
          <ol className="steps">
            {steps.map((s, i) => (
              <FadeIn as="li" key={s.title} delay={i * 0.07} className="step">
                <span className="step__num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </FadeIn>
            ))}
          </ol>
        </div>
      </section>

      {/* Black call-to-action band */}
      <section className="wrap banner-section" aria-labelledby="banner-title">
        <div className="banner" id="contact">
          <BannerThreads />
          <div className="banner__content">
            <h2 id="banner-title">
              Engineers ready to start <span className="hl hl--dark">on your process.</span>
            </h2>
            <div className="cta-row">
              <a href={`mailto:${site.email}`} className="btn btn--on-dark" data-track="banner_email">
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
