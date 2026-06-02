import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          900: "#312e81",
        },
        surface: {
          dark: "#070b1a",
          card: "#0f1630",
          muted: "#1a2240",
        },
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(99,102,241,0.35), transparent)",
        "section-glow":
          "radial-gradient(ellipse 60% 40% at 100% 0%, rgba(139,92,246,0.12), transparent)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,0.08)",
        "card-hover": "0 12px 40px rgba(79,70,229,0.15)",
        glow: "0 0 60px rgba(99,102,241,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
