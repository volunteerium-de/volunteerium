/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        "3xl": "1920px",
      },
      colors: {
        white: "#FFFFFF",
        "light-gray": "#F8F9FC",
        "light-gray-2": "#F1F3F9",
        "light-gray-3": "#E1E6EF",
        "gray-1": "#C1C2C4",
        "gray-2": "#9D9EA1",
        "dark-gray-1": "#6C707A",
        "dark-gray-2": "#4A505C",
        "dark-gray-3": "#3A3C41",
        black: "#000000",
        "light-green": "#DCE6E0",
        "primary-green": "#69957B",
        "dark-green": "#4B6D59",
        warning: "#B25E09",
        danger: "#AC242F",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        "bad-script": ["Bad Script", "cursive"],
        quattrocento: ["Quattrocento", "serif"],
      },
    },
  },
  plugins: [],
}
