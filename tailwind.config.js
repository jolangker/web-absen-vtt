module.exports = {
  purge: {
    content: ["./index.html", "./src/**/.*{vue,js,ts,jsx,tsx}"],
    safelist: ["hidden", "ring-red-400", " cursor-not-allowed", " opacity-50"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        poppins: "'Poppins', sans-serif;",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
