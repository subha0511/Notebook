const { fontFamily } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  safelist: [
    {
      pattern: /bg-(red|green|sky|cyan|fuchsia|yellow|neutral)-(400|500|300)/,
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "Roboto", "sans-serif", ...fontFamily.sans],
      },
      boxShadow: {
        knob: "0px 0px 4px 1px rgba(30, 30, 30, 0.25)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
};
