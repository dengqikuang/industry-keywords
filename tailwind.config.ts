import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          blue: "#007AFF",
          gray: "#8E8E93",
          light: "#F5F5F7",
          dark: "#1D1D1F",
        },
        dimension: {
          entity: "#FF6B6B",
          term: "#4ECDC4",
          policy: "#45B7D1",
          capital: "#96CEB4",
          trend: "#FFEAA7",
          chain: "#DDA0DD",
          compare: "#98D8C8",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "'SF Pro Display'",
          "'Helvetica Neue'",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
