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
      "ship-cove": {
        "50": "#f3f5fa",
        "100": "#e9eef6",
        "200": "#d6e0ef",
        "300": "#bdcbe4",
        "400": "#a2b1d7",
        "500": "#7d8cc4",
        "600": "#727cb9",
        "700": "#6068a2",
        "800": "#505783",
        "900": "#454b6a",
        "950": "#282a3e",
      },
      "gull-gray": {
        "50": "#f8fafa",
        "100": "#f1f5f6",
        "200": "#e6edee",
        "300": "#d2dde0",
        "400": "#b7c7ce",
        "500": "#96acb7",
        "600": "#8197a6",
        "700": "#6e8493",
        "800": "#5c6e7b",
        "900": "#4d5b65",
        "950": "#323d43",
      },
      madang: {
        "50": "#f0ffee",
        "100": "#d9ffd8",
        "200": "#bfffbc",
        "300": "#7dfd78",
        "400": "#3bf236",
        "500": "#12db0c",
        "600": "#08b603",
        "700": "#0a8e07",
        "800": "#0d700b",
        "900": "#0c5b0c",
        "950": "#003301",
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
