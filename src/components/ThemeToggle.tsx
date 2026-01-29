import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
      document.documentElement.classList.toggle("light", savedTheme === "light");
    } else {
      // Default to dark mode
      document.documentElement.classList.remove("light");
    }
  }, []);

  const toggleTheme = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    // Persist preference
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
    
    // Toggle class on html element
    document.documentElement.classList.toggle("light", !newIsDark);
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="relative">
      {/* Ripple effect container */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: isDark 
                ? "radial-gradient(circle, hsl(190 90% 50% / 0.4) 0%, transparent 70%)"
                : "radial-gradient(circle, hsl(45 100% 60% / 0.4) 0%, transparent 70%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Toggle switch */}
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          relative w-14 h-7 rounded-full p-1 cursor-pointer
          transition-all duration-500 ease-in-out
          ${isDark 
            ? "bg-muted border border-glass-border shadow-[0_0_15px_hsl(190_90%_50%/0.3)]" 
            : "bg-amber-100 border border-amber-200 shadow-[0_2px_10px_rgba(0,0,0,0.1)]"
          }
          hover:shadow-[0_0_25px_hsl(190_90%_50%/0.4)]
        `}
        aria-label="Toggle theme"
      >
        {/* Sliding knob */}
        <motion.div
          layout
          initial={false}
          animate={{
            x: isDark ? 0 : 28,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
          className={`
            relative w-5 h-5 rounded-full flex items-center justify-center
            transition-colors duration-500
            ${isDark 
              ? "bg-background shadow-[0_0_12px_hsl(190_90%_50%/0.5),inset_0_1px_0_rgba(255,255,255,0.1)]" 
              : "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.8)]"
            }
          `}
        >
          {/* Icon container with morph animation */}
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.div
                key="moon"
                initial={{ rotate: -90, scale: 0, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <Moon className="w-3 h-3 text-primary" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ rotate: 90, scale: 0, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: -90, scale: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <Sun className="w-3 h-3 text-amber-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.button>
    </div>
  );
};
