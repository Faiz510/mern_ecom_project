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
        },
      },
      fontFamily: {
        body: ["Poppins"],
      },
    },
  },
  plugins: [],
};
