/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neutral: {
          100: "#FFFFFF",
          200: "#F6F8FA",
          300: "#D5D5D5",
          800: "#121212",
        },
        primary: {
          text: "#022924",
          gray: "#585A43",
          "gray-light": "#818483",
          green: "#00A991",
          blue: "#2C98F0",
          danger: "#EF4444",
          danger_bg: "#FEE2E2",
          success: "#B2EECD",
          success_bg: "#F6FEFA",
          pending: "#EF9D3E",
          pending_bg: "#FAFBD3",
        },
        gray: {
          100: "#CECFCF",
          150: "#EFEFEF",
          200: "#818483",
          300: "#ABADAC",
          400: "#757877"
        }
      },
      fontFamily: {
        inter: ["inter", "sans-serif"],
        intermedium: ["inter-medium", "sans-serif"],
        intersb: ["inter-semibold", "sans-serif"],
        interbold: ["inter-bold", "sans-serif"],
        interextrabold: ["inter-extrabold", "sans-serif"],
      }
    },
  },
  plugins: [],
}

