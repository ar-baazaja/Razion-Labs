/**
 * Illustrative product visuals. Pure markup + CSS animation (see globals.css,
 * "Visuals"), so they render on the server and cost no client JavaScript.
 * All figures are example data, not client results.
 */

const FLOW_NODES = [
  { id: "order", label: "Order placed", x: 70, y: 176 },
  { id: "credit", label: "Credit check", x: 205, y: 84 },
  { id: "approve", label: "Approval", x: 340, y: 176, hot: true },
  { id: "invoice", label: "Invoice sent", x: 475, y: 84 },
  { id: "paid", label: "Paid", x: 580, y: 176 },
];
const FLOW_EDGES = [
  { d: "M70 176 C 120 176, 150 84, 205 84", w: 5 },
  { d: "M205 84 C 260 84, 285 176, 340 176", w: 5 },
  { d: "M340 176 C 395 176, 420 84, 475 84", w: 4 },
  { d: "M475 84 C 525 84, 545 176, 580 176", w: 4 },
];

/** Process map with tokens flowing through and the bottleneck pulsing. */
export function ProcessMap() {
  return (
    <figure className="vz vz-flow">
      <svg viewBox="0 0 650 260" role="img" aria-label="Example process map: orders wait longest at the approval step">
        <defs>
          <pattern id="vz-dots" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" className="vz-flow__dot" />
          </pattern>
        </defs>
        <rect width="650" height="260" fill="url(#vz-dots)" />
        {/* Rework loop: approval back to credit check */}
        <path className="vz-flow__loop" d="M340 196 C 330 250, 215 250, 205 104" />
        <text className="vz-flow__loopLabel" x="250" y="246">
          rework 18%
        </text>
        {FLOW_EDGES.map((e, i) => (
          <g key={i}>
            <path className="vz-flow__edge" d={e.d} strokeWidth={e.w} />
            <path className="vz-flow__run" d={e.d} />
            {[0, 1, 2].map((k) => (
              <circle key={k} r="4.5" className="vz-flow__token">
                <animateMotion dur="3.6s" begin={`-${k * 1.2 + i * 0.3}s`} repeatCount="indefinite" path={e.d} />
              </circle>
            ))}
          </g>
        ))}
        {FLOW_NODES.map((n) => (
          <g key={n.id} className={`vz-flow__node${n.hot ? " is-hot" : ""}`} transform={`translate(${n.x} ${n.y})`}>
            {n.hot && <circle className="vz-flow__pulse" r="30" />}
            <circle r="15" className="vz-flow__core" />
            <text y={n.y < 120 ? -26 : 36} textAnchor="middle">
              {n.label}
            </text>
          </g>
        ))}
        <g className="vz-flow__badge" transform="translate(272 18)">
          <rect width="136" height="34" rx="17" />
          <text x="68" y="22" textAnchor="middle">
            Waits 4.2 days
          </text>
        </g>
        <path className="vz-flow__pointer" d="M340 52 L340 140" />
      </svg>
      <figcaption className="vz-stats">
        <span>
          <b>12,480</b> cases
        </span>
        <span>
          <b>9.1 days</b> median cycle
        </span>
        <span className="is-hot">
          <b>46%</b> of time spent waiting for approval
        </span>
      </figcaption>
    </figure>
  );
}

/** Agent conversation with a tool step and a human approval. */
export function AgentChat({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`vz vz-chat${compact ? " vz-chat--compact" : ""}`} role="img" aria-label="Example: an assistant looks up an order and asks a manager to approve a change">
      <div className="vz-chat__msg vz-chat__msg--user" style={{ ["--d" as string]: "0s" }}>
        Can you move order 48213 to Friday delivery?
      </div>
      <div className="vz-chat__step" style={{ ["--d" as string]: "0.6s" }}>
        <span className="vz-check" aria-hidden="true" /> Looked up order in ERP
      </div>
      <div className="vz-chat__msg vz-chat__msg--bot" style={{ ["--d" as string]: "1.2s" }}>
        It ships Thursday. Changing the date needs a manager&apos;s OK, so I&apos;ve asked for it.
      </div>
      <div className="vz-chat__approval" style={{ ["--d" as string]: "1.9s" }}>
        <div>
          <small>Approval request</small>
          <b>Change delivery to Friday</b>
        </div>
        <span className="vz-chat__ok">Approved</span>
      </div>
      {!compact && (
        <div className="vz-chat__msg vz-chat__msg--bot" style={{ ["--d" as string]: "2.6s" }}>
          Done. Friday delivery is confirmed and the customer has been notified.
        </div>
      )}
      <div className="vz-chat__typing" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}

/** Invoice being read and its fields extracted. */
export function InvoiceExtract() {
  const fields = [
    { k: "Supplier", v: "Nordline Components" },
    { k: "Invoice no.", v: "INV-20931" },
    { k: "PO match", v: "PO-7741" },
    { k: "Total", v: "€12,480.00" },
  ];
  return (
    <div className="vz vz-invoice" role="img" aria-label="Example: an invoice is read and its fields entered automatically, with one field sent for review">
      <div className="vz-invoice__doc">
        <div className="vz-invoice__head">
          <span />
          <span />
        </div>
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="vz-invoice__line" style={{ width: `${[92, 70, 84, 60, 88, 52, 76][i]}%` }} />
        ))}
        <div className="vz-invoice__total" />
        <div className="vz-invoice__scan" aria-hidden="true" />
      </div>
      <ul className="vz-invoice__fields">
        {fields.map((f, i) => (
          <li key={f.k} style={{ ["--d" as string]: `${0.5 + i * 0.45}s` }}>
            <small>{f.k}</small>
            <b>{f.v}</b>
            <span className="vz-check" aria-hidden="true" />
          </li>
        ))}
        <li className="is-review" style={{ ["--d" as string]: "2.3s" }}>
          <small>VAT ID</small>
          <b>Unclear scan</b>
          <span className="vz-tag">Sent to a person</span>
        </li>
      </ul>
    </div>
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
