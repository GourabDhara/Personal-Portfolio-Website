import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Palette, Film, Layout, Smartphone } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollReveal, StaggerContainer, StaggerItem, Parallax } from "../ScrollReveal";
import bhojonRoshikVideo from "@/assets/bhojon-roshik-preview.mp4";
import bannerDesigningVideo from "@/assets/banner-designing-preview.mp4";
import teaserTantalizersVideo from "@/assets/teaser-tantalizers-preview.mp4";
import viralVisionariesVideo from "@/assets/viral-visionaries-preview.mp4";
import catalogueChroniclesVideo from "@/assets/catalogue-chronicles-preview.mp4";
import trailblazersVideo from "@/assets/trailblazers-preview.mp4";
import campuseaseVideo from "@/assets/campusease-preview.mp4";
import ogZoneVideo from "@/assets/og-zone-preview.mp4";
import flowaiVideo from "@/assets/flowai-preview.mp4";

const projects = [
  {
    title: "BHOJON ROSHIK",
    category: "UI/UX Design",
    description: "A visually engaging, user-centric food delivery app designed in Figma with smooth, intuitive ordering experience.",
    icon: Smartphone,
    link: "https://www.behance.net/gallery/241158677/Bhojon-Roshik-Food-Delivery-App-UXUI-Case-Study",
    gradient: "from-primary/20 to-secondary/20",
    accentColor: "primary",
    video: bhojonRoshikVideo,
  },
  {
    title: "CampusEase",
    category: "UI/UX Design",
    description: "A hostel-focused student app simplifying room allocation, complaints, attendance, and daily management through intuitive UX.",
    icon: Smartphone,
    link: "https://www.behance.net/gourabdhara",
    gradient: "from-secondary/20 to-primary/20",
    accentColor: "secondary",
    video: campuseaseVideo,
  },
  {
    title: "OG-Zone",
    category: "UI/UX Design",
    description: "An e-commerce accessories store UX case study focused on improving product discovery, navigation clarity, and checkout usability.",
    icon: Smartphone,
    link: "https://www.behance.net/gourabdhara",
    gradient: "from-primary/20 to-secondary/20",
    accentColor: "primary",
    video: ogZoneVideo,
  },
  {
    title: "FlowAI",
    category: "UI/UX Design",
    description: "A website UX case study focused on clearly presenting AI services with strong information hierarchy and usability.",
    icon: Smartphone,
    link: "https://www.behance.net/gourabdhara",
    gradient: "from-secondary/20 to-primary/20",
    accentColor: "secondary",
    video: flowaiVideo,
  },
  {
    title: "Teaser Tantalizers",
    category: "Video Production",
    description: "Dynamic teaser producer, blending motion graphics seamlessly to captivate and engage audiences.",
    icon: Film,
    link: "https://www.behance.net/gallery/191857499/TEASER-TANTALIZERS-SHOWCASE",
    gradient: "from-primary/20 to-secondary/20",
    accentColor: "primary",
    video: teaserTantalizersVideo,
  },
  {
    title: "TRAILBLAZERS: A TRAILER SHOWCASE",
    category: "Video Production",
    description: "Dynamic trailers produced to captivate audiences and ignite anticipation.",
    icon: Film,
    link: "https://www.behance.net/gourabdhara",
    gradient: "from-secondary/20 to-primary/20",
    accentColor: "secondary",
    video: trailblazersVideo,
  },
  {
    title: "Catalogue Chronicles",
    category: "Graphic Design",
    description: "Visually stunning and informative catalogue showcases for products and services across industries.",
    icon: Layout,
    link: "https://www.behance.net/gallery/191856105/CATALOGUE-CHRONICLES-SHOWCASING-COLLECTIONS",
    gradient: "from-primary/20 to-secondary/20",
    accentColor: "primary",
    video: catalogueChroniclesVideo,
  },
  {
    title: "Banner Designing",
    category: "Graphic Design",
    description: "Expert banner designs crafting visually striking and effective digital advertisements for various clients.",
    icon: Palette,
    link: "https://www.behance.net/gallery/191821613/BANNER-DESIGNING",
    gradient: "from-secondary/20 to-primary/20",
    accentColor: "secondary",
    video: bannerDesigningVideo,
  },
  {
    title: "Viral Visionaries: Social Media Posts",
    category: "Graphic Design",
    description: "Eye-catching social media post designs that drive engagement and elevate brand presence.",
    icon: Palette,
    link: "https://www.behance.net/gallery/191856905/VIRAL-VISIONARIES-SOCIAL-MEDIA-POSTS",
    gradient: "from-primary/20 to-secondary/20",
    accentColor: "primary",
    video: viralVisionariesVideo,
  },
];

