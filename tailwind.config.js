const { lightBlue } = require("@mui/material/colors");

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: "#root",
  theme: {
    extend: {
      colors: {
        black: "#000000",
        white: "#FFFFFF",
        lightGray: "#f9fafb",
        gray: "#a1a5aa",
        lightBlue: "#e4edfd",
        blue: "#456efe",
        darkBlue: "#3964fe"
      },
      fontFamily: {
        logo: ['Georgia', 'sans-serif'],
        body: ['Merriweather', 'sans-serif']
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};