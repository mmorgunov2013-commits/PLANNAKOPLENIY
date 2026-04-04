import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        deep: {
          DEFAULT: "#0c1222",
          muted: "#141c2f",
        },
        cream: "#f7f4ef",
        milk: "#faf8f5",
        accent: {
          DEFAULT: "#22c55e",
          dim: "#16a34a",
          glow: "#4ade80",
        },
        gold: {
          DEFAULT: "#e8c547",
          soft: "#f5d76a",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(34, 197, 94, 0.12), transparent), radial-gradient(ellipse 60% 50% at 20% 80%, rgba(232, 197, 71, 0.08), transparent), linear-gradient(165deg, #0c1222 0%, #141c2f 45%, #0a1628 100%)",
        "section-warm": "linear-gradient(180deg, #faf8f5 0%, #f3efe8 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out forwards",
        "float-slow": "float 6s ease-in-out infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        shimmer: "shimmer 2.5s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.85" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
