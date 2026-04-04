import { motion } from "framer-motion";
import { Globe, Bot, Database, Palette, BarChart3, Shield } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    desc: "Full stack websites and web apps built with modern frameworks. From landing pages to complex SaaS platforms.",
    tags: ["React", "Next.js", "Node.js"],
  },
  {
    icon: Bot,
    title: "AI Integration",
    desc: "Embed intelligent features into your products — chatbots, content generation, smart search, and automated workflows.",
    tags: ["OpenAI", "LangChain", "RAG"],
  },
  {
    icon: Database,
    title: "Backend & APIs",
    desc: "Robust server-side architecture, RESTful APIs, database design, and cloud infrastructure setup.",
    tags: ["PostgreSQL", "AWS", "Docker"],
  },
  {
    icon: Palette,
    title: "UI/UX Engineering",
    desc: "Pixel-perfect interfaces with smooth animations and responsive design that works everywhere.",
    tags: ["Tailwind", "Figma", "Motion"],
  },
  {
    icon: BarChart3,
    title: "Data Dashboards",
    desc: "Interactive analytics dashboards with real-time data visualization and AI-powered insights.",
    tags: ["Recharts", "D3", "Analytics"],
  },
  {
    icon: Shield,
    title: "Technical Consulting",
    desc: "Architecture reviews, tech stack recommendations, and AI strategy planning for your team.",
    tags: ["Strategy", "Review", "Planning"],
  },
];

const ServicesSection = () => (
  <section id="services" className="py-24 relative">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-primary text-sm">02.</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Services</h2>
          <div className="h-px flex-1 bg-border max-w-xs" />
        </div>
        <p className="text-muted-foreground max-w-xl mt-4 mb-12">
          What I bring to the table — engineering solutions enhanced with AI, so your product stays ahead.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass-card glow-border p-6 group hover:bg-card/80 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <s.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">{s.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">{s.desc}</p>
            <div className="flex flex-wrap gap-2">
              {s.tags.map((t) => (
                <span key={t} className="text-xs font-mono px-2 py-1 rounded bg-secondary text-primary">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
