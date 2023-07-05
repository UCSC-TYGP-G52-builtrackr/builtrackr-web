/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      robotoThin : ["Poppins", "sans-serif"],
      robotoMid : ["Roboto", "sans-serif"],
      robotoThick : ["Source Sans 3", "sans-serif"]
    }
  },
  plugins: [],
}
