/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          950: "#09100c",
          900: "#0e1712",
          850: "#14231b",
          800: "#1d2d25",
          700: "#273b30",
          600: "#375042",
        },
        sage: {
          300: "#c2d3bd",
          400: "#9fb598",
          500: "#7d9371",
          600: "#65795b",
          700: "#4e6046",
        },
        champagne: {
          100: "#faf5ed",
          200: "#f3ebd9",
          300: "#e5d5be",
          400: "#d2bca0",
          500: "#bc9f7d",
        },
        bone: "#f5f2eb",
        olive: "#3D4431",
        moss: "#8F9E6C",
        peach: "#FFDFD0",
        ivory: "#FFF4E6",
        brown: "#5B4439",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        display: ["'Space Grotesk'", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.25em",
        ultra: "0.35em",
      },
      boxShadow: {
        'luxury': '0 25px 60px -15px rgba(0, 0, 0, 0.5)',
        'luxury-glow': '0 0 35px -5px rgba(125, 147, 113, 0.25)',
        'champagne-glow': '0 0 35px -5px rgba(229, 213, 190, 0.2)',
      },
    },
  },
  plugins: [],
};