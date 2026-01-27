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
        'sans': [
          'Plus Jakarta Sans',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji'
        ],
        'poppins': [
          'Poppins',
          'Helvetica',
          'Arial',
          'sans-serif'
        ],
        'open-sans': [
          'Open Sans',
          'Arial',
          'sans-serif'
        ],
        'serif': [
          'Times New Roman',
          'serif'
        ],
        'heading': [
          'Poppins',
          'sans-serif'
        ]
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