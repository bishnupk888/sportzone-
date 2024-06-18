/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        bgColorBlack:"#080808",
        buttonBgColor: "rgba(255, 255, 255, 0.1)",
        redBorder : "#750000",
        textColor : "#ABABAB",
        highlightTextColor : "#D5D5D5",
        bgColorComponennt:"rgba(255, 255, 255, 0.1)",

      }
    },
  },
  plugins: [],
}

