import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Palette, 
  Layout, 
  Film, 
  Figma, 
  Layers,
  Wand2
} from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem, Parallax, Magnetic } from "../ScrollReveal";

const skills = [
  { name: "UI/UX Design", level: 95, icon: Layout },
  { name: "Prototyping", level: 90, icon: Layers },
  { name: "Graphic Design", level: 90, icon: Palette },
  { name: "Video Editing", level: 85, icon: Film },
  { name: "Motion Graphics", level: 80, icon: Wand2 },
  { name: "Visual Design", level: 92, icon: Figma },
];

const tools = [
  { name: "Figma", category: "UI/UX" },
  { name: "Adobe XD", category: "UI/UX" },
  { name: "Photoshop", category: "Graphics" },
  { name: "Illustrator", category: "Graphics" },
  { name: "InDesign", category: "Graphics" },
  { name: "After Effects", category: "Motion" },
  { name: "Premiere Pro", category: "Video" },
  { name: "Canva", category: "Graphics" },
];

const SkillBar = ({ skill, index }: { skill: typeof skills[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.5 }}
          >
            <skill.icon className="h-5 w-5 text-primary group-hover:drop-shadow-[0_0_6px_hsl(var(--primary)/0.5)] transition-all duration-300" />
          </motion.div>
          <span className="font-medium">{skill.name}</span>
        </div>
        <motion.span 
          className="text-muted-foreground text-sm tabular-nums"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 + index * 0.1 }}
        >
          {skill.level}%
        </motion.span>
      </div>
      <div className="skill-bar overflow-hidden">
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={isInView ? { width: `${skill.level}%`, opacity: 1 } : {}}
          transition={{ 
            duration: 1.2, 
            delay: 0.3 + index * 0.1,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="skill-bar-fill relative"
        >
          {/* Animated shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            animate={isInView ? { x: "200%" } : {}}
            transition={{ duration: 1.5, delay: 1 + index * 0.1 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export const SkillsSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const orbY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section id="skills" className="section-container bg-card/30 relative overflow-hidden">
      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-[80px]"
        style={{ y: orbY }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-20 w-64 h-64 bg-secondary/10 rounded-full blur-[80px]"
        style={{ y: orbY }}
      />

      <div ref={containerRef} className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal className="text-center mb-16">
          <h2 className="section-title">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Tools and technologies I use to bring ideas to life
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Skills with progress bars */}
          <ScrollReveal direction="left" delay={0.1}>
            <motion.div
              className="glass-card p-8 relative overflow-hidden"
              whileHover={{ 
                boxShadow: "0 25px 50px -20px hsl(var(--primary) / 0.15)",
              }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-display text-xl font-semibold mb-8">
                Core Competencies
              </h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <SkillBar key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Tools grid */}
          <ScrollReveal direction="right" delay={0.1}>
            <motion.div
              className="glass-card p-8"
              whileHover={{ 
                boxShadow: "0 25px 50px -20px hsl(var(--secondary) / 0.15)",
              }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-display text-xl font-semibold mb-8">
                Tools & Software
              </h3>
              <StaggerContainer className="grid grid-cols-2 gap-4" staggerDelay={0.05}>
                {tools.map((tool) => (
                  <StaggerItem key={tool.name}>
                    <Magnetic strength={0.15}>
                      <motion.div
                        className="glass-card-hover p-4 text-center group cursor-default relative overflow-hidden"
                        whileHover={{ 
                          y: -3,
                          transition: { duration: 0.2 }
                        }}
                      >
                        {/* Hover gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <p className="font-medium group-hover:text-primary transition-colors relative z-10">
                          {tool.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 relative z-10">
                          {tool.category}
                        </p>
                      </motion.div>
                    </Magnetic>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
