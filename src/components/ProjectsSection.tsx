import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  liveUrl?: string;
  repoUrl?: string;
}

const projects: Project[] = [
  {
    title: "INCIQ Web Application",
    description: "Brief description of the web development project, what problem it solved, and what tech stack you used. Replace this with your actual project.",
    tags: ["React", "Node.js", "AI Integration"],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Another Project",
    description: "Describe another website or application you built. Highlight the AI or smart features you implemented.",
    tags: ["Next.js", "PostgreSQL", "OpenAI"],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Your Third Project",
    description: "Add details about your third project here. Focus on the impact and results you achieved for the client.",
    tags: ["TypeScript", "Tailwind", "Docker"],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Add More Projects",
    description: "Keep adding your recent works here. Each card is a template — replace the content with your real projects.",
    tags: ["React", "AI", "Full Stack"],
    liveUrl: "#",
    repoUrl: "#",
  },
];

const ProjectsSection = () => (
  <section id="projects" className="py-24 relative">
    <div className="absolute inset-0 dot-bg opacity-20" />
    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-primary text-sm">03.</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Recent Work</h2>
          <div className="h-px flex-1 bg-border max-w-xs" />
        </div>
        <p className="text-muted-foreground max-w-xl mt-4 mb-12">
          A selection of projects I've built — websites, web apps, and AI-enhanced solutions.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass-card glow-border overflow-hidden group"
          >
            {/* Placeholder image area */}
            <div className="h-48 bg-secondary/50 flex items-center justify-center border-b border-border/50 overflow-hidden">
              <div className="text-center">
                <div className="font-mono text-sm text-muted-foreground mb-2">
                  {"// screenshot or preview"}
                </div>
                <span className="text-xs text-muted-foreground/60">
                  Replace with project screenshot
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <div className="flex gap-2">
                  {project.repoUrl && (
                    <a href={project.repoUrl} className="text-muted-foreground hover:text-primary transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} className="text-muted-foreground hover:text-primary transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs font-mono px-2 py-1 rounded bg-secondary text-primary">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
