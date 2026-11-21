/**
 * Illustrative product visuals. Pure markup + CSS (see globals.css, "Visuals"),
 * so they render on the server and cost no client JavaScript.
 * All figures are example data, not client results.
 */

/** Plain application panel: a title bar and a body, like a screenshot of real software. */
function Panel({
  title,
  meta,
  className = "",
  label,
  children,
}: {
  title: string;
  meta?: string;
  className?: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <figure className={`vz ui ${className}`} role="img" aria-label={label}>
      <div className="ui__bar">
        <span className="ui__title">{title}</span>
        {meta && <span className="ui__meta">{meta}</span>}
      </div>
      <div className="ui__body">{children}</div>
    </figure>
  );
}

const FLOW = [
  { name: "Order placed", count: "12,480" },
  { wait: "0.4 d" },
  { name: "Credit check", count: "12,480" },
  { wait: "4.2 d", hot: true },
  { name: "Approval", count: "14,726", hot: true, note: "18% sent back to credit check" },
  { wait: "0.8 d" },
  { name: "Invoice sent", count: "12,310" },
  { wait: "3.7 d" },
  { name: "Paid", count: "11,962" },
] as const;

/** Process map as a process-mining tool would show it: steps, case counts, median waits. */
export function ProcessMap() {
  return (
    <Panel
      title="Order-to-cash"
      meta="Last 90 days"
      className="ui--flow"
      label="Example process map: orders wait a median of 4.2 days before approval, 46% of the cycle"
    >
      <ol className="pf">
        {FLOW.map((s, i) =>
          "wait" in s ? (
            <li key={i} className={`pf__edge${"hot" in s ? " is-hot" : ""}`}>
              <span>{s.wait}</span>
              {"hot" in s && <em>median wait</em>}
            </li>
          ) : (
            <li key={i} className={`pf__node${"hot" in s ? " is-hot" : ""}`}>
              <b>{s.name}</b>
              <span>{s.count}</span>
              {"note" in s && <small>{s.note}</small>}
            </li>
          ),
        )}
      </ol>
      <dl className="kv">
        <div>
          <dt>Cases</dt>
          <dd>12,480</dd>
        </div>
        <div>
          <dt>Median cycle</dt>
          <dd>9.1 days</dd>
        </div>
        <div className="is-hot">
          <dt>Waiting for approval</dt>
          <dd>
            46%<span className="kv__bar" aria-hidden="true"><i style={{ width: "46%" }} /></span>
          </dd>
        </div>
        <div>
          <dt>Rework</dt>
          <dd>18%</dd>
        </div>
      </dl>
    </Panel>
  );
}

/** Service-desk ticket where an assistant acts and a manager approves. */
export function AgentChat({ compact = false }: { compact?: boolean }) {
  return (
    <Panel
      title="Service desk"
      meta="Ticket 48213"
      className="ui--ticket"
      label="Example: an assistant looks up an order and a manager approves a delivery change"
    >
      <ol className="tk">
        <li className="tk__msg">
          <span className="tk__av">C</span>
          <div>
            <p className="tk__who">
              Customer <time>09:41</time>
            </p>
            <p>Can you move order 48213 to Friday delivery?</p>
          </div>
        </li>
        <li className="tk__log">Assistant looked up order 48213 in ERP</li>
        <li className="tk__msg">
          <span className="tk__av tk__av--bot">A</span>
          <div>
            <p className="tk__who">
              Assistant <time>09:41</time>
            </p>
            <p>It ships Thursday. Changing the date needs a manager&apos;s approval, so I&apos;ve requested it.</p>
          </div>
        </li>
        <li className="tk__approval">
          <div>
            <b>Change delivery date to Friday</b>
            <span>Requested by Assistant · needs Ops lead</span>
          </div>
          <div className="tk__btns" aria-hidden="true">
            <span className="tk__btn">Decline</span>
            <span className="tk__btn tk__btn--on">Approved</span>
          </div>
        </li>
        {!compact && (
          <li className="tk__msg">
            <span className="tk__av tk__av--bot">A</span>
            <div>
              <p className="tk__who">
                Assistant <time>09:44</time>
              </p>
              <p>Done. Friday delivery is confirmed and the customer has been notified.</p>
            </div>
          </li>
        )}
      </ol>
    </Panel>
  );
}

