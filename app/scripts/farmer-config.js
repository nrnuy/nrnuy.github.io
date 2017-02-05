module.exports = {
  'routes':{
    '/': {name:'landing', path: './sections/Landing/', seed: require('./sections/Landing/landing.js') },
  },
  'default': '/',
  'preloader': {name:'preloader', path: './sections/Preloader/', seed: require('./sections/Preloader/preloader.js') }
};