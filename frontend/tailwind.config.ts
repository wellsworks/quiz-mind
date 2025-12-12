// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  darkMode: "class", // Enables .dark class toggle AND prefers-color-scheme fallback
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },

    extend: {

      borderRadius: {
        xs: "4px",
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        full: "9999px",
      },

      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.05)",
        md: "0 4px 8px rgba(0,0,0,0.08)",
        lg: "0 8px 16px rgba(0,0,0,0.12)",
        xl: "0 12px 32px rgba(0,0,0,0.15)",
      },

      fontSize: {
        xs: ["0.75rem", "1rem"],
        sm: ["0.875rem", "1.25rem"],
        base: ["1rem", "1.5rem"],
        lg: ["1.125rem", "1.75rem"],
        xl: ["1.25rem", "1.75rem"],
        "2xl": ["1.5rem", "2rem"],
        "3xl": ["1.875rem", "2.25rem"],
      },
    },
  },
  plugins: [],
} satisfies Config;
