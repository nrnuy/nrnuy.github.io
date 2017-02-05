// Modules
var fs = require('fs');
var hbs = require('handlebars');
var domify = require('domify');
var TweenMax = require('gsap');
var select = require('dom-select');
var ScrollManager = require('scroll-manager');

//Components
var Navbar = require('../../components/Navbar/navbar.js');

//Models
var model = require('./preloader-model.js');

function Preloader() {}
Preloader.prototype = {

  create: function () {

    this.container = domify(hbs.compile(fs.readFileSync(__dirname + '/preloader.hbs', 'utf8'))(model));

  },

  showUp: function(){

  },

  instanceComponents: function(){

  },

  appendComponents: function(){

  },

  addListeners: function() {

  },

  resize: function(w, h){

  },

  goOut: function(){
    TweenMax.to(this.container, 0.4, {autoAlpha: 0, ease: Power2.easeOut, onComplete: function(){
      this.remove();
    }.bind(this)});
  },

  remove: function(){
    this.container.parentNode.removeChild(this.container);
  }
};
module.exports = Preloader;