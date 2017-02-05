// Modules
var fs = require('fs');
var hbs = require('handlebars');
var domify = require('domify');
var TweenMax = require('gsap');
var select = require('dom-select');
var ScrollManager = require('scroll-manager');

//Components
var Navbar = require('../../components/Navbar/navbar.js');
var Hero = require('../../components/Hero/hero.js');
var Content = require('../../components/Content/content.js');
var Footer = require('../../components/Footer/footer.js');

//Models
var model = require('./landing-model.js');

function Landing() {}

Landing.prototype = {

  create: function () {

    this.container = domify(hbs.compile(fs.readFileSync(__dirname + '/landing.hbs', 'utf8'))(model));
  },

  showUp: function() {
    TweenMax.fromTo(this.container, 0.4, {autoAlpha: 0}, {delay: 0.4, autoAlpha: 1, ease: Power2.easeOut, 
    onComplete: function(){
      this.navbar.showUp();
      this.hero.showUp();
    }.bind(this)});
  },

  instanceComponents: function() {
    this.navbar = new Navbar(this.framework);
    this.hero = new Hero ();
    this.content = new Content ();
    this.scroller = new ScrollManager();
    this.footer = new Footer();

  },

  appendComponents: function() {
    this.container.appendChild(this.navbar.container);
    this.container.appendChild(this.hero.container);
    this.container.appendChild(this.content.container);
    this.container.appendChild(this.footer.container);

  },

  addListeners: function() {
    this.hero.onDownArrowClicked.add(this.scrollDown.bind(this));
    this.content.onReachedMyHeight.add(function(show){
      if (show) {
        this.navbar.showLogo();
      } else {
        this.navbar.hideLogo();
      }
    }.bind(this));

  },

  scrollDown: function() {
    this.scroller.scrollToElement({element: document.body, to: this.content.container, duration: 0.6, ease: 'easeOutExpo'});
  },

  resize: function(w, h) {
    console.log(w);

  },

  goOut: function() {
    this.navbar.goOut();
    this.hero.goOut();
    TweenMax.fromTo(this.container, 0.4, {autoAlpha: 1}, {delay: 0.8, autoAlpha: 0, ease: Power2.easeOut, onComplete: function(){
      this.remove();
    }.bind(this)});
  },

  remove: function() {
    this.container.parentNode.removeChild(this.container);
  }
};
module.exports = Landing;