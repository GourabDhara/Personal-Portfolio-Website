import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(() => ({
  // ✅ REQUIRED for GitHub Pages
  base: "/Personal-Portfolio-Website/",

  plugins: [
    react(), // ✅ keep only react for production
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
