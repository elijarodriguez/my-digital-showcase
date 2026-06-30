import {
  Clock,
  TrendingUp,
  PenLine,
  UserCheck,
  Send,
  FileText,
  Repeat,
  Layers,
} from "lucide-react";
import AutomationWalkthrough from "@/components/AutomationWalkthrough";

const AiContentPipeline = () => (
  <AutomationWalkthrough
    caseId="03"
    title="AI Content"
    highlight="Pipeline"
    intro="A cron-driven n8n workflow that finds trending topics in your niche each morning, drafts long-form content with GPT, pauses for human approval, then publishes the approved post across Notion and WordPress — keeping a consistent voice while tripling output."
    stats={[
      { label: "Output increase", value: "3x" },
      { label: "Runs", value: "Daily 8AM" },
      { label: "Channels", value: "Notion + WP" },
      { label: "Human in loop", value: "Yes" },
    ]}
    techStack={["n8n", "Cron", "OpenAI", "Notion", "WordPress"]}
    pipelineAscii={`  ┌────────────┐    ┌──────────────┐    ┌──────────────┐    ┌────────────────┐
  │  Cron 8AM  │───▶│  Trend       │───▶│  GPT Draft   │───▶│  Approve →     │
  │  Trigger   │    │  Discovery   │    │  + outline   │    │  Auto-publish  │
  └────────────┘    └──────────────┘    └──────────────┘    └────────────────┘
        │                  │                    │                    │
        ▼                  ▼                    ▼                    ▼
   schedule fire    topic shortlist      draft + meta        live post URL`}
    stages={[
      {
        id: "01",
        title: "Trend Discovery",
        subtitle: "Research Layer",
        tool: "HTTP + RSS",
        icon: TrendingUp,
        description:
          "Each morning the workflow polls a configured set of sources (RSS feeds, Reddit JSON endpoints, Google Trends RSS) and ranks topics by recency + signal strength, returning a shortlist with raw context attached.",
        steps: [
          "Cron triggers at 08:00 local time",
          "Fetch from RSS, Reddit, Google Trends",
          "Deduplicate against published topics log",
          "Rank by recency + engagement signal",
        ],
        output: {
          label: "Output — topic shortlist",
          code: `[
  {
    "topic": "Self-hosting n8n on a $5 VPS",
    "score": 0.87,
    "sources": ["reddit.com/r/selfhosted", "news.ycombinator.com"],
    "context": "Multiple threads this week on cost-saving setups."
  },
  ...
]`,
        },
      },
      {
        id: "02",
        title: "GPT Draft Generation",
        subtitle: "Authoring Layer",
        tool: "OpenAI GPT",
        icon: PenLine,
        description:
          "The top-ranked topic is fed into OpenAI with a style guide and tone-of-voice prompt, producing a structured draft: title, meta description, outline, full body in Markdown, and 3 social hooks.",
        steps: [
          "Pick the top-scoring topic",
          "Inject brand voice + style guide",
          "Generate title, meta, outline, body",
          "Generate 3 social-media hook variants",
        ],
        output: {
          label: "Output — draft object",
          code: `{
  "title": "How I run n8n on a $5 VPS (and you can too)",
  "meta": "Step-by-step setup for self-hosting n8n cheaply...",
  "outline": ["Why self-host", "Provisioning the VPS", "Docker setup", "..."],
  "body_md": "# How I run n8n on a $5 VPS\\n\\n...",
  "hooks": ["Stop paying for n8n cloud.", "...", "..."]
}`,
        },
      },
      {
        id: "03",
        title: "Human Approval",
        subtitle: "Quality Gate",
        tool: "n8n Wait + Notion",
        icon: UserCheck,
        description:
          "The draft is pushed into a Notion review board and the workflow pauses on a Wait node. A reviewer can edit, approve, or reject from Notion — and the workflow resumes the moment the status flips to Approved.",
        steps: [
          "Create review page in Notion",
          "Set status: Pending Review",
          "Pause workflow on Wait node",
          "Resume on status change → Approved",
        ],
        output: {
          label: "Output — approved draft",
          code: `{
  "status": "approved",
  "reviewer": "John Elija",
  "edits_applied": 4,
  "final_md": "# How I run n8n on a $5 VPS\\n\\n...",
  "approved_at": "2026-06-30T09:42:11Z"
}`,
        },
      },
      {
        id: "04",
        title: "Multi-Channel Publish",
        subtitle: "Delivery Layer",
        tool: "WordPress + Notion",
        icon: Send,
        description:
          "Approved content is converted from Markdown to HTML, published as a WordPress post with the generated meta + featured image, archived in a Notion 'Published' database, and the social hooks are queued for posting.",
        steps: [
          "Convert Markdown → HTML",
          "Publish to WordPress with meta + image",
          "Archive into Notion 'Published' DB",
          "Queue social hooks for posting",
        ],
        output: {
          label: "Output — publish result",
          code: `{
  "wordpress_post_id": 4821,
  "url": "https://blog.example.com/n8n-on-a-5-dollar-vps",
  "notion_archive_id": "p_8f3a...",
  "hooks_queued": 3
}`,
        },
      },
    ]}
    deliverables={[
      {
        icon: FileText,
        title: "Always-fresh content engine",
        desc: "A new high-quality draft waiting in Notion every morning, ready in minutes of editing.",
      },
      {
        icon: Layers,
        title: "Consistent brand voice",
        desc: "Style guide baked into the prompt — drafts sound like you, not like a generic chatbot.",
      },
      {
        icon: Repeat,
        title: "Reusable across niches",
        desc: "Swap sources + style guide and the same pipeline serves a completely different brand.",
      },
    ]}
  />
);

export default AiContentPipeline;
