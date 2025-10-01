/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f5f7ff",
          100: "#ebf0fe",
          200: "#dbe3fd",
          300: "#b4c5fb",
          400: "#8ba3f9",
          500: "#4671f6",
          600: "#3d60e6",
          700: "#2f4bc2",
          800: "#24397e",
          900: "#1a2a5e",
        },
        orange: {
          25: "#fff9f5", // Çok açık turuncu tonu
        },
      },
      fontFamily: {
        quicksand: ['var(--font-quicksand)'],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
