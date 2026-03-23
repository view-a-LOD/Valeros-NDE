/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./apps/web/src/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
};
