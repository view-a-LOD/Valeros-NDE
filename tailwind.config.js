/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Familjen Grotesk"', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark'],
  },
};
