import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Zap, type LucideIcon } from "lucide-react";

export interface WalkthroughStage {
  id: string;
  title: string;
  subtitle: string;
  tool: string;
  icon: LucideIcon;
  color?: string;
  description: string;
  steps: string[];
  output: { label: string; code: string };
}

export interface WalkthroughDeliverable {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface AutomationWalkthroughProps {
  caseId: string;
  title: string;
  highlight: string;
  intro: string;
  stats: { label: string; value: string }[];
  techStack: string[];
  pipelineAscii: string;
  stages: WalkthroughStage[];
  deliverables: WalkthroughDeliverable[];
}

const AutomationWalkthrough = ({
  caseId,
  title,
  highlight,
  intro,
  stats,
  techStack,
  pipelineAscii,
  stages,
  deliverables,
}: AutomationWalkthroughProps) => (
  <div className="min-h-screen bg-background">
    <header className="border-b border-border/50 sticky top-0 z-50 backdrop-blur-xl bg-background/70">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/#automations"
          className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          back to portfolio
        </Link>
        <span className="font-mono text-xs text-muted-foreground">case-study / {caseId}</span>
      </div>
    </header>

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
            {title} <span className="text-primary">{highlight}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-8">{intro}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="glass-card p-4">
                <div className="font-display text-2xl font-bold text-primary">{s.value}</div>
                <div className="font-mono text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-8">
            {techStack.map((t) => (
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

    <section className="py-12 border-y border-border/50 bg-secondary/20">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="font-mono text-xs text-muted-foreground mb-4">{"// pipeline overview"}</div>
        <div className="glass-card p-6 overflow-x-auto">
          <pre className="font-mono text-xs md:text-sm text-muted-foreground leading-relaxed">
            {pipelineAscii}
          </pre>
        </div>
      </div>
    </section>

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
            <div className="flex md:flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <stage.icon className={`w-7 h-7 ${stage.color ?? "text-primary"}`} />
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

              <div className="grid md:grid-cols-2 gap-4 mb-2">
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

    <section className="py-20 border-t border-border/50 bg-secondary/10">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="font-mono text-sm text-primary mb-2">{"// what you receive"}</div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-10">
          Deliverables
        </h2>

        <div className="grid md:grid-cols-3 gap-5">
          {deliverables.map((d) => (
            <div key={d.title} className="glass-card glow-border p-6">
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <d.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{d.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

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

export default AutomationWalkthrough;
