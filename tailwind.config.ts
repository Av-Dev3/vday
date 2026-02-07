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
        vday: {
          pink: "#FFB3BA",
          rose: "#FF6B9D",
          purple: "#C77DFF",
          lavender: "#E0BBE4",
          cream: "#FFF5E1",
        },
      },
    },
  },
  plugins: [],
};
export default config;
