import { motion } from "framer-motion";
import { Code2, Brain, Layers, Zap } from "lucide-react";

const highlights = [
  { icon: Code2, label: "Full Stack", desc: "End-to-end web development" },
  { icon: Zap, label: "Automation", desc: "n8n workflows & integrations" },
  { icon: Brain, label: "AI-Powered", desc: "Smart logic & enrichment" },
  { icon: Layers, label: "Scalable", desc: "Production-ready systems" },
];

const skills = [
  { category: "Frontend", items: ["React", "TypeScript", "Next.js", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Python", "MySQL", "PHP"] },
  { category: "Automation", items: ["n8n", "Webhooks", "REST APIs", "Cron Jobs"] },
  { category: "AI / ML", items: ["OpenAI API", "Prompt Engineering", "AI Agents"] },
  { category: "DevOps", items: ["Docker", "CI/CD Pipeline", "Git"] },
];

const AboutSection = () => (
  <section id="about" className="py-24 relative">
    <div className="absolute inset-0 dot-bg opacity-20" />
    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-primary text-sm">01.</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">About Me</h2>
          <div className="h-px flex-1 bg-border max-w-xs" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mt-12">
          {/* Left: Bio */}
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed text-lg">
              I'm a fresh Computer Engineering graduate with a strong foundation in full stack
              development and a growing specialization in{" "}
              <span className="text-primary font-semibold">automation engineering</span> using n8n.
              I build websites, web apps, and the workflows that connect tools behind the scenes.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I may be early in my career, but I bring clean engineering habits, curiosity, and a
              genuine drive to solve real problems. Whether it's a custom dashboard or an n8n workflow
              that saves hours every week, I'm ready to{" "}
              <span className="text-primary font-semibold">collaborate, learn, and deliver</span>{" "}
              alongside clients and teams.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm">
              {/* Currently open to freelance, internship, and entry-level opportunities where I can contribute and grow. */}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              {highlights.map((h) => (
                <div key={h.label} className="glass-card glow-border p-4 flex items-center gap-3">
                  <h.icon className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <p className="font-mono text-sm font-semibold text-foreground">{h.label}</p>
                    <p className="text-xs text-muted-foreground">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Skills */}
          <div className="space-y-6">
            {skills.map((group) => (
              <div key={group.category}>
                <h3 className="font-mono text-sm text-primary mb-3">
                  {"// "}{group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm font-mono rounded-md bg-secondary border border-border text-foreground hover:border-primary/50 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default AboutSection;