/** Invoice intake: document preview next to the extracted fields. */
export function InvoiceExtract() {
  const fields = [
    { k: "Supplier", v: "Nordline Components", s: "Matched" },
    { k: "Invoice no.", v: "INV-20931", s: "Read" },
    { k: "PO", v: "PO-7741", s: "Matched" },
    { k: "Total", v: "€12,480.00", s: "Matches PO" },
    { k: "VAT ID", v: "RO 1?48 2209", s: "Review", review: true },
  ];
  return (
    <Panel
      title="Invoice intake"
      meta="From email · 2 min ago"
      className="ui--invoice"
      label="Example: an invoice is read and its fields entered automatically, with one unclear field sent to a person"
    >
      <div className="inv">
        <div className="inv__doc" aria-hidden="true">
          <div className="inv__top">
            <b>INVOICE</b>
            <span>INV-20931</span>
          </div>
          <p className="inv__from">
            Nordline Components
            <br />
            Str. Fabricii 12, Cluj
          </p>
          <div className="inv__rows">
            <span>M8 bolts ×2000</span>
            <span>€4,200</span>
            <span>Brackets ×600</span>
            <span>€5,880</span>
            <span>Freight</span>
            <span>€2,400</span>
          </div>
          <div className="inv__total">
            <span>Total</span>
            <b>€12,480.00</b>
          </div>
        </div>
        <table className="inv__fields">
          <tbody>
            {fields.map((f) => (
              <tr key={f.k} className={f.review ? "is-review" : undefined}>
                <th scope="row">{f.k}</th>
                <td>{f.v}</td>
                <td>
                  <span className={`st${f.review ? " st--review" : ""}`}>{f.s}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="inv__foot" aria-hidden="true">
        <span>4 of 5 fields entered</span>
        <span className="tk__btn tk__btn--on">Sent to a person</span>
      </div>
    </Panel>
  );
}

/** Average wait per step, bottleneck highlighted. */
export function WaitBars() {
  const rows = [
    { k: "Order entry", v: 0.4 },
    { k: "Credit check", v: 1.1 },
    { k: "Approval", v: 4.2, hot: true },
    { k: "Picking", v: 0.8 },
    { k: "Invoicing", v: 1.6 },
  ];
  const max = 4.6;
  return (
    <div className="vz vz-bars" role="img" aria-label="Example: average wait per step, approval is the longest at 4.2 days">
      <p className="vz-cap">Average wait per step · days</p>
      <ul>
        {rows.map((r, i) => (
          <li key={r.k} className={r.hot ? "is-hot" : undefined}>
            <span>{r.k}</span>
            <span className="vz-bars__track">
              <span className="vz-bars__fill" style={{ width: `${(r.v / max) * 100}%`, ["--d" as string]: `${i * 0.08}s` }} />
            </span>
            <b>{r.v.toFixed(1)}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Enterprise search answer with a cited source. */
export function SearchAnswer() {
  return (
    <div className="vz vz-search" role="img" aria-label="Example: a question answered from a policy document with the exact section cited">
      <div className="vz-search__bar">
        <span className="vz-search__glass" aria-hidden="true" />
        <span className="vz-search__q">What&apos;s the notice period for supplier contracts?</span>
      </div>
      <div className="vz-search__answer">
        <p>
          <b>60 days</b>, given in writing before the renewal date. Contracts above €250k need 90 days.
        </p>
        <blockquote>
          “…either party may terminate by giving <mark>no less than sixty (60) days</mark> written notice…”
        </blockquote>
        <div className="vz-search__src">
          <span className="vz-search__file" aria-hidden="true" />
          Procurement Policy v4.2 · §7.3
          <span className="vz-tag vz-tag--soft">Current version</span>
        </div>
      </div>
    </div>
  );
}

/** Demand forecast with an uncertainty band. */
export function ForecastChart() {
  const actual = "M20 150 L70 132 L120 141 L170 112 L220 120 L270 96 L320 104";
  const fc = "M320 104 L370 86 L420 92 L470 70 L520 76";
  const band = "M320 104 L370 70 L420 70 L470 44 L520 44 L520 108 L470 96 L420 114 L370 102 L320 104 Z";
  return (
    <div className="vz vz-forecast" role="img" aria-label="Example: weekly demand with a forecast range for the next four weeks">
      <p className="vz-cap">
        Weekly demand · <span className="vz-legend vz-legend--a">actual</span> <span className="vz-legend vz-legend--f">forecast range</span>
      </p>
      <svg viewBox="0 0 540 180">
        {[40, 80, 120, 160].map((y) => (
          <line key={y} x1="20" x2="520" y1={y} y2={y} className="vz-forecast__grid" />
        ))}
        <line x1="320" x2="320" y1="20" y2="170" className="vz-forecast__now" />
        <text x="326" y="30" className="vz-forecast__label">
          today
        </text>
        <path d={band} className="vz-forecast__band" />
        <path d={actual} className="vz-forecast__actual" pathLength={1} />
        <path d={fc} className="vz-forecast__fc" />
        <circle cx="320" cy="104" r="5" className="vz-forecast__pt" />
      </svg>
    </div>
  );
}

export const featureVisuals = {
  bars: WaitBars,
  chat: () => <AgentChat compact />,
  search: SearchAnswer,
  forecast: ForecastChart,
} as const;
