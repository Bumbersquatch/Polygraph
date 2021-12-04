const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./public/**/*.html', './src/**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      white: '#f7f2e1',
      gray: colors.coolGray,
      blue: '#030726',
      red: '#FF013C',
      pink: colors.fuchsia
    },
    fontFamily: {
      sans: ['Helvetica', 'Arial', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
