/**
 * Product UI screens: one compact application window per service, showing
 * what the delivered system looks like in use. HTML/CSS only, subtly
 * animated. All data is illustrative sample data (labelled in each window).
 */
export type ScreenKind =
  | "process-mining"
  | "ai-engineering"
  | "ai-agents"
  | "intelligent-automation"
  | "data-engineering"
  | "custom-software"
  | "brand";

const TITLE: Record<ScreenKind, string> = {
  "process-mining": "Process analytics · Order-to-cash",
  "ai-engineering": "Enterprise search",
  "ai-agents": "Service desk assistant",
  "intelligent-automation": "Invoice intake",
  "data-engineering": "Data pipelines",
  "custom-software": "Integration · CRM → ERP",
  brand: "Engagement overview",
};

const ALT: Record<ScreenKind, string> = {
  "process-mining": "Sample process analytics screen showing cycle time, variants and their share of cases, with manual review flagged as the bottleneck.",
  "ai-engineering": "Sample enterprise search screen: a question about the purchase-order approval limit answered with two cited sources.",
  "ai-agents": "Sample assistant screen: an order lookup and ticket creation completed, and a refund awaiting human approval.",
  "intelligent-automation": "Sample invoice intake screen: invoices matched to purchase orders and posted, one flagged for review, one processing.",
  "data-engineering": "Sample data pipeline screen: scheduled loads completed, one running, and all quality checks passed.",
  "custom-software": "Sample integration screen: API calls between CRM and ERP with success status codes and response times.",
  brand: "Sample engagement screen showing delivery phases from discovery to improvement.",
};

function Window({ kind, children }: { kind: ScreenKind; children: React.ReactNode }) {
  return (
    <div className="scr" role="img" aria-label={ALT[kind]}>
      <div className="scr__bar" aria-hidden="true">
        <span className="scr__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="scr__title">{TITLE[kind]}</span>
        <span className="scr__tag">Sample data</span>
      </div>
      <div className="scr__body" aria-hidden="true">
        {children}
      </div>
    </div>
  );
}

