import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedTextProps {
  texts: string[];
  className?: string;
}

export const AnimatedText = ({ texts, className = "" }: AnimatedTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className={`relative flex items-center h-[1.3em] ${className}`}>
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentIndex}
            initial={{ y: 30, opacity: 0, filter: "blur(4px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -30, opacity: 0, filter: "blur(4px)" }}
            transition={{ 
              duration: 0.6, 
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="gradient-text tracking-wide whitespace-nowrap"
          >
            {texts[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </div>
      <motion.span
        className="ml-1 inline-block w-[3px] h-[0.9em] bg-primary rounded-full"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 1] }}
      />
    </div>
  );
};
