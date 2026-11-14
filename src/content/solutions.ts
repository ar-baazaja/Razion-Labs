/**
 * Use-case-led solution pages (requirements §3). Claims are kept qualitative:
 * no figures are published until they come from verified engagements.
 */
export type Solution = {
  slug: string;
  name: string;
  summary: string;
  metaDescription: string;
  signals: string[];
  whatWeBuild: { title: string; body: string }[];
  services: string[]; // service slugs
  measures: string[];
};

export const solutions: Solution[] = [
  {
    slug: "operations-optimization",
    name: "Operations optimization",
    summary: "Find where orders, cases and requests wait, then remove the waiting.",
    metaDescription: "Use process mining and automation to locate and remove operational bottlenecks.",
    signals: [
      "Cycle times vary widely and nobody can say why",
      "Teams spend time chasing status instead of doing the work",
      "Improvement projects are prioritised by whoever is loudest",
    ],
    whatWeBuild: [
      { title: "Process baseline", body: "An event log from your ERP or ticketing system, turned into a measured process map." },
      { title: "Bottleneck analysis", body: "Waiting time attributed to specific hand-offs, queues and rework loops." },
      { title: "Targeted automation", body: "Automation applied only to the steps the data says matter." },
    ],
    services: ["process-mining", "intelligent-automation", "data-engineering"],
    measures: ["End-to-end cycle time", "Rework rate", "Throughput per week", "Share of cases on the intended path"],
  },
  {
    slug: "customer-service",
    name: "Customer service",
    summary: "Resolve routine requests faster and give agents the answer before they search for it.",
    metaDescription: "AI assistants and agent tooling for faster, more consistent customer service.",
    signals: [
      "Agents search several systems to answer one question",
      "The same simple requests make up a large share of volume",
      "Answers differ depending on who picks up the ticket",
    ],
    whatWeBuild: [
      { title: "Agent assist", body: "Suggested answers grounded in your knowledge base, with sources shown." },
      { title: "Self-service assistant", body: "Handles well-defined request types end-to-end, escalating the rest." },
      { title: "Ticket triage", body: "Classification and routing so cases reach the right queue first time." },
    ],
    services: ["ai-agents", "ai-engineering", "custom-software"],
    measures: ["First-contact resolution", "Average handling time", "Escalation rate", "Answer accuracy on evaluation set"],
  },
  {
    slug: "enterprise-search",
    name: "Enterprise search",
    summary: "One place to ask a question across documents, wikis and tickets, respecting who can see what.",
    metaDescription: "Permission-aware enterprise search and question answering over internal knowledge.",
    signals: [
      "Knowledge sits in SharePoint, Confluence, drives and inboxes",
      "New staff take months to learn where things are",
      "Search returns documents, not answers",
    ],
    whatWeBuild: [
      { title: "Unified index", body: "Connectors that keep content and permissions in sync." },
      { title: "Cited answers", body: "Responses that quote and link the source passages." },
      { title: "Usage insight", body: "Analytics on unanswered questions to show where documentation is missing." },
    ],
    services: ["ai-engineering", "data-engineering"],
    measures: ["Answer accuracy", "Time to find information", "Unanswered-question rate"],
  },
  {
    slug: "forecasting",
    name: "Forecasting",
    summary: "Demand, workload and capacity forecasts built on clean data and explained in plain terms.",
    metaDescription: "Forecasting for demand, workload and capacity planning on reliable data foundations.",
    signals: [
      "Planning relies on last year plus a percentage",
      "Forecasts exist but nobody trusts or understands them",
      "Staffing and inventory swing between too much and too little",
    ],
    whatWeBuild: [
      { title: "Data foundation", body: "Historical series cleaned, documented and refreshed automatically." },
      { title: "Forecast models", body: "Baselines first, then more complex models only where they beat them." },
      { title: "Planning views", body: "Forecasts with ranges and drivers, inside the tools planners already use." },
    ],
    services: ["data-engineering", "ai-engineering"],
    measures: ["Forecast error vs. current method", "Planning cycle time", "Forecast adoption"],
  },
];

export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug);

