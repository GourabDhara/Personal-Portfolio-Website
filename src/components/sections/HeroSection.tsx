import { motion } from "framer-motion";
import { ArrowDown, ExternalLink } from "lucide-react";
import { Button } from "../ui/button";
import { AnimatedText } from "../AnimatedText";
import { ProfileImage } from "../ProfileImage";
import heroBg from "@/assets/hero-bg.jpg";

export const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div 
          className="absolute inset-0 backdrop-blur-sm transition-all duration-500"
          style={{ background: "var(--hero-overlay)" }}
        />
      </div>

      {/* Animated gradient orbs - visible in both modes */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[128px] animate-float bg-primary/20 dark:bg-primary/20" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[128px] animate-float bg-secondary/20 dark:bg-secondary/20" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-[100px] animate-float bg-accent/15 dark:bg-accent/15" style={{ animationDelay: "2.5s" }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-primary font-medium mb-4 tracking-widest uppercase text-sm"
            >
              Welcome to my portfolio
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              I'm <span className="gradient-text">Gourab Dhara</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center lg:justify-start mb-8"
            >
            <AnimatedText
              texts={["UI/UX Designer", "Graphic Designer", "Visual Designer", "Product Designer", "Video Editor"]}
              className="font-display text-xl sm:text-2xl md:text-3xl font-medium"
            />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0 mb-10"
            >
              Crafting meaningful digital experiences through user-centered design,
              creative visuals, and compelling storytelling.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button variant="hero" size="xl" asChild>
                <a href="#projects">
                  View My Work <ExternalLink className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <a href="#contact">Get In Touch</a>
              </Button>
            </motion.div>
          </div>

          {/* Profile Image */}
          <div className="flex-shrink-0 order-1 lg:order-2">
            <ProfileImage />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-sm">Scroll Down</span>
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
};
