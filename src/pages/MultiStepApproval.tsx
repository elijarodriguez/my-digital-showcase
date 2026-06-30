import {
  Webhook,
  GitBranch,
  Mail,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ListChecks,
} from "lucide-react";
import AutomationWalkthrough from "@/components/AutomationWalkthrough";

const MultiStepApproval = () => (
  <AutomationWalkthrough
    caseId="05"
    title="Multi-Step"
    highlight="Approval Workflow"
    intro="A conditional-logic n8n pipeline that routes internal requests (purchase orders, time-off, access requests) through the right approver chain based on type + amount, waits for responses via email, and executes the downstream action automatically — cutting approval cycles from days to hours."
    stats={[
      { label: "Time saved", value: "Days → hrs" },
      { label: "Branches", value: "Dynamic" },
      { label: "Audit log", value: "Full" },
      { label: "Channels", value: "Email + App" },
    ]}
    techStack={["n8n", "Webhook", "Switch", "Wait", "SMTP"]}
    pipelineAscii={`  ┌────────────┐    ┌──────────────┐    ┌──────────────┐    ┌────────────────┐
  │  Webhook   │───▶│  Classify    │───▶│  Wait for    │───▶│  Execute       │
  │  Request   │    │  & Route     │    │  Approver(s) │    │  Action + Log  │
  └────────────┘    └──────────────┘    └──────────────┘    └────────────────┘
        │                  │                    │                    │
        ▼                  ▼                    ▼                    ▼
   raw request      approver chain       signed responses      action + audit`}
    stages={[
      {
        id: "01",
        title: "Request Intake",
        subtitle: "Capture Layer",
        tool: "n8n Webhook",
        icon: Webhook,
        description:
          "An internal app POSTs the request to a webhook. Each request carries a type, amount (if applicable), requester, and free-form justification. The workflow assigns a request ID and timestamps the intake for audit.",
        steps: [
          "Receive POST from internal app",
          "Assign UUID + intake timestamp",
          "Validate required fields",
          "Persist a 'pending' record for audit",
        ],
        output: {
          label: "Output — normalized request",
          code: `{
  "request_id": "REQ-2026-0631",
  "type": "purchase_order",
  "amount": 4250.00,
  "requester": "maria@acme.co",
  "justification": "New monitors for design team (5 units)",
  "submitted_at": "2026-06-30T09:14:00Z"
}`,
        },
      },
      {
        id: "02",
        title: "Classify & Route",
        subtitle: "Decision Layer",
        tool: "Switch + IF nodes",
        icon: GitBranch,
        description:
          "A Switch node routes by type, then nested IF nodes branch by amount thresholds and department. The workflow builds an approver chain dynamically — e.g. <$1k → manager only, $1k–$5k → manager + finance, >$5k → manager + finance + CFO.",
        steps: [
          "Route by request type (PO / PTO / access)",
          "Branch by amount thresholds",
          "Look up approvers from a directory",
          "Assemble ordered approver chain",
        ],
        output: {
          label: "Output — approver chain",
          code: `{
  "request_id": "REQ-2026-0631",
  "chain": [
    { "step": 1, "role": "manager", "email": "alex@acme.co" },
    { "step": 2, "role": "finance", "email": "finance@acme.co" }
  ],
  "policy_matched": "PO/1k-5k/standard"
}`,
        },
      },
      {
        id: "03",
        title: "Wait for Approvers",
        subtitle: "Asynchronous Layer",
        tool: "n8n Wait + Email",
        icon: Clock,
        description:
          "For each approver in order, the workflow emails a signed Approve / Reject link and pauses on a Wait node. Clicks hit a callback URL, the response is recorded, and the workflow either advances to the next approver or short-circuits on a rejection.",
        steps: [
          "Email signed Approve / Reject links",
          "Pause on Wait node per approver",
          "Resume on callback hit",
          "Short-circuit on first rejection",
        ],
        output: {
          label: "Output — approval log",
          code: `[
  { "step": 1, "role": "manager",  "decision": "approved", "at": "2026-06-30T10:02:11Z" },
  { "step": 2, "role": "finance",  "decision": "approved", "at": "2026-06-30T11:48:33Z", "note": "Within Q3 budget." }
]`,
        },
      },
      {
        id: "04",
        title: "Execute & Audit",
        subtitle: "Action Layer",
        tool: "HTTP + DB",
        icon: CheckCircle2,
        description:
          "On full approval, the workflow performs the downstream action — creating the PO in the ERP, granting the access via API, or scheduling the PTO — then writes a complete audit record (request, chain, decisions, timing, final action) into the database.",
        steps: [
          "Execute downstream action via API",
          "Notify requester of final status",
          "Write full audit record to DB",
          "Archive trail for compliance review",
        ],
        output: {
          label: "Output — final audit record",
          code: `{
  "request_id": "REQ-2026-0631",
  "final_status": "approved",
  "executed_action": "PO-7741 created in ERP",
  "total_duration_hours": 2.6,
  "audit_url": "https://app.internal/audit/REQ-2026-0631"
}`,
        },
      },
    ]}
    deliverables={[
      {
        icon: ListChecks,
        title: "Dynamic approver chains",
        desc: "Policies live in config, not in code — change a threshold and the chain updates instantly.",
      },
      {
        icon: ShieldCheck,
        title: "Tamper-proof audit trail",
        desc: "Every decision, timestamp, and note is captured for compliance and post-mortems.",
      },
      {
        icon: Mail,
        title: "Friction-free approvals",
        desc: "One-click email approvals mean leaders don't need to log into yet another tool.",
      },
    ]}
  />
);

export default MultiStepApproval;
