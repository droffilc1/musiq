/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      background: {
        dark: "#181818",
      },
      pink: {
        50: "#FDE7F7",
        100: "#FCDBF3",
        200: "#FAB5E7",
        600: "#EE10B0",
        700: "#D60E9E",
        800: "#BE0D8D",
        900: "#B30C84",
        deep: "#8F0A6A",
        dark: "#6B074F",
        darker: "#53063E",
      },
      blue: {
        50: "#E7F5FD",
        100: "#DBF0FD",
        200: "#B4E1FA",
        600: "#0E9EEF",
        700: "#0D8ED7",
        800: "#0B7EBF",
        900: "#0B77B3",
        deep: "#085F8F",
        dark: "#053754",
      },
    },
    extend: {},
  },
  plugins: [],
};
