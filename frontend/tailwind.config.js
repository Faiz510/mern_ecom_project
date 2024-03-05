/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        custom: {
          white: "#FFFFFF",
          primary: "#edebeb",
          secondary: "#fac423",
          font_primary: "#9A9A9A",
        },
      },
      fontFamily: {
        body: ["Poppins"],
      },
      fontSize: {
        med: {
          "med-xl": "1.2rem",
        },
      },
    },
  },
  plugins: [],
};
