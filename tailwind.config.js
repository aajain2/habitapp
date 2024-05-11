/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "orange": "#FF6B35"
      },
      fontFamily: {
        "alata-regular": ["Alata-Regular", "sans-serif"],
        "inter-bold": ["Inter-Bold", "sans-serif"],
        "inter-regular": ["Inter-Regular", "sans-serif"],
      }
    },
  },
  plugins: [],
}

