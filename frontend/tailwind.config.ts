import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3B3F9C",
        primaryDark: "#2E327F",
        background: "#F3F4F6",
        white: "#FFFFFF"
      },
      boxShadow: {
        glow: "0 24px 70px rgba(59, 63, 156, 0.24)"
      },
      backgroundImage: {
        "aritma-grid":
          "radial-gradient(circle at top right, rgba(59, 63, 156, 0.2), transparent 28%), linear-gradient(135deg, rgba(238,241,251,0.96), rgba(243,244,246,0.86))"
      }
    }
  },
  plugins: []
} satisfies Config;
