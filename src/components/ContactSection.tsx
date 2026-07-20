import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email is too long"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message is too long"),
}).required();


const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const parsed = contactSchema.safeParse(formData);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check your inputs.");
      return;
    }

    setLoading(true);
    try {
      const { name, email, message } = parsed.data;
      const { error: insertError } = await supabase
        .from("contact_messages")
        .insert({ name, email, message });


      if (insertError) throw insertError;

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 6000);
    } catch (err) {
      console.error("Failed to submit contact message:", err);
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-primary text-sm">06.</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Get In Touch</h2>
            <div className="h-px flex-1 bg-border max-w-xs" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mt-12">
            <div className="space-y-8">
              <p className="text-muted-foreground text-lg leading-relaxed">
                Got a project in mind? Looking for a fresh developer eager to build{" "}
                <span className="text-primary">and</span> automate? Let's talk about how I can help
                bring your vision to life with clean code and smart AI-powered workflows.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="font-mono text-sm">elijarodriguez1@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="font-mono text-sm">San Jose Del Monte, Bulacan </span>
                </div>
              </div>

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

            <form className="glass-card glow-border p-6 md:p-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="contact-name" className="font-mono text-sm text-muted-foreground mb-2 block">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Juan Dela Cruz"
                  maxLength={100}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground font-body placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="font-mono text-sm text-muted-foreground mb-2 block">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="juan@company.com"
                  maxLength={255}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground font-body placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="font-mono text-sm text-muted-foreground mb-2 block">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell me about your project..."
                  maxLength={2000}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground font-body placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                />
              </div>

              {error && (
                <div className="w-full px-4 py-3 rounded-lg bg-destructive/10 border border-destructive/40 text-destructive font-mono text-xs">
                  {error}
                </div>
              )}

              {submitted ? (
                <div className="w-full px-6 py-3 rounded-lg bg-primary/15 border border-primary/50 text-primary font-mono font-semibold text-sm text-center">
                  ✓ Message received! I'll get back to you soon.
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
