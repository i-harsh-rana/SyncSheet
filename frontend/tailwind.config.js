/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-text': '#1C2833',
        'golden': '#D4AF37',
        'light-golden': '#F2D16D'
      }
    },
  },
  plugins: [],
}

