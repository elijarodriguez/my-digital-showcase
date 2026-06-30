import {
  Database,
  RefreshCw,
  FileSpreadsheet,
  Mail,
  Eye,
  Activity,
  Layers,
} from "lucide-react";
import AutomationWalkthrough from "@/components/AutomationWalkthrough";

const DatabaseSyncReporting = () => (
  <AutomationWalkthrough
    caseId="04"
    title="Database Sync"
    highlight="& Reporting"
    intro="A bi-directional n8n workflow that keeps a Postgres database and a Google Sheet in lockstep — letting non-technical teams edit data in Sheets while the app keeps using Postgres — and ships a polished PDF report to stakeholders every Monday morning."
    stats={[
      { label: "Sync direction", value: "Bi-dir" },
      { label: "Report cadence", value: "Weekly" },
      { label: "Latency", value: "<60s" },
      { label: "Manual exports", value: "0" },
    ]}
    techStack={["n8n", "PostgreSQL", "Google Sheets", "PDF", "SMTP"]}
    pipelineAscii={`  ┌────────────┐    ┌──────────────┐    ┌──────────────┐    ┌────────────────┐
  │  Cron +    │───▶│  Postgres    │───▶│  Diff &      │───▶│  Sheets sync   │
  │  DB trig.  │    │  Query       │    │  Transform   │    │  + PDF email   │
  └────────────┘    └──────────────┘    └──────────────┘    └────────────────┘
        │                  │                    │                    │
        ▼                  ▼                    ▼                    ▼
   trigger fire     fresh dataset       reconciled rows       live sheet + PDF`}
    stages={[
      {
        id: "01",
        title: "Trigger & Query",
        subtitle: "Source Layer",
        tool: "Cron + Postgres",
        icon: Database,
        description:
          "The workflow fires on two paths: a frequent cron (every 5 minutes) for sync, and a database trigger (via LISTEN/NOTIFY) for instant pushes of high-priority tables. Both paths pull a fresh snapshot from Postgres.",
        steps: [
          "Cron every 5 min for routine sync",
          "Postgres LISTEN/NOTIFY for urgent tables",
          "Run parameterized SELECTs by table",
          "Tag each row with updated_at + hash",
        ],
        output: {
          label: "Output — Postgres snapshot",
          code: `{
  "table": "orders",
  "rows": [
    { "id": 1042, "customer": "Acme", "total": 1200.00, "updated_at": "2026-06-30T08:01:14Z" },
    { "id": 1043, "customer": "Globex", "total": 880.50, "updated_at": "2026-06-30T08:03:02Z" }
  ],
  "row_count": 2
}`,
        },
      },
      {
        id: "02",
        title: "Diff & Transform",
        subtitle: "Reconciliation Layer",
        tool: "Function nodes",
        icon: RefreshCw,
        description:
          "Each row is hashed and compared against the last-synced hash from Sheets. Only changed or new rows continue downstream; deletes are detected and routed to a soft-delete column. Field names and formats are normalized for the spreadsheet view.",
        steps: [
          "Compute content hash per row",
          "Compare with last-synced hashes",
          "Detect inserts, updates, deletes",
          "Normalize field names + currency format",
        ],
        output: {
          label: "Output — change set",
          code: `{
  "inserts": 3,
  "updates": 11,
  "deletes": 1,
  "rows": [
    { "op": "update", "id": 1042, "fields": { "total": "$1,200.00" } },
    { "op": "insert", "id": 1044, "fields": { "customer": "Initech", "total": "$540.00" } }
  ]
}`,
        },
      },
      {
        id: "03",
        title: "Bi-Directional Sheets Sync",
        subtitle: "Delivery Layer",
        tool: "Google Sheets API",
        icon: FileSpreadsheet,
        description:
          "Changes from Postgres are written into Sheets via batchUpdate. The reverse path watches Sheets edits (via Apps Script webhook) and pushes validated changes back into Postgres — with a conflict policy preferring whichever side has the newer updated_at.",
        steps: [
          "Apply change set via batchUpdate",
          "Watch Sheets edits via webhook",
          "Validate edits against table schema",
          "Resolve conflicts by updated_at",
        ],
        output: {
          label: "Output — sync result",
          code: `{
  "sheet_rows_written": 14,
  "db_rows_written": 2,
  "conflicts_resolved": 1,
  "duration_ms": 412
}`,
        },
      },
      {
        id: "04",
        title: "Weekly PDF Report",
        subtitle: "Reporting Layer",
        tool: "PDF + SMTP",
        icon: Mail,
        description:
          "Every Monday at 7AM, the workflow aggregates the week's data, renders charts + KPI tiles into an HTML template, converts the page to PDF, and emails the report to a configured stakeholder list with the raw Sheet linked for drill-down.",
        steps: [
          "Aggregate last 7 days from Postgres",
          "Render HTML template with charts + KPIs",
          "Convert HTML → PDF",
          "Email PDF + Sheet link to stakeholders",
        ],
        output: {
          label: "Output — report dispatch",
          code: `{
  "report_pdf": "weekly-report-2026-W26.pdf",
  "recipients": ["ceo@acme.co", "ops@acme.co"],
  "kpis": { "orders": 142, "revenue": "$184,200", "growth": "+8.4%" },
  "sent_at": "2026-06-30T07:01:08Z"
}`,
        },
      },
    ]}
    deliverables={[
      {
        icon: Eye,
        title: "Live operational visibility",
        desc: "Ops teams see fresh data in Sheets without waiting on engineering to build dashboards.",
      },
      {
        icon: Layers,
        title: "Safe two-way editing",
        desc: "Edits flow back into Postgres with schema validation and clean conflict resolution.",
      },
      {
        icon: Activity,
        title: "Weekly executive PDF",
        desc: "Branded report with KPIs and trends in every Monday inbox — no manual export needed.",
      },
    ]}
  />
);

export default DatabaseSyncReporting;
