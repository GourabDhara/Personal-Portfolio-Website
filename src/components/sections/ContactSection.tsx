import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Send, MessageCircle, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ScrollReveal, StaggerContainer, StaggerItem, Magnetic } from "../ScrollReveal";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "dharagourab24@gmail.com",
    href: "mailto:dharagourab24@gmail.com",
  },
  {
    icon: MessageCircle,
    label: "Telegram",
    value: "Message on Telegram",
    href: "https://t.me/+G5-88QY0RH43NGM9",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Kolkata, India",
    href: null,
  },
];

export const ContactSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const orbY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon!",
    });
    
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="section-container bg-card/30 relative overflow-hidden">
      {/* Background orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[100px]"
        style={{ y: orbY }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-[100px]"
        style={{ y: orbY }}
      />

      <div ref={containerRef} className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal className="text-center mb-16">
          <h2 className="section-title">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Have a project in mind? Let's work together to bring your ideas to life.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <ScrollReveal direction="left" delay={0.1}>
            <h3 className="font-display text-xl font-semibold mb-8">
              Contact Information
            </h3>

            <StaggerContainer className="space-y-6" staggerDelay={0.1}>
              {contactInfo.map((item) => (
                <StaggerItem key={item.label}>
                  <Magnetic strength={0.1}>
                    {item.href ? (
                      <motion.a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="glass-card-hover p-6 flex items-center gap-4 block group"
                        whileHover={{ 
                          x: 8,
                          boxShadow: "0 15px 30px -10px hsl(var(--primary) / 0.2)",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div 
                          className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center"
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <item.icon className="h-6 w-6 text-primary group-hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)] transition-all" />
                        </motion.div>
                        <div>
                          <p className="text-sm text-muted-foreground">{item.label}</p>
                          <p className="font-medium group-hover:text-primary transition-colors">{item.value}</p>
                        </div>
                      </motion.a>
                    ) : (
                      <div className="glass-card p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                          <item.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{item.label}</p>
                          <p className="font-medium">{item.value}</p>
                        </div>
                      </div>
                    )}
                  </Magnetic>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <ScrollReveal delay={0.5}>
              <p className="mt-8 text-muted-foreground text-sm">
                Available for freelance projects and collaborations.
                <br />
                Let's create something amazing together!
              </p>
            </ScrollReveal>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal direction="right" delay={0.1}>
            <motion.div
              className="glass-card p-8 relative overflow-hidden"
              whileHover={{ 
                boxShadow: "0 25px 50px -15px hsl(var(--primary) / 0.15)",
              }}
              transition={{ duration: 0.4 }}
            >
              {/* Decorative gradient corner */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl" />
              
              <h3 className="font-display text-xl font-semibold mb-6 relative z-10">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <label htmlFor="name" className="text-sm text-muted-foreground mb-2 block">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-muted/50 border-glass-border focus:border-primary transition-all duration-300 focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.1)]"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <label htmlFor="email" className="text-sm text-muted-foreground mb-2 block">
                    Your Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-muted/50 border-glass-border focus:border-primary transition-all duration-300 focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.1)]"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <label htmlFor="message" className="text-sm text-muted-foreground mb-2 block">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="bg-muted/50 border-glass-border focus:border-primary resize-none transition-all duration-300 focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.1)]"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <Magnetic strength={0.08}>
                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full group"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <motion.span
                            className="flex items-center gap-2"
                            whileHover={{ x: -5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            Send Message
                          </motion.span>
                        </>
                      )}
                    </Button>
                  </Magnetic>
                </motion.div>
              </form>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
