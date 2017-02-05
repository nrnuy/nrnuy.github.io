// Modules
var fs = require('fs');
var hbs = require('handlebars');
var domify = require('domify');
var TweenMax = require('gsap');
var select = require('dom-select');
var ScrollManager = require('scroll-manager');
var loadsvg = require('load-svg');
var Signal = require('signals');

//Components

//Models
var model = require('./footer-model.js');

function Footer() {
  this.create();
}
Footer.prototype = {

  create: function () {

    this.container = domify(hbs.compile(fs.readFileSync(__dirname + '/footer.hbs', 'utf8'))(model));

    this.instanceComponents();
    this.appendComponents();
    this.addListeners();

  },

  showUp: function(){
  },

  instanceComponents: function(){
    this.links = select.all('li', this.container);

  },

  appendComponents: function(){

  },

  addListeners: function() {
    for (var i = 0; i < this.links.length; i++) {
      this.links[i].addEventListener('mouseenter', this.handleMouseEnter.bind(this));
      this.links[i].addEventListener('mouseleave', this.handleMouseLeave.bind(this));

    }
  },

  handleMouseEnter : function(e){
    TweenMax.to(e.target, 0.4, {opacity: 0.5});
  },

  handleMouseLeave : function(e){
    TweenMax.to(e.target, 0.4, {opacity: 1});
  },

  resize: function(){

  },

  goOut: function(){

  }
};
module.exports = Footer;