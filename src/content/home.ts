/**
 * Home page copy, taken from the Razion Labs requirements document
 * (services §5, solutions §3, work §3/§4, delivery §4.05), written in plain
 * language. Edit text here; the page layout reads from this file.
 */
export const hero = {
  badge: "AI engineering · Process mining · Intelligent automation",
  title: "Engineer intelligence.",
  accent: "Transform operations.",
  lead: "Practical AI, process intelligence and the systems that connect them.",
  body: "We find where your operations lose time, then build the AI tools, automation and software that fix it, and measure the result against your own data.",
  primary: { label: "Discuss a project", href: "#contact" },
  secondary: { label: "Explore capabilities", href: "#services" },
};

export const about = {
  label: "About us",
  statement: "An engineering-led team building practical AI, process intelligence and the enterprise systems that connect them, so operations get measurably better.",
  stats: [
    { value: "6", label: "Services", text: "From AI engineering to custom software and integration" },
    { value: "4", label: "Solution areas", text: "Operations, customer service, enterprise search and forecasting" },
    { value: "5", label: "Delivery steps", text: "Discover, design, build, deploy and improve" },
  ],
};

export const promises = [
  { title: "Measured results", text: "Every project starts from your own data, so improvement can be proven." },
  { title: "Built for real use", text: "Tested, monitored and secure from day one, not a one-off demo." },
  { title: "Yours to keep", text: "Code, documentation and know-how are handed over to your team." },
];

/** The six services (requirements §5), in plain words. */
export const services = [
  {
    name: "AI engineering",
    text: "AI that answers questions from your own documents and data, with the source shown, tested for accuracy and kept running.",
    outcome: "Reliable answers your team can check.",
  },
  {
    name: "AI agents & assistants",
    text: "Assistants that handle routine requests in your systems, like looking up an order or opening a ticket, and ask a person before anything important.",
    outcome: "Routine requests resolved end to end.",
  },
  {
    name: "Process mining",
    text: "We use the records your systems already keep to show how work really flows, where it waits, and what to fix first.",
    outcome: "Delays located with facts, not opinions.",
  },
  {
    name: "Intelligent automation",
    text: "Documents read and entered automatically, approvals routed, and systems updated, with people kept in the loop for anything unclear.",
    outcome: "Hours of manual work removed.",
  },
  {
    name: "Data engineering",
    text: "Your data collected in one place, cleaned, checked and refreshed on schedule, ready for reports and AI.",
    outcome: "One version of the numbers everyone trusts.",
  },
  {
    name: "Custom software & integration",
    text: "Secure connections between your ERP, CRM and other tools, plus internal applications built around how your team works.",
    outcome: "Systems that share data automatically.",
  },
];

/** Use-case solutions (requirements §3). */
export const solutions = [
  { name: "Operations optimization", text: "Find where orders, cases and requests wait, then remove the waiting." },
  { name: "Customer service", text: "Resolve routine requests faster and give agents the answer before they search for it." },
  { name: "Enterprise search", text: "One place to ask a question across documents, wikis and tickets, respecting who can see what." },
  { name: "Forecasting", text: "Demand, workload and capacity forecasts built on clean data and explained in plain terms." },
];

/** Projects: capabilities showcase until client-approved case studies exist (requirements §3, §4.06). */
export const projects = [
  {
    name: "Order-to-cash process discovery",
    sector: "Manufacturing & distribution",
    problem: "Invoices were paid late, and every team believed the delay was in another team.",
    solution: "We traced every order from placement to payment, found the step where it really waited, and fixed the biggest delays first.",
  },
  {
    name: "Service desk assistant with approvals",
    sector: "IT & shared services",
    problem: "Most tickets were password resets, access requests and simple how-to questions.",
    solution: "An assistant now answers from the existing help articles and handles routine requests, and a manager approves any access change.",
  },
  {
    name: "Supplier invoice intake",
    sector: "Finance operations",
    problem: "Invoices arrived by email in many layouts and were typed in by hand, with mistakes found weeks later.",
    solution: "Invoices are now read, matched to the purchase order and entered automatically. Anything unclear goes to a person.",
  },
  {
    name: "Policy and procedure search",
    sector: "Regulated industries",
    problem: "Staff needed exact answers from hundreds of policy documents, and a wrong answer was a compliance risk.",
    solution: "Staff now ask in plain words and get the exact answer from the current version, with the section it came from.",
  },
];

/** How we deliver (requirements §4.05). */
export const steps = [
  { title: "Discover", text: "We learn how the process works today and agree how success will be measured." },
  { title: "Design", text: "We plan the solution and how it connects to your systems before building." },
  { title: "Build", text: "Working pieces every few weeks, tested on your real data." },
  { title: "Deploy", text: "A careful rollout with monitoring and a way back if needed." },
  { title: "Improve", text: "We measure the result against where you started, then hand over." },
];
export const stepsNote = "Governance, security and integration are part of every step, not added at the end.";

export const contact = {
  title: "Discuss a project",
  text: "Tell us about the process or system you want to improve. An engineer replies within two working days.",
};
