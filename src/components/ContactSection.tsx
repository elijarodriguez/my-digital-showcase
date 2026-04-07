import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    // Initialize EmailJS with your Public Key
    emailjs.init("V-InWBwwGQNbOrl7OOUR_PUBLIC_KEY");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send("service_uj2kcjl", "template_hjq9ekg", {
        to_email: "elijarodriguez1@gmail.com",
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      });

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
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
                <span className="font-mono text-sm">elijarodriguez1@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="font-mono text-sm">Malolos, Bulacan </span>
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
          <form className="glass-card glow-border p-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="font-mono text-sm text-muted-foreground mb-2 block">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground font-body placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div>
              <label className="font-mono text-sm text-muted-foreground mb-2 block">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@company.com"
                required
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground font-body placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div>
              <label className="font-mono text-sm text-muted-foreground mb-2 block">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Tell me about your project..."
                required
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground font-body placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors resize-none"
              />
            </div>
            {submitted ? (
              <div className="w-full px-6 py-3 rounded-lg bg-green-500/20 border border-green-500/50 text-green-400 font-mono font-semibold text-sm text-center">
                ✓ Message sent! I'll get back to you soon.
              </div>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-mono font-semibold text-sm hover:shadow-[0_0_30px_-5px_hsl(175_80%_50%/0.4)] transition-all duration-300 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {loading ? "Sending..." : "Send Message"}
              </button>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  </section>
  );
};

export default ContactSection;
