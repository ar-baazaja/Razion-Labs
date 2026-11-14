/**
 * Work page content. Until client-approved case studies exist (requirements
 * §3, §4.06), this is a capabilities showcase: reference architectures for
 * typical engagements. They are explicitly labelled and contain no client
 * names, logos or results.
 *
 * To publish a real case study later, add an entry with `kind: "case-study"`
 * and populate `results` only with verified, client-approved figures.
 */
export type WorkItem = {
  slug: string;
  kind: "blueprint" | "case-study";
  title: string;
  /** One plain-English sentence for non-technical readers. */
  summary: string;
  sector: string;
  services: string[];
  challenge: string;
  approach: string[];
  architecture: string[];
  results?: string[];
};

export const work: WorkItem[] = [
  {
    slug: "order-to-cash-discovery",
    kind: "blueprint",
    title: "Order-to-cash process discovery",
    summary: "We trace every order from placement to payment to find the step where the delay really starts.",
    sector: "Manufacturing & distribution",
    services: ["process-mining", "data-engineering"],
    challenge:
      "Invoices are paid late, but the delay could sit in order entry, credit checks, delivery or billing. Each team believes it is another team.",
    approach: [
      "Collect the date and time of every step each order went through",
      "Draw the real route orders take, and how long they wait between steps",
      "Compare it with how the process is supposed to work",
      "Fix the biggest delays first, then measure again",
    ],
    architecture: ["ERP tables", "Extraction jobs", "Event log (OCEL)", "Process analytics", "Dashboard"],
  },
  {
    slug: "service-desk-assistant",
    kind: "blueprint",
    title: "Service desk assistant with approvals",
    summary: "An assistant resolves password and access requests, and asks a manager before changing anyone's access.",
    sector: "IT & shared services",
    services: ["ai-agents", "ai-engineering"],
    challenge:
      "A large share of tickets are access requests, password issues and how-to questions that follow known procedures.",
    approach: [
      "Sort incoming requests and pick the simple, repetitive ones",
      "Answer from your existing help articles, and show which one",
      "Let it check statuses and open requests, nothing more",
      "A manager approves before anyone's access changes",
    ],
    architecture: ["Teams / portal", "Assistant runtime", "Retrieval index", "Scoped tools", "ITSM", "Audit log"],
  },
  {
    slug: "invoice-intake",
    kind: "blueprint",
    title: "Supplier invoice intake",
    summary: "Supplier invoices arriving by email are read, checked against the order, and entered into accounting.",
    sector: "Finance operations",
    services: ["intelligent-automation", "custom-software"],
    challenge:
      "Invoices arrive by email in many layouts and are re-keyed into the ERP, with mismatches found weeks later.",
    approach: [
      "Pick up invoices from the shared inbox",
      "Read the supplier, amounts and items, and match them to the order",
      "Send anything unclear to a person to check",
      "Enter approved invoices into the accounting system",
    ],
    architecture: ["Mailbox", "Document extraction", "PO matching", "Review queue", "ERP API"],
  },
  {
    slug: "policy-knowledge-search",
    kind: "blueprint",
    title: "Policy and procedure search",
    summary: "Staff ask questions about company policies and get the exact answer, with the page it came from.",
    sector: "Regulated industries",
    services: ["ai-engineering", "data-engineering"],
    challenge:
      "Staff need precise answers from hundreds of versioned policy documents, and an approximate answer is a compliance risk.",
    approach: [
      "Load every policy, keeping track of which version is current",
      "Answer only from the current version, quoting the exact section",
      "Say \"I don't know\" rather than guess",
      "Test answers regularly with the compliance team",
    ],
    architecture: ["Document store", "Ingestion + chunking", "Vector + keyword index", "Answer service", "Evaluation"],
  },
];
