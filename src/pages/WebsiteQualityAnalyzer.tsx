import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Bot,
  FileSpreadsheet,
  Zap,
  CheckCircle2,
  Mail,
  Gauge,
  Smartphone,
  Palette,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const stages = [
  {
    id: "01",
    title: "Google Maps Scraper",
    subtitle: "Data Acquisition Layer",
    tool: "Apify",
    icon: MapPin,
    color: "text-primary",
    description:
      "The workflow kicks off with a keyword + location pair (e.g. \"Dentist Manila\"). n8n calls an Apify actor that scrapes Google Maps results, handles pagination, and respects rate limits — returning a clean structured payload for every business found.",
    steps: [
      "Accept input: keyword + location",
      "Trigger Apify Google Maps actor via HTTP node",
      "Paginate through all result pages",
      "Throttle requests to avoid hitting rate limits",
      "Normalize the response into one row per business",
    ],
    output: {
      label: "Output — structured JSON per business",
      code: `[
  {
    "name": "Smile Dental Clinic",
    "website": "https://smiledentalph.com",
    "phone": "+63 917 555 0123",
    "address": "123 Ayala Ave, Makati, Manila",
    "rating": 4.6,
    "reviews": 218,
    "category": "Dentist"
  },
  ...
]`,
    },
  },
  {
    id: "02",
    title: "AI Website Analysis",
    subtitle: "Intelligence Layer",
    tool: "OpenAI GPT",
    icon: Bot,
    color: "text-accent",
    description:
      "For every business with a website, n8n fetches the page HTML, strips it down to meaningful content, then sends it to OpenAI with a structured scoring prompt. The model returns a JSON object scoring the site 0–10 across seven quality dimensions plus a contact email if one is found.",
    steps: [
      "HTTP Request node fetches the website HTML",
      "Clean & truncate content to fit the context window",
      "Send to OpenAI with a strict JSON-schema prompt",
      "Score 7 dimensions on a 0–10 scale",
      "Extract any business email surfaced on the page",
      "Compute a weighted overall score",
    ],
    output: {
      label: "Output — AI scoring object",
      code: `{
  "modernity": 6.5,
  "mobile_friendly": 8.0,
  "design_quality": 7.0,
  "performance": 5.5,
  "branding": 6.0,
  "seo": 4.5,
  "content_quality": 7.5,
  "overall_score": 6.43,
  "email_found": "hello@smiledentalph.com",
  "notes": "Outdated hero, missing meta description, no schema markup."
}`,
    },
  },
  {
    id: "03",
    title: "Report Generation",
    subtitle: "Delivery Layer",
    tool: "Google Sheets API",
    icon: FileSpreadsheet,
    color: "text-primary",
    description:
      "Final stage merges scraped business data with AI scores into a clean row, formats fields (phone numbers prefixed with an apostrophe so Excel doesn't corrupt them), and appends to a Google Sheet. Columns are auto-formatted for readability so the sheet becomes a live, ready-to-use dashboard.",
    steps: [
      "Merge scraper output + AI scores into a single row",
      "Prefix phone numbers with `'` to prevent Excel corruption",
      "Map fields to the target sheet columns",
      "Append rows via Google Sheets API",
      "Apply conditional formatting (color scale on Overall)",
    ],
    output: {
      label: "Output — Google Sheets row",
      code: `Business           | Website                  | Phone           | Rating | Modern | Mobile | Design | Perf | Brand | SEO | Content | Overall | Email
Smile Dental Clinic | https://smiledentalph.com | '+63 917 555 0123 | 4.6   | 6.5    | 8.0    | 7.0    | 5.5  | 6.0   | 4.5 | 7.5     | 6.43    | hello@smiledentalph.com`,
    },
  },
];

const metrics = [
  { icon: Sparkles, label: "Modernity", desc: "Design trends, current frameworks, visual freshness" },
  { icon: Smartphone, label: "Mobile-Friendly", desc: "Responsive layout, touch targets, viewport" },
  { icon: Palette, label: "Design Quality", desc: "Hierarchy, spacing, typography, color use" },
  { icon: Gauge, label: "Performance", desc: "Load weight, render hints, image optimization" },
  { icon: TrendingUp, label: "Branding", desc: "Consistent voice, logo, identity system" },
  { icon: Search, label: "SEO", desc: "Meta tags, headings, structured data, alt text" },
  { icon: CheckCircle2, label: "Content Quality", desc: "Clarity, value, completeness of copy" },
];

