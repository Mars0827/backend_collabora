/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bgBlack: "#080808",
        blueButton: "#346CED",
        blueButtonBorder: "#2B395A",
        grayBorder: "#292929",
        grayBorder2: "#898989",
        grayFont: "#898989",
      },
      fontFamily: {
        'sf-pro': ['SF Pro Display', 'sans-serif'], // Add custom font
      },
    },
  },
  plugins: [],
};
