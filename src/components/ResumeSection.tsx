import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Download } from "lucide-react";

interface TimelineItem {
  type: "work" | "education";
  title: string;
  company: string;
  period: string;
  description: string;
  tags?: string[];
}

const timeline: TimelineItem[] = [
  {
    type: "education",
    title: "BS Computer Engineering",
    company: "Bulacan State University",
    period: "2022 — 2026",
    description: "Relevant coursework, thesis topic, or notable achievements during your degree.",
    tags: ["Software Engineering", "AI/ML"],
  }
];

const ResumeSection = () => (
  <section id="resume" className="py-24 relative">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-primary text-sm">04.</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Experience</h2>
            <div className="h-px flex-1 bg-border max-w-xs" />
          </div>

          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary/50 text-primary font-mono text-sm hover:bg-primary/10 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download CV
          </a>
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

        <div className="space-y-12">
          {timeline.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={item.title + item.company}
                initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start gap-6 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background -translate-x-1.5 mt-6 z-10" />

                {/* Spacer for the other side */}
                <div className="hidden md:block md:w-1/2" />

                {/* Card */}
                <div className={`ml-14 md:ml-0 md:w-1/2 ${isLeft ? "md:pr-12" : "md:pl-12"}`}>
                  <div className="glass-card glow-border p-6">
                    <div className="flex items-center gap-2 mb-2">
                      {item.type === "work" ? (
                        <Briefcase className="w-4 h-4 text-primary" />
                      ) : (
                        <GraduationCap className="w-4 h-4 text-accent" />
                      )}
                      <span className="font-mono text-xs text-muted-foreground">{item.period}</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="font-mono text-sm text-primary mb-3">{item.company}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{item.description}</p>
                    {item.tags && (
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span key={tag} className="text-xs font-mono px-2 py-1 rounded bg-secondary text-primary">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default ResumeSection;
