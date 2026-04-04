import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";

const ContactSection = () => (
  <section id="contact" className="py-24 relative">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-primary text-sm">05.</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Get In Touch</h2>
          <div className="h-px flex-1 bg-border max-w-xs" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mt-12">
          <div className="space-y-8">
            <p className="text-muted-foreground text-lg leading-relaxed">
              Got a project in mind? Looking for a developer who can build{" "}
              <span className="text-primary">and</span> think? Let's talk about how I can help bring
              your vision to life with clean code and smart AI integration.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary" />
                <span className="font-mono text-sm">your.email@example.com</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="font-mono text-sm">Your Location</span>
              </div>
            </div>

            {/* Terminal-style CTA */}
            <div className="glass-card p-4 font-mono text-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full bg-destructive/60" />
                <span className="w-3 h-3 rounded-full" style={{ background: "hsl(45 80% 50% / 0.6)" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "hsl(140 60% 45% / 0.6)" }} />
              </div>
              <p className="text-muted-foreground">
                <span className="text-primary">$</span> echo "Let's build something amazing"
              </p>
              <p className="text-foreground mt-1">Let's build something amazing</p>
            </div>
          </div>

          {/* Contact form */}
          <form
            className="glass-card glow-border p-8 space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label className="font-mono text-sm text-muted-foreground mb-2 block">Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground font-body placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div>
              <label className="font-mono text-sm text-muted-foreground mb-2 block">Email</label>
              <input
                type="email"
                placeholder="john@company.com"
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground font-body placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div>
              <label className="font-mono text-sm text-muted-foreground mb-2 block">Message</label>
              <textarea
                rows={4}
                placeholder="Tell me about your project..."
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground font-body placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-mono font-semibold text-sm hover:shadow-[0_0_30px_-5px_hsl(175_80%_50%/0.4)] transition-all duration-300"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  </section>
);

export default ContactSection;
