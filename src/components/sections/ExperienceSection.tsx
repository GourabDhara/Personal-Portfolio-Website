import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Building2, Calendar, Briefcase, GraduationCap } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "../ScrollReveal";

const experiences = [
  {
    title: "UI/UX Designer & Graphic Designer",
    company: "WEFIK",
    period: "Aug 2023 - Aug 2024",
    description: [
      "Designed intuitive user interfaces and seamless user experiences for web and mobile applications",
      "Created compelling visual designs including logos, banners, and marketing materials",
      "Collaborated with development teams to ensure design consistency and optimal user engagement",
    ],
  },
  {
    title: "Freelance Designer",
    company: "Fiverr & Freelancer",
    period: "2021 - Present",
    description: [
      "Completed numerous graphic design and video editing projects on freelance platforms",
      "Maintained stellar reputation with consistently positive feedback",
      "Demonstrated proficiency adapting to diverse project requirements",
    ],
  },
];

const education = [
  {
    degree: "Bachelor of Technology",
    institution: "College of Engineering & Management, Kolaghat",
    period: "2022 - 2026",
    field: "Computer Science & Engineering",
  },
  {
    degree: "Higher Secondary",
    institution: "Hooghly Collegiate School, Chinsurah",
    period: "2020 - 2022",
    field: "Science Stream",
  },
];

const TimelineItem = ({ 
  children, 
  index, 
  isLeft = true 
}: { 
  children: React.ReactNode; 
  index: number;
  isLeft?: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative pl-12 pb-10 last:pb-0"
    >
      {/* Timeline dot with pulse animation */}
      <motion.div 
        className="absolute left-0 top-1 w-9 h-9 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10"
        whileInView={{ scale: [0, 1.2, 1] }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.15 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
        />
        <Building2 className="h-4 w-4 text-primary" />
      </motion.div>

      {children}
    </motion.div>
  );
};

export const ExperienceSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section id="experience" className="section-container relative overflow-hidden">
      {/* Background elements */}
      <motion.div 
        className="absolute top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"
        style={{ y: useTransform(useScroll().scrollYProgress, [0, 1], ["0%", "30%"]) }}
      />
      <motion.div 
        className="absolute bottom-20 -left-20 w-80 h-80 bg-secondary/5 rounded-full blur-[100px]"
        style={{ y: useTransform(useScroll().scrollYProgress, [0, 1], ["0%", "-30%"]) }}
      />

      <div ref={containerRef} className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal className="text-center mb-16">
          <h2 className="section-title">
            Experience & <span className="gradient-text">Education</span>
          </h2>
          <p className="section-subtitle mx-auto">
            My professional journey and academic background
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Work Experience */}
          <div>
            <ScrollReveal direction="left" delay={0.1}>
              <h3 className="font-display text-xl font-semibold mb-8 flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Briefcase className="h-6 w-6 text-primary" />
                </motion.div>
                Work Experience
              </h3>
            </ScrollReveal>

            <div className="relative">
              {/* Animated timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-muted/30 overflow-hidden">
                <motion.div
                  className="w-full bg-gradient-to-b from-primary via-secondary to-primary"
                  style={{ height: lineHeight }}
                />
              </div>

              {experiences.map((exp, index) => (
                <TimelineItem key={exp.title} index={index}>
                  <motion.div 
                    className="glass-card-hover p-6 group"
                    whileHover={{ 
                      x: 5,
                      boxShadow: "0 20px 40px -15px hsl(var(--primary) / 0.2)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-2 text-primary text-sm mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{exp.period}</span>
                    </div>
                    <h4 className="font-display text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                      {exp.title}
                    </h4>
                    <p className="text-muted-foreground mb-4">{exp.company}</p>
                    <ul className="space-y-2">
                      {exp.description.map((item, i) => (
                        <motion.li
                          key={i}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                        >
                          <span className="text-primary mt-1 flex-shrink-0">•</span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </TimelineItem>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <ScrollReveal direction="right" delay={0.1}>
              <h3 className="font-display text-xl font-semibold mb-8 flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <GraduationCap className="h-6 w-6 text-secondary" />
                </motion.div>
                Education
              </h3>
            </ScrollReveal>

            <StaggerContainer className="space-y-6" staggerDelay={0.15}>
              {education.map((edu, index) => (
                <StaggerItem key={edu.degree}>
                  <motion.div
                    className="glass-card-hover p-6 group relative overflow-hidden"
                    whileHover={{ 
                      y: -5,
                      boxShadow: "0 20px 40px -15px hsl(var(--secondary) / 0.2)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Decorative corner */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-secondary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="flex items-center gap-2 text-secondary text-sm mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{edu.period}</span>
                    </div>
                    <h4 className="font-display text-lg font-semibold mb-1 group-hover:text-secondary transition-colors">
                      {edu.degree}
                    </h4>
                    <p className="text-foreground mb-2">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground">{edu.field}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
};
