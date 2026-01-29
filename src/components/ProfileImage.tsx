import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import profilePhoto from "@/assets/profile-photo.jpeg";

export const ProfileImage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position for 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for tilt
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Transform mouse position to rotation values
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      className="relative flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
    >
      {/* Animated gradient halo behind the image */}
      <motion.div
        className="absolute inset-0 rounded-[24px] blur-[60px] opacity-60"
        animate={{
          background: [
            "linear-gradient(45deg, hsl(var(--primary) / 0.4), hsl(var(--secondary) / 0.3), hsl(280 70% 60% / 0.3))",
            "linear-gradient(135deg, hsl(var(--secondary) / 0.4), hsl(280 70% 60% / 0.3), hsl(var(--primary) / 0.3))",
            "linear-gradient(225deg, hsl(280 70% 60% / 0.4), hsl(var(--primary) / 0.3), hsl(var(--secondary) / 0.3))",
            "linear-gradient(315deg, hsl(var(--primary) / 0.4), hsl(var(--secondary) / 0.3), hsl(280 70% 60% / 0.3))",
          ],
          scale: [1, 1.05, 1.02, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          width: "120%",
          height: "120%",
          left: "-10%",
          top: "-10%",
        }}
      />

      {/* Floating animation wrapper */}
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Image container with glow on hover */}
        <div
          className={`relative rounded-[20px] overflow-hidden shadow-2xl transition-all duration-500 ${
            isHovered ? "shadow-primary/30" : "shadow-background/50"
          }`}
          style={{
            boxShadow: isHovered
              ? "0 25px 50px -12px hsl(var(--primary) / 0.35), 0 0 40px hsl(var(--primary) / 0.15)"
              : "0 25px 50px -12px hsl(var(--background) / 0.5)",
          }}
        >
          {/* Ambient glow overlay on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            style={{
              background:
                "radial-gradient(ellipse at center, hsl(var(--primary) / 0.1) 0%, transparent 70%)",
            }}
          />

          {/* Profile image */}
          <motion.img
            src={profilePhoto}
            alt="Gourab Dhara - UI/UX Designer"
            className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover"
            style={{
              filter: isHovered
                ? "contrast(1.05) brightness(1.02)"
                : "contrast(1) brightness(1)",
              transition: "filter 0.4s ease",
            }}
          />

          {/* Subtle border glow */}
          <div
            className="absolute inset-0 rounded-[20px] pointer-events-none transition-opacity duration-500"
            style={{
              border: "1px solid hsl(var(--primary) / 0.2)",
              opacity: isHovered ? 1 : 0.5,
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};
