/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Familjen Grotesk"', 'sans-serif'],
      },
      colors: {
        'app-bg': '#E1ECF2',
        'app-bg-dark': '#D1DCE2',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          primary: '#00839F',
          'primary-content': '#ffffff',
          '--rounded-btn': '9999px',
        },
      },
    ],
  },
};