function ProcessMining() {
  const rows = [
    { n: "Straight-through", v: 58, d: "6.2 d" },
    { n: "Manual credit review", v: 21, d: "9.9 d", warn: true },
    { n: "Invoice correction", v: 14, d: "11.9 d" },
    { n: "Review + correction", v: 7, d: "15.6 d" },
  ];
  return (
    <>
      <div className="scr-kpis">
        <div>
          <small>Cycle time</small>
          <b>8.4 d</b>
        </div>
        <div>
          <small>Throughput</small>
          <b>48 / wk</b>
        </div>
        <div className="is-warn">
          <small>Bottleneck</small>
          <b>Manual review</b>
        </div>
      </div>
      <div className="scr-table">
        <div className="scr-table__head">
          <span>Variant</span>
          <span>Cases</span>
          <span>Cycle</span>
        </div>
        {rows.map((r, i) => (
          <div key={r.n} className={`scr-table__row ${r.warn ? "is-warn" : ""}`}>
            <span>{r.n}</span>
            <span className="scr-meter">
              <i style={{ width: `${r.v}%`, animationDelay: `${i * 0.15}s` }} />
              <em>{r.v}%</em>
            </span>
            <span>{r.d}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function Search() {
  return (
    <>
      <div className="scr-search">
        <span className="scr-search__icon" />
        What is the approval limit for purchase orders?
      </div>
      <div className="scr-answer">
        <p>
          Purchase orders up to <b>€10,000</b> are approved by the budget owner. Above that, approval from the finance director is
          required <sup>1</sup>, and orders over €50,000 also need a second quote <sup>2</sup>.
        </p>
        <div className="scr-sources">
          <span>
            <i>1</i> Procurement Policy v3 · §2.1
          </span>
          <span>
            <i>2</i> Finance Handbook · p. 14
          </span>
        </div>
      </div>
      <div className="scr-foot">
        <span className="scr-ok">Permission-checked</span>
        <span>2 sources · current versions only</span>
      </div>
    </>
  );
}

function Agent() {
  return (
    <>
      <div className="scr-msg scr-msg--me">Customer says order 48213 arrived damaged. Please sort it out.</div>
      <ul className="scr-steps">
        <li className="is-done">
          <span>Looked up order 48213</span>
          <em>ERP</em>
        </li>
        <li className="is-done">
          <span>Created ticket #8812</span>
          <em>ITSM</em>
        </li>
        <li className="is-wait">
          <span>Refund €312.40 to card</span>
          <em>Needs approval</em>
        </li>
      </ul>
      <div className="scr-approve">
        <span>Approval required · refunds over €250</span>
        <span className="scr-btns">
          <b>Approve</b>
          <i>Reject</i>
        </span>
      </div>
    </>
  );
}

function Invoices() {
  const rows = [
    { id: "INV-2041", s: "Northwind Ltd", st: "Posted", k: "ok" },
    { id: "INV-2042", s: "Delta Logistics", st: "Posted", k: "ok" },
    { id: "INV-2043", s: "Mara Foods SRL", st: "Needs review", k: "warn" },
    { id: "INV-2044", s: "Acme Industries", st: "Processing", k: "run" },
  ];
  return (
    <>
      <div className="scr-kpis">
        <div>
          <small>Today</small>
          <b>128</b>
        </div>
        <div>
          <small>Straight-through</small>
          <b>91%</b>
        </div>
        <div className="is-warn">
          <small>For review</small>
          <b>4</b>
        </div>
      </div>
      <div className="scr-list">
        {rows.map((r, i) => (
          <div key={r.id} className="scr-list__row" style={{ animationDelay: `${i * 0.35}s` }}>
            <span className="scr-mono">{r.id}</span>
            <span>{r.s}</span>
            <span className={`scr-pill scr-pill--${r.k}`}>{r.st}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function Pipelines() {
  const rows = [
    { n: "erp_orders", t: "2m 14s", k: "ok" },
    { n: "crm_accounts", t: "48s", k: "ok" },
    { n: "finance_ledger", t: "running", k: "run" },
  ];
  return (
    <>
      <div className="scr-list">
        {rows.map((r) => (
          <div key={r.n} className="scr-list__row scr-list__row--static">
            <span className={`scr-dot scr-dot--${r.k}`} />
            <span className="scr-mono">{r.n}</span>
            <span className="scr-muted">{r.k === "run" ? <span className="scr-progress"><i /></span> : r.t}</span>
          </div>
        ))}
      </div>
      <div className="scr-checks">
        <div>
          <small>Quality checks</small>
          <b>12 / 12 passed</b>
        </div>
        <div className="scr-spark">
          {[30, 42, 38, 55, 50, 64, 60, 72, 68, 80].map((h, i) => (
            <i key={i} style={{ height: `${h}%`, animationDelay: `${i * 0.06}s` }} />
          ))}
        </div>
      </div>
    </>
  );
}

function Integration() {
  const log = [
    ["POST", "/customers", "201", "84 ms"],
    ["PATCH", "/orders/48213", "200", "61 ms"],
    ["GET", "/invoices?status=open", "200", "112 ms"],
    ["POST", "/webhooks/crm", "202", "39 ms"],
  ];
  return (
    <>
      <div className="scr-conn">
        <span className="scr-sys">CRM</span>
        <span className="scr-line">
          <i />
        </span>
        <span className="scr-lock">Secure API</span>
        <span className="scr-line">
          <i />
        </span>
        <span className="scr-sys">ERP</span>
      </div>
      <div className="scr-log">
        {log.map(([m, p, c, t], i) => (
          <div key={p} className="scr-log__row" style={{ animationDelay: `${i * 0.4}s` }}>
            <span className={`scr-method scr-method--${m.toLowerCase()}`}>{m}</span>
            <span className="scr-mono">{p}</span>
            <span className="scr-ok">{c}</span>
            <span className="scr-muted">{t}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function Engagement() {
  const phases = [
    ["Discover", "done"],
    ["Design", "done"],
    ["Build", "run"],
    ["Deploy", "todo"],
    ["Improve", "todo"],
  ];
  return (
    <>
      <div className="scr-phases">
        {phases.map(([p, k]) => (
          <div key={p} className={`scr-phase scr-phase--${k}`}>
            <i />
            <span>{p}</span>
          </div>
        ))}
      </div>
      <div className="scr-checks">
        <div>
          <small>Sprint 4 · demo Friday</small>
          <b>Invoice matching on live data</b>
        </div>
        <span className="scr-pill scr-pill--ok">On track</span>
      </div>
    </>
  );
}

export function Screen({ kind }: { kind: ScreenKind }) {
  const body = {
    "process-mining": <ProcessMining />,
    "ai-engineering": <Search />,
    "ai-agents": <Agent />,
    "intelligent-automation": <Invoices />,
    "data-engineering": <Pipelines />,
    "custom-software": <Integration />,
    brand: <Engagement />,
  }[kind];
  return <Window kind={kind}>{body}</Window>;
}

/** Screen on a soft gradient stage. */
export function ScreenTile({ kind, className }: { kind: ScreenKind; className?: string }) {
  return (
    <div className={`stage stage--${kind} ${className ?? ""}`}>
      <Screen kind={kind} />
    </div>
  );
}
