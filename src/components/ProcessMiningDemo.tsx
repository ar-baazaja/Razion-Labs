"use client";

import { useId, useMemo, useState } from "react";

/* ------------------------------------------------------------------ *
 * Synthetic order-to-cash event log (illustrative, requirements §6). *
 * 1,240 cases over 26 weeks, 4 variants. All figures are invented.   *
 * ------------------------------------------------------------------ */
type NodeId = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
type VariantId = "v1" | "v2" | "v3" | "v4";

const WEEKS = 26;

const NODES: Record<NodeId, { label: string; x: number; y: number }> = {
  A: { label: "Order received", x: 64, y: 150 },
  B: { label: "Credit check", x: 200, y: 150 },
  C: { label: "Manual review", x: 290, y: 50 },
  D: { label: "Pick & pack", x: 380, y: 150 },
  E: { label: "Ship", x: 530, y: 150 },
  F: { label: "Invoice", x: 680, y: 150 },
  G: { label: "Correct invoice", x: 680, y: 245 },
  H: { label: "Payment", x: 836, y: 150 },
};

type Edge = {
  id: string;
  from: NodeId;
  to: NodeId;
  wait: number; // average days between the two events
  d: string;
  label: { x: number; y: number; anchor?: "start" | "middle" | "end" };
};

const EDGES: Edge[] = [
  { id: "AB", from: "A", to: "B", wait: 0.3, d: "M116 150 H148", label: { x: 132, y: 141 } },
  { id: "BD", from: "B", to: "D", wait: 0.8, d: "M252 150 H328", label: { x: 290, y: 141 } },
  { id: "BC", from: "B", to: "C", wait: 0.6, d: "M215 135 V62 Q215 50 227 50 H238", label: { x: 208, y: 100, anchor: "end" } },
  { id: "CD", from: "C", to: "D", wait: 3.9, d: "M342 50 H383 Q395 50 395 62 V135", label: { x: 403, y: 100, anchor: "start" } },
  { id: "DE", from: "D", to: "E", wait: 1.2, d: "M432 150 H478", label: { x: 455, y: 141 } },
  { id: "EF", from: "E", to: "F", wait: 0.9, d: "M582 150 H628", label: { x: 605, y: 141 } },
  { id: "FG", from: "F", to: "G", wait: 1.1, d: "M660 165 V230", label: { x: 652, y: 202, anchor: "end" } },
  { id: "GF", from: "G", to: "F", wait: 4.6, d: "M700 230 V165", label: { x: 708, y: 202, anchor: "start" } },
  { id: "FH", from: "F", to: "H", wait: 3.0, d: "M732 150 H784", label: { x: 758, y: 141 } },
];

const VARIANTS: { id: VariantId; name: string; path: NodeId[]; cases: number }[] = [
  { id: "v1", name: "Straight through, no issues", path: ["A", "B", "D", "E", "F", "H"], cases: 719 },
  { id: "v2", name: "Manual credit review", path: ["A", "B", "C", "D", "E", "F", "H"], cases: 260 },
  { id: "v3", name: "Invoice correction", path: ["A", "B", "D", "E", "F", "G", "F", "H"], cases: 174 },
  { id: "v4", name: "Review + correction", path: ["A", "B", "C", "D", "E", "F", "G", "F", "H"], cases: 87 },
];
const TOTAL = VARIANTS.reduce((n, v) => n + v.cases, 0);

const edgeKey = (a: NodeId, b: NodeId) => `${a}${b}`;
const edgesOf = (path: NodeId[]) => path.slice(1).map((n, i) => edgeKey(path[i], n));
const edgeById = Object.fromEntries(EDGES.map((e) => [e.id, e]));
const cycleOf = (path: NodeId[]) => edgesOf(path).reduce((s, id) => s + edgeById[id].wait, 0);

const fmt = (n: number, d = 1) => n.toLocaleString("en-GB", { minimumFractionDigits: d, maximumFractionDigits: d });

