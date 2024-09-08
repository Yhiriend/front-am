/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts}"],
  theme: {
    extend: {
      transformStyle: {
        'preserve-3d':'preserve-3d'
      }
    },
  },
  plugins: [],
}