interface Project {
  title: string;
  category: string;
  description: string;
  icon: typeof Smartphone;
  link: string;
  gradient: string;
  accentColor: string;
  video?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <motion.a
      ref={cardRef}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full"
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ z: 50 }}
    >
      <motion.div
        className="glass-card-hover overflow-hidden relative h-full flex flex-col"
        animate={{
          boxShadow: isHovered
            ? `0 30px 60px -15px hsl(var(--${project.accentColor}) / 0.25)`
            : "0 10px 30px -10px hsl(var(--background) / 0.3)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Project preview area */}
        <div className={`relative h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
          {/* Video or animated background pattern */}
          {project.video ? (
            <video
              ref={videoRef}
              src={project.video}
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <>
              <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                  backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : "0% 0%",
                }}
                transition={{ duration: 3, repeat: isHovered ? Infinity : 0 }}
                style={{
                  backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
                  backgroundSize: "24px 24px",
                }}
              />
              
              <motion.div
                animate={{ 
                  scale: isHovered ? 1.2 : 1,
                  rotate: isHovered ? 5 : 0,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <project.icon className="h-16 w-16 text-foreground/30 group-hover:text-primary/60 transition-colors duration-500" />
              </motion.div>
            </>
          )}
          
          {/* Hover overlay */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ backgroundColor: "hsl(var(--primary) / 0)" }}
            animate={{ 
              backgroundColor: isHovered ? "hsl(var(--primary) / 0.1)" : "hsl(var(--primary) / 0)"
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ 
                opacity: isHovered ? 1 : 0, 
                y: isHovered ? 0 : 20,
                scale: isHovered ? 1 : 0.8
              }}
              transition={{ duration: 0.3 }}
            >
              <ExternalLink className="h-8 w-8 text-foreground" />
            </motion.div>
          </motion.div>

          {/* Shine effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: isHovered ? "200%" : "-100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </div>

        {/* Project info */}
        <div className="p-6 relative flex-1 flex flex-col">
          <div className="flex items-center gap-2 text-primary text-sm mb-2">
            <motion.div
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <project.icon className="h-4 w-4" />
            </motion.div>
            <span>{project.category}</span>
          </div>
          <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm">
            {project.description}
          </p>
        </div>
      </motion.div>
    </motion.a>
  );
};

export const ProjectsSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const orbY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="projects" className="section-container bg-card/30 relative overflow-hidden">
      {/* Background orbs */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[100px]"
        style={{ y: orbY }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-[100px]"
        style={{ y: orbY }}
      />

      <div ref={containerRef} className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal className="text-center mb-16">
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle mx-auto">
            A collection of my recent work in UI/UX, graphics, and video editing
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch" staggerDelay={0.08}>
          {projects.map((project, index) => (
            <StaggerItem key={project.title}>
              <ProjectCard project={project} index={index} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal delay={0.4} className="text-center mt-12">
          <Button variant="glass" size="lg" asChild className="group">
            <a
              href="https://www.behance.net/gourabdhara"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>View All Projects on Behance</span>
              <motion.span
                className="inline-block ml-2"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <ExternalLink className="h-4 w-4" />
              </motion.span>
            </a>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
};