/** Deterministic timestamps (UTC) so server and client render identically. */
function sampleLog(variant: (typeof VARIANTS)[number]) {
  const start = Date.UTC(2026, 2, 2, 8, 0);
  let t = start;
  const caseId = `C-${({ v1: 1042, v2: 1043, v3: 1057, v4: 1061 } as const)[variant.id]}`;
  return variant.path.map((n, i) => {
    if (i > 0) t += edgeById[edgeKey(variant.path[i - 1], n)].wait * 86_400_000;
    const d = new Date(t);
    const ts = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")} ${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")}`;
    return { caseId, activity: NODES[n].label, ts };
  });
}

export function ProcessMiningDemo() {
  const [selected, setSelected] = useState<"all" | VariantId>("all");
  const groupName = useId();

  const view = useMemo(() => {
    const scope = selected === "all" ? VARIANTS : VARIANTS.filter((v) => v.id === selected);
    const cases = scope.reduce((n, v) => n + v.cases, 0);

    // Share of selected cases that traverse each edge (drives stroke width).
    const flow: Record<string, number> = {};
    for (const v of scope) for (const id of new Set(edgesOf(v.path))) flow[id] = (flow[id] ?? 0) + v.cases / cases;

    const activeNodes = new Set(scope.flatMap((v) => v.path));
    const cycle = scope.reduce((s, v) => s + cycleOf(v.path) * v.cases, 0) / cases;
    const bottleneck = Object.keys(flow).reduce((a, b) => (edgeById[b].wait > edgeById[a].wait ? b : a));
    const log = sampleLog(scope.length === 1 ? scope[0] : VARIANTS[1]);

    return { cases, flow, activeNodes, cycle, bottleneck, log, throughput: cases / WEEKS };
  }, [selected]);

  const bn = edgeById[view.bottleneck];

  return (
    <div className="demo" data-motion>
      <div className="pm-intro">
        <div className="pm-intro__copy">
          <h3>Where do this company&apos;s orders lose time?</h3>
          <p>
            An example distributor shared 26 weeks of order data from its ERP: 1,240 orders, each with the time every step happened.
            Our process mining turns that into the map below, so you can see which route orders take, how long they wait and where.
          </p>
        </div>
        <ol className="pm-intro__how" aria-label="How to use this example">
          <li>
            <b>Pick a route</b>
            <span>on the left, e.g. orders that needed a manual credit review</span>
          </li>
          <li>
            <b>Watch the numbers</b>
            <span>cycle time, orders per week and the slowest step update</span>
          </li>
          <li>
            <b>Find the delay</b>
            <span>the amber arrow is where orders wait longest</span>
          </li>
        </ol>
        <span className="badge badge--signal pm-intro__badge">Example data</span>
      </div>

      <div className="pm">
        <div className="pm__side">
          <fieldset>
            <legend>Routes orders took</legend>
            <div className="variant-list">
              {[{ id: "all" as const, name: "All orders", cases: TOTAL }, ...VARIANTS].map((v) => (
                <label key={v.id} className="variant">
                  <input
                    type="radio"
                    name={groupName}
                    value={v.id}
                    checked={selected === v.id}
                    onChange={() => setSelected(v.id)}
                  />
                  <span className="variant__dot" aria-hidden="true" />
                  <span>{v.name}</span>
                  <span className="variant__share">{Math.round((v.cases / TOTAL) * 100)}%</span>
                </label>
              ))}
            </div>
          </fieldset>
          <p className="muted" style={{ fontSize: "0.85rem" }}>
            Process mining calls each route a <strong>variant</strong>. The percentage is the share of orders that took it.
          </p>
        </div>

        <div className="pm__main">
          <dl className="kpis" aria-live="polite">
            <div className="kpi">
              <dt>Orders</dt>
              <dd>{view.cases.toLocaleString("en-GB")}</dd>
            </div>
            <div className="kpi">
              <dt>Cycle time <small>order → payment</small></dt>
              <dd>
                {fmt(view.cycle)}
                <small>days</small>
              </dd>
            </div>
            <div className="kpi">
              <dt>Throughput <small>orders per week</small></dt>
              <dd>
                {fmt(view.throughput, 0)}
                <small>/ week</small>
                
              </dd>
            </div>
            <div className="kpi kpi--signal">
              <dt>Bottleneck <small>slowest step</small></dt>
              <dd>
                {NODES[bn.from].label} → {NODES[bn.to].label}
                <br />
                <span className="mono" style={{ fontWeight: 400, fontSize: "0.85rem" }}>
                  avg. wait {fmt(bn.wait)} days
                </span>
              </dd>
            </div>
          </dl>

          <div className="pm__graph" tabIndex={0} role="region" aria-label="Process graph, scrollable">
            <svg viewBox="0 0 900 280" role="img" aria-labelledby="pm-title">
              <title id="pm-title">
                {`Process map for ${selected === "all" ? "all variants" : VARIANTS.find((v) => v.id === selected)!.name}. Slowest hand-off: ${NODES[bn.from].label} to ${NODES[bn.to].label}, ${fmt(bn.wait)} days average wait.`}
              </title>
              <defs>
                <marker id="pm-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
                  <path d="M0 0 L8 4 L0 8 z" fill="context-stroke" />
                </marker>
              </defs>

              {EDGES.map((e) => {
                const share = view.flow[e.id] ?? 0;
                const on = share > 0;
                const slow = on && e.id === view.bottleneck;
                return (
                  <g key={e.id}>
                    <path
                      d={e.d}
                      className={`pm-edge ${on ? "pm-edge--on" : "pm-edge--off"} ${slow ? "pm-edge--slow" : ""}`}
                      strokeWidth={on ? 1.5 + share * 5 : 1}
                      markerEnd="url(#pm-arrow)"
                    />
                    <path d={e.d} className={`pm-flowline ${on ? "" : "pm-flowline--off"}`} />
                    {on && (
                      <text
                        x={e.label.x}
                        y={e.label.y}
                        textAnchor={e.label.anchor ?? "middle"}
                        className={`pm-wait ${slow ? "pm-wait--slow" : ""}`}
                      >
                        {fmt(e.wait)}d
                      </text>
                    )}
                  </g>
                );
              })}

              {(Object.keys(NODES) as NodeId[]).map((id) => {
                const n = NODES[id];
                const on = view.activeNodes.has(id);
                return (
                  <g key={id} className={`pm-node ${on ? "pm-node--on" : "pm-node--off"}`}>
                    <rect x={n.x - 52} y={n.y - 15} width="104" height="30" rx="4" />
                    <text x={n.x} y={n.y + 4} textAnchor="middle" style={{ fontSize: 10.5 }}>
                      {n.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <p className="pm__legend">
            <span><i className="lg lg--a" /> Edge width = share of cases</span>
            <span>Labels = average wait between activities (days)</span>
            <span><i className="lg lg--s" /> Bottleneck</span>
          </p>
          <div className="pm__log">
            <table>
              <caption>Event log: what the ERP recorded for one order · {selected === "all" ? "Manual credit review" : VARIANTS.find((v) => v.id === selected)!.name}</caption>
              <thead>
                <tr>
                  <th scope="col">Case ID</th>
                  <th scope="col">Activity</th>
                  <th scope="col">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {view.log.map((r, i) => (
                  <tr key={i}>
                    <td>{r.caseId}</td>
                    <td>{r.activity}</td>
                    <td>{r.ts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
