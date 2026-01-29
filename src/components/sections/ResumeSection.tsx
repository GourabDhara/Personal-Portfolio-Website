import { motion } from "framer-motion";
import { Download, FileText, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollReveal, Magnetic } from "../ScrollReveal";

export const ResumeSection = () => {
  return (
    <section className="section-container relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <ScrollReveal>
          <motion.div
            className="glass-card p-8 md:p-12 text-center relative overflow-hidden group"
            whileHover={{ 
              boxShadow: "0 30px 60px -20px hsl(var(--primary) / 0.2)",
            }}
            transition={{ duration: 0.4 }}
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.1) 0%, transparent 70%)",
              }}
            />

            {/* Floating particles */}
            <motion.div
              className="absolute top-4 right-4"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 10, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="h-6 w-6 text-primary/30" />
            </motion.div>
            <motion.div
              className="absolute bottom-4 left-4"
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, -10, 0],
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            >
              <Sparkles className="h-5 w-5 text-secondary/30" />
            </motion.div>

            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center relative"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-secondary blur-xl opacity-50" />
              <FileText className="h-10 w-10 text-primary-foreground relative z-10" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-display text-2xl md:text-3xl font-bold mb-4 relative z-10"
            >
              Download My <span className="gradient-text">Resume</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-muted-foreground mb-8 max-w-xl mx-auto relative z-10"
            >
              Get a comprehensive overview of my skills, experience, and projects
              in a downloadable format.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative z-10"
            >
              <Magnetic strength={0.1}>
                <Button variant="hero" size="lg" asChild className="group/btn">
                  <a
                    href="/Resume.pdf"
                    download="Gourab_Dhara_Resume.pdf"
                  >
                    <motion.span
                      className="flex items-center gap-2"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Download className="h-5 w-5 group-hover/btn:animate-bounce" />
                      Download Resume
                    </motion.span>
                  </a>
                </Button>
              </Magnetic>
            </motion.div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
};
