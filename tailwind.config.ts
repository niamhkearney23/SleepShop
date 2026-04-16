import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        parchment: "#FAF7F2",
        ink: "#1A1A1A",
        forest: "#2D3E2C",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      lineHeight: {
        relaxed: "1.75",
      },
    },
  },
  plugins: [],
};

export default config;
