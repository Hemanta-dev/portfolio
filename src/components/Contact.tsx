import { Mail, Phone, MapPin, Send, MessageSquare, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { motion } from "framer-motion";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = contactSchema.parse(formData);
      const response = await fetch("https://formspree.io/f/maqlwaek", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedData),
      });

      if (response.ok) {
        toast({ title: "Message Sent!", description: "Thank you! I'll get back to you soon." });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({ title: "Validation Error", description: error.errors[0].message, variant: "destructive" });
      } else {
        toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "adhikarihemanta932@gmail.com", href: "mailto:adhikarihemanta932@gmail.com" },
    { icon: Phone, label: "Phone", value: "+977 9742428957", href: "tel:+9779742428957" },
    { icon: MapPin, label: "Location", value: "Kathmandu, Nepal" },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 px-4 relative mesh-gradient">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-display">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            I'm always open to discussing new projects and opportunities
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {contactInfo.map((info, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="card-3d rounded-2xl p-5 group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <info.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-0.5">{info.label}</h3>
                    {info.href ? (
                      <a href={info.href} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group/link">
                        {info.value}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground">{info.value}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card-3d rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold mb-5 font-display">Send a Message</h3>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm text-foreground placeholder:text-muted-foreground"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm text-foreground placeholder:text-muted-foreground"
                required
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none text-sm text-foreground placeholder:text-muted-foreground"
                required
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 rounded-xl h-11 shadow-lg shadow-primary/20"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
