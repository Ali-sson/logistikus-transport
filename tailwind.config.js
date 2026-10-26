
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#064A6F",
          teal: "#05708C",
          grey: "#8C969C",
          light: "#F4F8FA",
        },
      },
    },
  },
  plugins: [],
};
