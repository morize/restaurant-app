module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      'solway': ['"Solway"', "Medium"],
    },
    backgroundImage: {
      main: "url('https://cafetown.fr/wp-content/uploads/2021/09/ruben-ramirez-xhKG01FN2uk-unsplash-scaled.jpg')",
      windowPattern:
        "url('https://www.pngkit.com/png/full/122-1225826_white-grunge-texture-png-svg-transparent-vintage-grain.png')",
    },
  },
  plugins: [],
};
