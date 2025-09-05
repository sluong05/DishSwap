/** @type {import('tailwindcss').Config} */
module.exports = {
  //Update this to include path to all of your components
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "primary-bg": "#f3d5c0",
      }
    },
  },
  plugins: [],
}

