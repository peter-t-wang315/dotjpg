/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Arial", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        background: "var(--background)",
        "background-darker": "var(--background-darker)",
        border: "var(--border)",
        "border-darker": "var(--border-darker)",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: { fontSize: theme("fontSize.3xl"), fontWeight: 600 },
        h2: { fontSize: theme("fontSize.3xl") },
        h3: { fontSize: theme("fontSize.2xl") },
        h4: { fontSize: theme("fontSize.xl") },
        h5: { fontSize: theme("fontSize.lg") },
      });
    }),
  ],
};
