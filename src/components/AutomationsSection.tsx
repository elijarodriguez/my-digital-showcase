import { motion } from "framer-motion";
import { Workflow, Zap, GitBranch, Mail, Database, Bot, MapPin } from "lucide-react";

interface Automation {
  title: string;
  description: string;
  trigger: string;
  steps: string[];
  outcome: string;
  tags: string[];
  icon: typeof Workflow;
}

const automations: Automation[] = [
  {
    title: "Lead Capture → CRM Sync",
    description:
      "Automatically capture form leads, enrich them with AI, and push to CRM with Slack notifications.",
    trigger: "Webhook (Form submission)",
    steps: ["Validate payload", "Enrich with OpenAI", "Create CRM contact", "Notify Slack channel"],
    outcome: "Saved ~10 hrs/week of manual data entry",
    tags: ["n8n", "OpenAI", "HubSpot", "Slack"],
    icon: Mail,
  },
  {
    title: "AI Content Pipeline",
    description:
      "Schedule-driven workflow that drafts, reviews, and publishes content across multiple channels.",
    trigger: "Cron (Daily 8AM)",
    steps: ["Fetch trending topics", "Generate draft (GPT)", "Human approval step", "Auto-publish"],
    outcome: "3x content output with consistent quality",
    tags: ["n8n", "OpenAI", "Notion", "WordPress"],
    icon: Bot,
  },
  {
    title: "Database Sync & Reporting",
    description:
      "Bi-directional sync between Postgres and Google Sheets with automated weekly reports.",
    trigger: "Cron + Database trigger",
    steps: ["Query Postgres", "Transform data", "Update Sheets", "Email PDF report"],
    outcome: "Real-time visibility for non-technical teams",
    tags: ["n8n", "PostgreSQL", "Google Sheets"],
    icon: Database,
  },
  {
    title: "Multi-Step Approval Workflow",
    description:
      "Conditional logic-driven approval chain with branching paths based on request type and amount.",
    trigger: "Webhook (Internal app)",
    steps: ["Classify request", "Route to approver", "Wait for response", "Execute action"],
    outcome: "Approval time cut from days to hours",
    tags: ["n8n", "Conditional Logic", "Email"],
    icon: GitBranch,
  },
];

const AutomationsSection = () => (
  <section id="automations" className="py-24 relative">
    <div className="absolute inset-0 grid-bg opacity-20" />
    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-primary text-sm">04.</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Automation Workflows
          </h2>
          <div className="h-px flex-1 bg-border max-w-xs" />
        </div>
        <p className="text-muted-foreground max-w-2xl mt-4 mb-12">
          I design and ship production-grade automations with{" "}
          <span className="text-primary font-semibold">n8n</span> — connecting APIs, AI models,
          databases, and internal tools into reliable workflows that replace manual work.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {automations.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass-card glow-border p-6 group hover:bg-card/80 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <a.icon className="w-6 h-6 text-primary" />
              </div>
              <Workflow className="w-5 h-5 text-muted-foreground/40" />
            </div>

            <h3 className="font-display text-xl font-semibold text-foreground mb-2">{a.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5">{a.description}</p>

            {/* Workflow visualization */}
            <div className="bg-secondary/40 border border-border/50 rounded-lg p-4 mb-4 font-mono text-xs">
              <div className="flex items-center gap-2 text-primary mb-3">
                <Zap className="w-3 h-3" />
                <span>{a.trigger}</span>
              </div>
              <div className="space-y-1.5 ml-1">
                {a.steps.map((step, idx) => (
                  <div key={step} className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-primary/60">{String(idx + 1).padStart(2, "0")}</span>
                    <span className="w-3 h-px bg-border" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-xs text-accent font-mono mb-4">
              {"// "} {a.outcome}
            </div>

            <div className="flex flex-wrap gap-2">
              {a.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono px-2 py-1 rounded bg-secondary text-primary"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-10 text-center"
      >
        <p className="text-sm text-muted-foreground font-mono">
          {"// "}Need a custom automation?{" "}
          <a href="#contact" className="text-primary hover:underline">
            Let's build it →
          </a>
        </p>
      </motion.div>
    </div>
  </section>
);

export default AutomationsSection;
