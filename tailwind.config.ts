import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: "#FF9800",
        blue: "#2997ff",
        purple: "#a972ff",
        "mx-teal": "#43B9B9",
        teal: "#43B9B9",
        primary: {
          50: "#EEE6FF",
          100: "#D6C4FF",
          200: "#B699FF",
          300: "#9370FF",
          400: "#7C51FC",
          500: "#6938EF", // Main primary color
          600: "#5227D5",
          700: "#3E1AB8",
          800: "#2B1090",
          900: "#1C0A6B",
        },
        secondary: {
          50: "#E6FBFF",
          100: "#B3F1FF",
          200: "#80E8FF",
          300: "#4DDBFF",
          400: "#26CFFF",
          500: "#00C2FF", // Main secondary color
          600: "#0099D6",
          700: "#0073B0",
          800: "#00578A",
          900: "#003F66",
        },
        accent: {
          50: "#E6FFF6",
          100: "#B3FFE6",
          200: "#80FFD6",
          300: "#4DFFCD",
          400: "#26FFC6",
          500: "#00EDAD", // Main accent color
          600: "#00C492",
          700: "#009B77",
          800: "#00755C",
          900: "#005142",
        },
        dark: {
          50: "#676767",
          100: "#5a5a5a",
          200: "#4c4c4c",
          300: "#3f3f3f",
          400: "#323232",
          500: "#252525",
          600: "#181818",
          700: "#141414",
          800: "#0D0D0D",
          900: "#080808", // Darkest shade for backgrounds
        },
        gradient:
          "linear-gradient(97deg, #0096FF, #BB64FF 42%, #F2416B 74%, #EB7500)",
      },
      backgroundImage: {
        "ai-gradient":
          "linear-gradient(97deg, #0096FF, #BB64FF 42%, #F2416B 74%, #EB7500)",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
