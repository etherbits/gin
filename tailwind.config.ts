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
        destructive: "hsl(7 100% 56%)",
        "charcoal-100": "hsl(220 19% 94%)",
        "charcoal-200": "hsl(222 18% 86%)",
        "charcoal-300": "hsl(217 17% 74%)",
        "charcoal-400": "hsl(217 17% 60%)",
        "charcoal-50": "hsl(220 20% 97%)",
        "charcoal-500": "hsl(217 17% 48%)",
        "charcoal-600": "hsl(219 18% 39%)",
        "charcoal-700": "hsl(220 18% 32%)",
        "charcoal-800": "hsl(220 17% 27%)",
        "charcoal-900": "hsl(220 15% 24%)",
        "charcoal-950": "hsl(218 14% 16%)",
        "gossamer-100": "hsl(153 61% 90%)",
        "gossamer-200": "hsl(156 58% 80%)",
        "gossamer-300": "hsl(161 55% 67%)",
        "gossamer-400": "hsl(163 49% 52%)",
        "gossamer-50": "hsl(157 62% 96%)",
        "gossamer-500": "hsl(164 64% 35%)",
        "gossamer-600": "hsl(166 72% 30%)",
        "gossamer-700": "hsl(167 71% 24%)",
        "gossamer-800": "hsl(167 68% 20%)",
        "gossamer-900": "hsl(168 67% 16%)",
        "gossamer-950": "hsl(169 70% 9%)",
        "gull-gray-100": "hsl(192 22% 95%)",
        "gull-gray-200": "hsl(188 19% 92%)",
        "gull-gray-300": "hsl(193 18% 85%)",
        "gull-gray-400": "hsl(198 19% 76%)",
        "gull-gray-50": "hsl(180 17% 98%)",
        "gull-gray-500": "hsl(200 19% 65%)",
        "gull-gray-600": "hsl(204 17% 58%)",
        "gull-gray-700": "hsl(204 15% 50%)",
        "gull-gray-800": "hsl(205 14% 42%)",
        "gull-gray-900": "hsl(205 13% 35%)",
        "gull-gray-950": "hsl(201 15% 23%)",
        "jungle-green-100": "hsl(149 49% 90%)",
        "jungle-green-200": "hsl(153 48% 80%)",
        "jungle-green-300": "hsl(156 46% 67%)",
        "jungle-green-400": "hsl(158 41% 47%)",
        "jungle-green-50": "hsl(153 52% 96%)",
        "jungle-green-500": "hsl(160 53% 39%)",
        "jungle-green-600": "hsl(162 59% 30%)",
        "jungle-green-700": "hsl(163 60% 24%)",
        "jungle-green-800": "hsl(163 56% 20%)",
        "jungle-green-900": "hsl(164 55% 16%)",
        "jungle-green-950": "hsl(166 57% 9%)",
        "madang-100": "hsl(118 100% 92%)",
        "madang-200": "hsl(117 100% 87%)",
        "madang-300": "hsl(118 97% 73%)",
        "madang-400": "hsl(118 88% 58%)",
        "madang-50": "hsl(113 100% 97%)",
        "madang-500": "hsl(118 90% 45%)",
        "madang-600": "hsl(118 97% 36%)",
        "madang-700": "hsl(119 91% 29%)",
        "madang-800": "hsl(119 82% 24%)",
        "madang-900": "hsl(120 77% 20%)",
        "madang-950": "hsl(121 100% 10%)",
        "orange-100": "hsl(30 95% 92%)",
        "orange-200": "hsl(28 91% 83%)",
        "orange-300": "hsl(27 91% 72%)",
        "orange-400": "hsl(23 90% 61%)",
        "orange-50": "hsl(30 89% 96%)",
        "orange-500": "hsl(21 89% 53%)",
        "orange-600": "hsl(16 85% 48%)",
        "orange-700": "hsl(13 83% 40%)",
        "orange-800": "hsl(11 74% 34%)",
        "orange-900": "hsl(11 70% 28%)",
        "orange-950": "hsl(9 76% 15%)",
        "pomegranate-100": "hsl(8 100% 94%)",
        "pomegranate-200": "hsl(7 100% 89%)",
        "pomegranate-300": "hsl(7 100% 81%)",
        "pomegranate-400": "hsl(7 100% 70%)",
        "pomegranate-50": "hsl(9 100% 97%)",
        "pomegranate-500": "hsl(7 100% 56%)",
        "pomegranate-600": "hsl(7 86% 51%)",
        "pomegranate-700": "hsl(7 88% 42%)",
        "pomegranate-800": "hsl(7 83% 35%)",
        "pomegranate-900": "hsl(7 74% 31%)",
        "pomegranate-950": "hsl(7 90% 15%)",
        "sea-green-100": "hsl(143 68% 93%)",
        "sea-green-200": "hsl(142 66% 85%)",
        "sea-green-300": "hsl(143 65% 73%)",
        "sea-green-400": "hsl(143 58% 58%)",
        "sea-green-50": "hsl(136 65% 97%)",
        "sea-green-500": "hsl(143 59% 45%)",
        "sea-green-600": "hsl(144 64% 36%)",
        "sea-green-700": "hsl(144 60% 33%)",
        "sea-green-800": "hsl(143 54% 24%)",
        "sea-green-900": "hsl(145 51% 20%)",
        "sea-green-950": "hsl(147 69% 10%)",
        "ship-cove-100": "hsl(217 42% 94%)",
        "ship-cove-200": "hsl(216 44% 89%)",
        "ship-cove-300": "hsl(218 42% 82%)",
        "ship-cove-400": "hsl(223 40% 74%)",
        "ship-cove-50": "hsl(223 41% 97%)",
        "ship-cove-500": "hsl(227 38% 63%)",
        "ship-cove-600": "hsl(232 34% 59%)",
        "ship-cove-700": "hsl(233 26% 51%)",
        "ship-cove-800": "hsl(232 24% 41%)",
        "ship-cove-900": "hsl(230 21% 34%)",
        "ship-cove-950": "hsl(235 22% 20%)",
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
