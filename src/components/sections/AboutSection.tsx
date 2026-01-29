import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin, Briefcase, GraduationCap, Languages } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem, Parallax } from "../ScrollReveal";

const infoItems = [
  { icon: Briefcase, label: "Role", value: "UI/UX & Graphic Designer" },
  { icon: GraduationCap, label: "Education", value: "B.Tech in CSE" },
  { icon: Languages, label: "Languages", value: "English, Hindi, Bengali" },
  { icon: MapPin, label: "Location", value: "Kolkata, India" },
];

const stats = [
  { number: "4+", label: "Years Experience" },
  { number: "10+", label: "Projects Completed" },
  { number: "400+", label: "Designs Created" },
  { number: "50+", label: "Happy Clients" },
];

export const AboutSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section id="about" className="section-container relative overflow-hidden">
      {/* Parallax background elements */}
      <motion.div
        className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"
        style={{ y: backgroundY }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/5 rounded-full blur-[100px]"
        style={{ y: backgroundY }}
      />

      <div ref={containerRef} className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal className="text-center mb-16">
          <h2 className="section-title">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Passionate about creating digital experiences that matter
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left" delay={0.1}>
            <motion.div
              className="glass-card-hover p-8 relative group"
              whileHover={{ 
                boxShadow: "0 20px 40px -20px hsl(var(--primary) / 0.2)",
                transition: { duration: 0.3 }
              }}
            >
              {/* Subtle gradient border on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary) / 0.1), transparent, hsl(var(--secondary) / 0.1))",
                }}
              />
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                As a seasoned creative professional, I bring over 4+ years of experience 
                across UI/UX design, graphic design, and video editing, shaping visually 
                immersive and user-focused digital experiences.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                My UI/UX approach is rooted in user-centered design, incorporating research, 
                ideation, wireframing, prototyping, and usability testing to transform ideas 
                into meaningful digital products.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Driven by an eye for detail, a strong understanding of visual hierarchy, 
                and a passion for design psychology, I am committed to storytelling—whether 
                through an interface, a brand identity, or a visual narrative.
              </p>
            </motion.div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-2 gap-4" staggerDelay={0.08}>
            {infoItems.map((item) => (
              <StaggerItem key={item.label}>
                <motion.div
                  className="glass-card-hover p-6 text-center group cursor-default"
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <item.icon className="h-8 w-8 text-primary mx-auto mb-3 group-hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)] transition-all duration-300" />
                  </motion.div>
                  <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                  <p className="font-semibold text-foreground">{item.value}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Stats with counter animation */}
        <Parallax speed={0.2} className="mt-16">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6" staggerDelay={0.1}>
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <motion.div 
                  className="glass-card p-6 text-center relative overflow-hidden group"
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  {/* Animated gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <motion.p 
                    className="font-display text-4xl font-bold gradient-text mb-2 relative z-10"
                    whileInView={{ scale: [0.5, 1.1, 1] }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                  >
                    {stat.number}
                  </motion.p>
                  <p className="text-muted-foreground text-sm relative z-10">{stat.label}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Parallax>
      </div>
    </section>
  );
};
