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
        teal: {
          DEFAULT: "#0097a7",
          dark: "#006f7c",
          soft: "rgba(0, 151, 167, 0.08)",
        },
        ink: {
          DEFAULT: "#14181c",
          muted: "#5c646d",
        },
        line: "#e2e6ea",
        surface: "#f5f7f8",
      },
      maxWidth: {
        content: "1240px",
      },
    },
  },
  plugins: [],
};
export default config;
