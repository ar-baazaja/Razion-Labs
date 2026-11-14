/**
 * Structured service content. Each entry feeds both the services overview and
 * the reusable service detail template (requirements §3, §5).
 *
 * `capabilities.current` = delivered today. `capabilities.roadmap` = being
 * built or offered on request; always shown separately so nothing is implied.
 */
export type Service = {
  slug: string;
  code: string;
  kicker: string;
  name: string;
  short: string;
  outcome: string;
  metaDescription: string;
  problem: { heading: string; body: string[] };
  outcomes: { title: string; body: string }[];
  capabilities: { current: string[]; roadmap: string[] };
  approach: { step: string; body: string }[];
  integrations: string[];
  faq: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "ai-engineering",
    code: "AIE",
    kicker: "Ask a question in normal words and get an answer that shows which document it came from.",
    name: "AI engineering",
    short: "LLM applications, retrieval and evaluation built to run in production, not in a slide deck.",
    outcome: "Answers grounded in your own documents, with measurable accuracy.",
    metaDescription:
      "Production LLM applications, retrieval-augmented generation, enterprise search and model evaluation from Razion Labs.",
    problem: {
      heading: "Most AI pilots stall between the demo and the data centre.",
      body: [
        "A prototype that answers ten hand-picked questions is easy. A system that answers ten thousand real ones, cites its sources, respects access rights and keeps working after the model provider ships an update is an engineering problem.",
        "We treat language models as one component in a system that also needs retrieval, evaluation, observability, cost control and a clear failure mode.",
      ],
    },
    outcomes: [
      { title: "Grounded answers", body: "Responses cite the documents they came from, so reviewers can check them in seconds." },
      { title: "Known accuracy", body: "An evaluation set built from your real questions, re-run on every model or prompt change." },
      { title: "Predictable cost", body: "Caching, routing and token budgets designed in from the start, not retrofitted." },
    ],
    capabilities: {
      current: [
        "Retrieval-augmented generation over documents, wikis and ticket history",
        "Enterprise search with permission-aware indexing",
        "Evaluation harnesses: golden sets, regression checks, LLM-as-judge with human calibration",
        "Deployment, monitoring and usage/cost dashboards",
        "Model-agnostic design across commercial and open-weight models",
      ],
      roadmap: ["Fine-tuning pipelines for domain-specific small models", "On-premise inference reference architecture"],
    },
    approach: [
      { step: "Question inventory", body: "Collect the real questions users ask and what a correct answer looks like." },
      { step: "Retrieval design", body: "Chunking, metadata and access control shaped to your content, not a default template." },
      { step: "Evaluate before scaling", body: "A baseline score is agreed before anyone sees a polished interface." },
      { step: "Operate", body: "Tracing, feedback capture and a review loop that feeds the evaluation set." },
    ],
    integrations: ["SharePoint", "Confluence", "Google Drive", "Jira / ServiceNow", "PostgreSQL + pgvector", "Azure OpenAI", "AWS Bedrock"],
    faq: [
      { q: "Do you send our data to a model provider?", a: "Only if you choose to. We design for your data-residency constraints and can use private endpoints or self-hosted models where required." },
      { q: "Which model do you use?", a: "Whichever scores best on your evaluation set within your cost and compliance limits. The architecture lets you swap it later." },
      { q: "How do we know it is accurate?", a: "Every release is measured against a fixed evaluation set built with your domain experts. You see the numbers before go-live." },
    ],
  },
  {
    slug: "ai-agents",
    code: "AGT",
    kicker: "Password resets, order updates, simple tickets. It asks a person before anything important.",
    name: "AI agents & assistants",
    short: "Assistants that take bounded actions in your systems, with approvals where they matter.",
    outcome: "Routine requests resolved end-to-end, with a human on the risky steps.",
    metaDescription:
      "AI agents and assistants that act inside enterprise systems with tool permissions, approvals and audit trails.",
    problem: {
      heading: "A chatbot that can only talk is a search box with extra steps.",
      body: [
        "The value appears when an assistant can look up an order, draft a refund, open a ticket or update a record. That is also where the risk appears.",
        "We build agents with explicit tool permissions, approval checkpoints and a full audit trail, so the boundary of what it may do is a design decision rather than a surprise.",
      ],
    },
    outcomes: [
      { title: "Fewer hand-offs", body: "Common requests complete without bouncing between teams." },
      { title: "Bounded actions", body: "Each tool has scoped permissions; high-impact steps require human approval." },
      { title: "Full traceability", body: "Every reasoning step and tool call is logged and reviewable." },
    ],
    capabilities: {
      current: [
        "Tool-using assistants for service desks, operations and internal support",
        "Human-in-the-loop approval flows for write actions",
        "Conversation and action audit logs",
        "Channel delivery via web, Microsoft Teams or Slack",
      ],
      roadmap: ["Multi-agent orchestration for long-running back-office processes", "Voice channel integration"],
    },
    approach: [
      { step: "Map the request types", body: "Identify high-volume, low-ambiguity requests worth automating first." },
      { step: "Define the tool surface", body: "Each action gets a narrow API, a permission scope and a rollback path." },
      { step: "Shadow mode", body: "The agent proposes actions while people execute them, until accuracy is proven." },
      { step: "Graduated autonomy", body: "Low-risk actions go automatic; others keep an approval step." },
    ],
    integrations: ["Microsoft Teams", "Slack", "ServiceNow", "Zendesk", "Salesforce", "REST / GraphQL APIs"],
    faq: [
      { q: "Can the agent make mistakes?", a: "Yes, which is why we scope actions narrowly, keep approvals on anything consequential and log every step for review." },
      { q: "How long until it is useful?", a: "A focused assistant for a single request type typically reaches shadow-mode testing within a few weeks of discovery." },
    ],
  },
  {
    slug: "process-mining",
    code: "PMN",
    kicker: "We use the records your systems already keep to show exactly where orders, tickets or invoices wait.",
    name: "Process mining",
    short: "See how work actually flows through your systems, from the event logs you already have.",
    outcome: "Bottlenecks and rework located with timestamps, not opinions.",
    metaDescription:
      "Process mining services: event-log ingestion, process discovery, conformance checking, variant and bottleneck analysis.",
    problem: {
      heading: "The process on the wall chart is not the process in the system.",
      body: [
        "Every ERP, CRM and ticketing tool records when things happen. Put those timestamps together and you get the real process: every loop, workaround and waiting room.",
        "We extract those event logs, reconstruct the process, and show where time and effort actually go, then help you decide what to change.",
      ],
    },
    outcomes: [
      { title: "A factual baseline", body: "Cycle times, throughput and variant frequency measured from system data." },
      { title: "Located bottlenecks", body: "Waiting time attributed to specific hand-offs, teams or conditions." },
      { title: "Prioritised fixes", body: "Improvement options ranked by measured impact and effort." },
    ],
    capabilities: {
      current: [
        "Event-log extraction and ingestion from ERP, CRM and ticketing systems",
        "Process discovery and variant analysis",
        "Conformance checking against the intended model",
        "Bottleneck and rework detection",
        "Performance dashboards and improvement recommendations",
      ],
      roadmap: ["Continuous monitoring with alerting on process drift", "Predictive cycle-time estimates per case"],
    },
    approach: [
      { step: "Scope one process", body: "Pick a process with a clear start, end and business owner, such as order-to-cash or ticket resolution." },
      { step: "Build the event log", body: "Case ID, activity and timestamp extracted and validated against known cases." },
      { step: "Discover and measure", body: "Variants, waiting times and conformance gaps quantified." },
      { step: "Act and re-measure", body: "Changes are tracked against the baseline so the improvement is provable." },
    ],
    integrations: ["SAP", "Microsoft Dynamics", "Salesforce", "ServiceNow", "Jira", "Celonis / PM4Py compatible formats (XES, OCEL)"],
    faq: [
      { q: "Do we need a process-mining licence?", a: "Not necessarily. We work with open tooling and can also prepare data for commercial platforms you already own." },
      { q: "What data do you need?", a: "At minimum, a case identifier, an activity name and a timestamp for each event. Most business systems already store this." },
      { q: "Is personal data involved?", a: "Often user IDs appear in logs. We pseudonymise them during extraction unless there is an agreed reason not to." },
    ],
  },
  {
    slug: "intelligent-automation",
    code: "AUT",
    kicker: "Invoices, forms and emails are read and entered automatically. Anything unclear goes to a person.",
    name: "Intelligent automation",
    short: "Workflow orchestration and document processing with people kept in the loop.",
    outcome: "Hours of re-keying removed, without losing control of exceptions.",
    metaDescription:
      "Intelligent automation: workflow orchestration, human-in-the-loop approvals and document processing integrated with business systems.",
    problem: {
      heading: "Automation breaks on exceptions, and exceptions are where the work is.",
      body: [
        "Rule-based scripts handle the happy path and fail silently on everything else. Teams end up maintaining the bot as well as doing the work.",
        "We design automations around the exceptions: classify, extract, route, and hand anything uncertain to a person with the context they need.",
      ],
    },
    outcomes: [
      { title: "Less manual entry", body: "Documents and requests captured, validated and posted to the right system." },
      { title: "Visible exceptions", body: "Uncertain cases surface in a review queue instead of failing silently." },
      { title: "Durable workflows", body: "Orchestration with retries, versioning and monitoring." },
    ],
    capabilities: {
      current: [
        "Workflow orchestration with retries and state tracking",
        "Human-in-the-loop approval and review queues",
        "Document processing: classification and field extraction from PDFs, scans and email",
        "Integration with ERP, CRM and shared mailboxes",
      ],
      roadmap: ["Self-service workflow builder for business teams"],
    },
    approach: [
      { step: "Measure the volume", body: "Use process data to confirm where automation actually pays back." },
      { step: "Design the exceptions", body: "Decide thresholds and who reviews what before writing the happy path." },
      { step: "Automate incrementally", body: "Ship one step at a time with measurable straight-through rates." },
      { step: "Monitor", body: "Track throughput, exception rate and processing time per step." },
    ],
    integrations: ["Microsoft 365 / Exchange", "SAP", "Odoo", "Salesforce", "Temporal / n8n", "Azure Document Intelligence"],
    faq: [
      { q: "Is this RPA?", a: "Sometimes it uses RPA where no API exists, but we prefer APIs and event-driven workflows because they are more robust." },
      { q: "What happens when the model is unsure?", a: "The case goes to a review queue with the extracted fields pre-filled and the uncertainty highlighted." },
    ],
  },
  {
    slug: "data-engineering",
    code: "DAT",
    kicker: "Your data collected in one place, checked and updated automatically, so reports finally agree.",
    name: "Data engineering",
    short: "Pipelines, warehouses and quality controls that AI and analytics can rely on.",
    outcome: "One trusted version of the numbers, refreshed on schedule.",
    metaDescription:
      "Data engineering: pipelines, warehouses, transformation, governance and data quality foundations for analytics and AI.",
    problem: {
      heading: "Every AI project is a data project first.",
      body: [
        "Models and dashboards inherit every flaw in the data underneath them. When three reports show three different revenue figures, nobody trusts the fourth one built on AI.",
        "We build the plumbing properly: tested transformations, documented lineage, and quality checks that fail loudly.",
      ],
    },
    outcomes: [
      { title: "Reliable pipelines", body: "Scheduled, monitored loads with alerting on failures and late data." },
      { title: "Tested transformations", body: "Business logic in version-controlled, tested code." },
      { title: "Clear ownership", body: "Lineage and definitions documented so numbers can be traced." },
    ],
    capabilities: {
      current: [
        "Batch and incremental pipelines from operational systems",
        "Cloud warehouse and lakehouse design",
        "Transformation layers with tests and documentation",
        "Data quality checks and governance foundations",
        "Analytics-ready models for BI tools",
      ],
      roadmap: ["Real-time streaming pipelines"],
    },
    approach: [
      { step: "Source audit", body: "Inventory systems, volumes, freshness needs and owners." },
      { step: "Model the core", body: "Define the key entities and metrics once, with stakeholders." },
      { step: "Build with tests", body: "Every transformation ships with tests and documentation." },
      { step: "Hand over", body: "Runbooks and monitoring your team can operate." },
    ],
    integrations: ["PostgreSQL", "Snowflake", "BigQuery", "Azure Synapse / Fabric", "dbt", "Airflow / Dagster", "Power BI"],
    faq: [
      { q: "Can you work with our existing warehouse?", a: "Yes. We usually extend what exists rather than starting over." },
      { q: "Who maintains it afterwards?", a: "Your team, with our documentation and runbooks, or us under a separate support agreement." },
    ],
  },
  {
    slug: "custom-software",
    code: "SWI",
    kicker: "When one system changes, the others update. No more copying between screens.",
    name: "Software & integration",
    short: "Secure APIs, internal applications and the integrations that connect them.",
    outcome: "Systems that exchange data reliably instead of through spreadsheets.",
    metaDescription:
      "Custom software and integration: secure APIs, enterprise applications, cloud deployments and ERP/CRM integration.",
    problem: {
      heading: "The gap between two systems is usually a person with a spreadsheet.",
      body: [
        "Off-the-shelf platforms cover most needs. The remaining gaps get filled by exports, copy-paste and fragile macros that one person understands.",
        "We build the missing pieces as maintainable software: typed APIs, small focused applications and integrations with proper error handling.",
      ],
    },
    outcomes: [
      { title: "Connected systems", body: "Data moves between platforms automatically and observably." },
      { title: "Secure by design", body: "Authentication, least-privilege access and secrets management from day one." },
      { title: "Maintainable code", body: "Typed, tested, documented and deployable by your team." },
    ],
    capabilities: {
      current: [
        "REST and GraphQL API design and implementation",
        "Internal web applications and admin tools",
        "ERP and CRM integration",
        "Cloud deployment with infrastructure as code",
        "CI/CD pipelines and observability",
      ],
      roadmap: [],
    },
    approach: [
      { step: "Define contracts", body: "Agree data shapes and error behaviour between systems first." },
      { step: "Build in slices", body: "Deliver working increments that are deployed, not just demonstrated." },
      { step: "Harden", body: "Security review, load testing and monitoring before go-live." },
      { step: "Document", body: "Runbooks, architecture notes and handover sessions." },
    ],
    integrations: ["SAP", "Microsoft Dynamics", "Salesforce", "HubSpot", "Azure", "AWS", "Docker / Kubernetes"],
    faq: [
      { q: "Which stack do you use?", a: "Typically TypeScript and Python, but we adapt to the stack your team already supports." },
      { q: "Do we own the code?", a: "Yes. Source code and documentation transfer to you at handover as agreed in the contract." },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
