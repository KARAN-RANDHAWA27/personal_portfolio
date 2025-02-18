import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        yellow: "#FF9800",
        blue: "#2997ff",
        purple: "#a972ff",
        "mx-teal": "#43B9B9",
        teal: "#43B9B9",
        gradient:
          "linear-gradient(97deg, #0096FF, #BB64FF 42%, #F2416B 74%, #EB7500)",
      },
      backgroundImage: {
        "ai-gradient":
          "linear-gradient(97deg, #0096FF, #BB64FF 42%, #F2416B 74%, #EB7500)",
      },
    },
  },
  plugins: [],
} satisfies Config;
