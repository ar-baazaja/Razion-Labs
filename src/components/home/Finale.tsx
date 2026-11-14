import { ContactForm } from "../ContactForm";
import { Aurora } from "../fx/Aurora";
import { site } from "@/content/site";

/** Conversion (requirements §4.07): concise CTA plus the inquiry form, on an aurora panel. */
export function Finale() {
  return (
    <div className="finale">
      <Aurora variant="panel" />
      <div className="finale__copy">
        <p className="kicker">Discuss a project</p>
        <h2 id="contact-title" className="h2--mixed">
          Let&apos;s engineer <em>what&apos;s next.</em>
        </h2>
        <p className="lede">Tell us about the process or system you want to improve. An engineer replies within two working days.</p>
        <ul className="finale__points">
          <li>Discovery call with an engineer</li>
          <li>Demonstration on request</li>
          <li>
            <span>
              Or email <a href={`mailto:${site.email}`} data-track="contact_email">{site.email}</a>
            </span>
          </li>
        </ul>
      </div>
      <ContactForm idPrefix="home" />
    </div>
  );
}
