/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./includes/**/*.html",
    "./assets/js/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'sans': ['Poppins', 'system-ui', 'sans-serif']
      },
      backdropBlur: {
        'custom': '12px'
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)'
      }
    },
  },
  plugins: [],
}