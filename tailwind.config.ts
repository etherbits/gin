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
        charcoal: {
          "50": "#f6f7f9",
          "100": "#eceef2",
          "200": "#d5d9e2",
          "300": "#b1bac8",
          "400": "#8694aa",
          "500": "#677790",
          "600": "#525f77",
          "700": "#434d61",
          "800": "#3a4252",
          "900": "#343a46",
          "950": "#23272e",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
