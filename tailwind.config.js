/** @type {import('tailwindcss').Config} */

// const defaultTheme = require("tailwindcss/defaultTheme");
// const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        modernist: ["var(--font-Modernist)"],
        sans: ["var(--font-Modernist)"],
        // serif: [...defaultTheme.fontFamily.serif],
        // mono: [...defaultTheme.fontFamily.mono],
      },
      colors: {
        dark1: "#202227",
        dark2: "#24262C",
        dark3: "#36383D",
        grey1: "#969CB0",
        grey2: "#2F323D",
        grey3: "#2E3137",
        blue1: "#5887F6",
        blue2: "#5887F5",
        blue3: "#2D3A59",
        blue4: "#324269",
        green1: "#00D685",
        green2: "#01c278",
        opaque1: "#FFFFFF66",
        red: "#FA4611",

        sky: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1296px",
        "2xl": "1536px",
      },
      spacing: {
        4.5: "1.125rem",
        5.5: "1.375rem",
        7: "1.625rem",
        15: "3.750rem",
        18: "4.5rem",
        38: "9.5rem",
      },
      gridTemplateColumns: {
        flexauto: "1fr auto",
      },
      zIndex: {
        1: "1",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
