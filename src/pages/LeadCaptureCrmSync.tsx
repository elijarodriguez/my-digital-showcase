import {
  Webhook,
  ShieldCheck,
  Sparkles,
  Database,
  MessageSquare,
  Users,
  BellRing,
} from "lucide-react";
import AutomationWalkthrough from "@/components/AutomationWalkthrough";

const LeadCaptureCrmSync = () => (
  <AutomationWalkthrough
    caseId="02"
    title="Lead Capture →"
    highlight="CRM Sync"
    intro="A webhook-triggered n8n pipeline that catches form submissions in real time, validates and enriches them with AI, pushes a clean contact into the CRM, and pings the sales team in Slack — so no lead is ever lost in an inbox."
    stats={[
      { label: "Saved per week", value: "~10 hrs" },
      { label: "Response time", value: "<30s" },
      { label: "Integrations", value: "4" },
      { label: "Manual entry", value: "0" },
    ]}
    techStack={["n8n", "Webhook", "OpenAI", "HubSpot", "Slack"]}
    pipelineAscii={`  ┌────────────┐    ┌──────────────┐    ┌──────────────┐    ┌────────────────┐
  │  Webhook   │───▶│  Validate &  │───▶│  Enrich w/   │───▶│  HubSpot +     │
  │  Form POST │    │  Sanitize    │    │  OpenAI      │    │  Slack notify  │
  └────────────┘    └──────────────┘    └──────────────┘    └────────────────┘
        │                  │                    │                    │
        ▼                  ▼                    ▼                    ▼
   raw payload       clean lead obj      enriched profile      contact + ping`}
    stages={[
      {
        id: "01",
        title: "Webhook Trigger",
        subtitle: "Capture Layer",
        tool: "n8n Webhook",
        icon: Webhook,
        description:
          "Any form on the marketing site POSTs its payload to a dedicated n8n webhook. The workflow accepts the submission instantly and returns a 200 to keep the form UX snappy, even while the heavier work happens downstream.",
        steps: [
          "Expose a public webhook URL",
          "Accept JSON payload from the form",
          "Return immediate 200 OK to the user",
          "Pass payload into the workflow context",
        ],
        output: {
          label: "Output — raw form payload",
          code: `{
  "name": "Maria Santos",
  "email": "maria@acme.co",
  "company": "Acme Co",
  "message": "Need help automating our quote process.",
  "source": "pricing-page",
  "submitted_at": "2026-06-30T08:14:22Z"
}`,
        },
      },
      {
        id: "02",
        title: "Validate & Sanitize",
        subtitle: "Quality Gate",
        tool: "Function + IF nodes",
        icon: ShieldCheck,
        description:
          "Before anything else, the payload is checked against a schema — required fields, valid email format, and a quick spam heuristic on the message body. Bad submissions are routed to a quarantine sheet instead of polluting the CRM.",
        steps: [
          "Schema-check required fields",
          "Validate email format & MX record",
          "Run a lightweight spam heuristic",
          "Route invalid leads to a quarantine sheet",
        ],
        output: {
          label: "Output — clean lead object",
          code: `{
  "valid": true,
  "lead": {
    "name": "Maria Santos",
    "email": "maria@acme.co",
    "company": "Acme Co",
    "message": "Need help automating our quote process.",
    "source": "pricing-page"
  }
}`,
        },
      },
      {
        id: "03",
        title: "AI Enrichment",
        subtitle: "Intelligence Layer",
        tool: "OpenAI",
        icon: Sparkles,
        description:
          "OpenAI takes the message + company name and returns structured enrichment: intent classification, urgency score, suggested talking points, and a short summary the rep can read in 5 seconds.",
        steps: [
          "Send lead context to OpenAI",
          "Classify intent (sales / support / partnership)",
          "Score urgency 1–5",
          "Generate a 2-line summary + talking points",
        ],
        output: {
          label: "Output — enrichment object",
          code: `{
  "intent": "sales",
  "urgency": 4,
  "summary": "Mid-size company looking to automate sales quoting; budget likely allocated.",
  "talking_points": [
    "Ask about current quoting tool",
    "Mention CPQ + n8n case study",
    "Offer 20-min discovery call"
  ]
}`,
        },
      },
      {
        id: "04",
        title: "Push to CRM + Notify",
        subtitle: "Delivery Layer",
        tool: "HubSpot + Slack",
        icon: Database,
        description:
          "The enriched lead is upserted into HubSpot (creating or updating the contact and attaching a note with the AI summary), and a formatted Slack message is sent to the #sales channel with one-click links to call, email, or open the contact.",
        steps: [
          "Upsert contact in HubSpot by email",
          "Attach AI summary as a note + tag urgency",
          "Post a rich Slack message to #sales",
          "Include CTA buttons: Call · Email · Open CRM",
        ],
        output: {
          label: "Output — Slack message",
          code: `🔥 New lead — Maria Santos (Acme Co)
intent: sales  ·  urgency: 4/5
"Mid-size company looking to automate sales quoting;
 budget likely allocated."

→ [ Call ]  [ Email ]  [ Open in HubSpot ]`,
        },
      },
    ]}
    deliverables={[
      {
        icon: Users,
        title: "Zero-touch lead pipeline",
        desc: "Every form submission becomes a clean, enriched CRM contact without anyone copy-pasting.",
      },
      {
        icon: BellRing,
        title: "Real-time Slack alerts",
        desc: "Sales sees hot leads within seconds, with context and action buttons baked in.",
      },
      {
        icon: MessageSquare,
        title: "Quarantine + audit log",
        desc: "Invalid or spammy submissions are kept in a separate sheet for review, never silently lost.",
      },
    ]}
  />
);

export default LeadCaptureCrmSync;