const WebsiteQualityAnalyzer = () => (
  <div className="min-h-screen bg-background">
    {/* Header */}
    <header className="border-b border-border/50 sticky top-0 z-50 backdrop-blur-xl bg-background/70">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/#automations"
          className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          back to portfolio
        </Link>
        <span className="font-mono text-xs text-muted-foreground">case-study / 01</span>
      </div>
    </header>

    {/* Hero */}
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span className="font-mono text-xs text-primary">n8n automation walkthrough</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
            Website Quality{" "}
            <span className="text-primary">Analyzer</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-8">
            An end-to-end n8n pipeline that scrapes business listings from Google Maps, analyzes
            every website with AI across 7 quality metrics, and ships a ready-to-use scoring
            dashboard to Google Sheets — turning days of manual audits into minutes of automated
            output.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Businesses analyzed", value: "4,300+" },
              { label: "Hours saved", value: "500+" },
              { label: "Faster than manual", value: "240x" },
              { label: "Quality metrics", value: "7" },
            ].map((s) => (
              <div key={s.label} className="glass-card p-4">
                <div className="font-display text-2xl font-bold text-primary">{s.value}</div>
                <div className="font-mono text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-8">
            {["n8n", "Apify", "OpenAI GPT", "Google Sheets API", "HTTP Request"].map((t) => (
              <span
                key={t}
                className="text-xs font-mono px-3 py-1.5 rounded bg-secondary text-primary border border-primary/20"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    {/* Workflow diagram */}
    <section className="py-12 border-y border-border/50 bg-secondary/20">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="font-mono text-xs text-muted-foreground mb-4">{"// pipeline overview"}</div>
        <div className="glass-card p-6 overflow-x-auto">
          <pre className="font-mono text-xs md:text-sm text-muted-foreground leading-relaxed">
{`  ┌─────────────┐    ┌──────────────┐    ┌──────────────┐    ┌────────────────┐
  │  Input:     │───▶│  Apify       │───▶│  OpenAI GPT  │───▶│  Google Sheets │
  │  keyword +  │    │  Maps Scrape │    │  7-metric    │    │  Formatted     │
  │  location   │    │  + paginate  │    │  scoring     │    │  dashboard     │
  └─────────────┘    └──────────────┘    └──────────────┘    └────────────────┘
        │                   │                    │                    │
        ▼                   ▼                    ▼                    ▼
   trigger node       structured JSON      score + email         live report`}
          </pre>
        </div>
      </div>
    </section>

    {/* Detailed stages */}
    <section className="py-20">
      <div className="container mx-auto px-6 max-w-5xl space-y-16">
        {stages.map((stage, i) => (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="grid md:grid-cols-[auto,1fr] gap-6"
          >
            {/* Step rail */}
            <div className="flex md:flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <stage.icon className={`w-7 h-7 ${stage.color}`} />
              </div>
              <div className="hidden md:block w-px flex-1 bg-border" />
            </div>

            <div className="glass-card glow-border p-6 md:p-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-sm text-primary">{stage.id}</span>
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                  {stage.subtitle}
                </span>
              </div>
              <div className="flex flex-wrap items-baseline gap-3 mb-4">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  {stage.title}
                </h2>
                <span className="font-mono text-xs px-2 py-1 rounded bg-secondary text-primary">
                  {stage.tool}
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">{stage.description}</p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="font-mono text-xs text-muted-foreground mb-3">
                    {"// workflow steps"}
                  </div>
                  <ul className="space-y-2">
                    {stage.steps.map((s, idx) => (
                      <li key={s} className="flex items-start gap-2 text-sm text-foreground/90">
                        <span className="font-mono text-xs text-primary mt-0.5">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="font-mono text-xs text-muted-foreground mb-3">
                    {"// " + stage.output.label}
                  </div>
                  <pre className="bg-secondary/40 border border-border/50 rounded-lg p-4 font-mono text-[11px] leading-relaxed text-foreground/80 overflow-x-auto">
                    {stage.output.code}
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Scoring metrics */}
    <section className="py-20 border-t border-border/50 bg-secondary/10">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="font-mono text-sm text-primary mb-2">{"// scoring model"}</div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          7 metrics, weighted overall score
        </h2>
        <p className="text-muted-foreground max-w-2xl mb-10">
          Every website is graded on a 0–10 scale across the dimensions below. The overall score is
          a weighted average tuned to reflect what actually drives business outcomes.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((m) => (
            <div key={m.label} className="glass-card p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded bg-primary/10 flex items-center justify-center">
                  <m.icon className="w-4.5 h-4.5 text-primary" />
                </div>
                <h3 className="font-display text-base font-semibold text-foreground">{m.label}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Final output */}
    <section className="py-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="font-mono text-sm text-primary mb-2">{"// what you receive"}</div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-10">
          Deliverables
        </h2>

        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: FileSpreadsheet,
              title: "Live Google Sheet",
              desc: "Auto-updating dashboard with every business, all 7 scores, weighted overall, and conditional formatting.",
            },
            {
              icon: Mail,
              title: "Outreach-ready leads",
              desc: "Businesses with low scores + extracted emails — a qualified list for cold outreach or pitches.",
            },
            {
              icon: Bot,
              title: "Reusable n8n template",
              desc: "Cloneable workflow you can re-run for any niche + city combination on demand or on a schedule.",
            },
          ].map((d) => (
            <div key={d.title} className="glass-card glow-border p-6">
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <d.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {d.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 border-t border-border/50">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          Want a custom automation like this?
        </h2>
        <p className="text-muted-foreground mb-8">
          I build n8n pipelines that connect APIs, AI models, and your existing tools into
          workflows that quietly replace hours of manual work.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            to="/#contact"
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-mono text-sm hover:bg-primary/90 transition-colors"
          >
            Start a project →
          </Link>
          <Link
            to="/#automations"
            className="px-6 py-3 rounded-lg border border-border text-foreground font-mono text-sm hover:bg-secondary transition-colors"
          >
            See other automations
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default WebsiteQualityAnalyzer;
