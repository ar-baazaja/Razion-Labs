import {
  siApacheairflow,
  siConfluence,
  siDocker,
  siGooglebigquery,
  siHubspot,
  siJira,
  siKubernetes,
  siOdoo,
  siPostgresql,
  siSap,
  siSnowflake,
  siZendesk,
  type SimpleIcon,
} from "simple-icons";

/**
 * Platforms from the integration lists in requirements §5, as monochrome
 * marks (Simple Icons, CC0). Trademarks belong to their owners; showing them
 * describes compatibility and implies no partnership.
 */
const LOGOS: SimpleIcon[] = [
  siSap,
  siSnowflake,
  siPostgresql,
  siGooglebigquery,
  siJira,
  siConfluence,
  siZendesk,
  siHubspot,
  siOdoo,
  siApacheairflow,
  siDocker,
  siKubernetes,
];

export function LogoStrip() {
  return (
    <section className="logos" aria-labelledby="logos-title">
      <div className="wrap">
        <p id="logos-title" className="logos__title">
          Integrates with the platforms you already run
        </p>
        <ul className="logos__list">
          {LOGOS.map((l) => (
            <li key={l.slug} title={l.title}>
              <svg viewBox="0 0 24 24" role="img" aria-label={l.title}>
                <path d={l.path} />
              </svg>
              <span>{l.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
