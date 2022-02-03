module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'darkest-gray': '#14141A',
        'darker-gray': '#1E1E27'
      },
      screens: {
        xs: '425px'
      }
    }
  },
  plugins: []
}
