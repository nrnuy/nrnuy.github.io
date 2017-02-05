// Modules
var fs = require('fs');
var hbs = require('handlebars');
var domify = require('domify');
var TweenMax = require('gsap');
var select = require('dom-select');
var ScrollManager = require('scroll-manager');
var loadsvg = require('load-svg');
var MobileDetect = require('mobile-detect'),
    md = new MobileDetect(navigator.userAgent);
//Components

//Models
var model = require('./navbar-model.js');

function Navbar(framework) {
  this.farmer = framework;
  this.create();
}
Navbar.prototype = {

  create: function () {
    this.isDesktop = (!md.phone() && !md.tablet());
    model.isDesktop =  this.isDesktop;
    this.container = domify(hbs.compile(fs.readFileSync(__dirname + '/navbar.hbs', 'utf8'))(model));
    this.listElements = select.all('li', this.container);
    this.listElementsReverse = select.all('li', this.container).reverse();

    this.instanceComponents();
    this.appendComponents();
    this.addListeners();

  },

  showUp: function(){
    TweenMax.fromTo(this.container, 0.4, {autoAlpha: 0}, {autoAlpha: 1, ease: Power2.easeOut});
    TweenMax.staggerFromTo( this.listElements, 0.6, {autoAlpha: 0}, {autoAlpha: 1, ease: Power2.easeOut}, 0.2);

  },

  showLogo: function(){
    TweenMax.fromTo(this.logoContainer, 0.4, {x: -100, autoAlpha: 0}, {autoAlpha: 1, x: 0, ease: Power2.easeOut});
    TweenMax.fromTo(this.titleContainer , 0.4, {y: -50, autoAlpha: 0}, {autoAlpha: 1, y: 0, ease: Power2.easeOut});

  },

  goHome: function(){
    this.navigate('/');
  },


  hideLogo: function(){
    TweenMax.fromTo(this.logoContainer, 0.4, {autoAlpha: 0}, {autoAlpha: 1, x: -100, ease: Power2.easeOut});
    TweenMax.fromTo(this.titleContainer , 0.4, {autoAlpha: 0}, {autoAlpha: 1, y: -50, ease: Power2.easeOut});

  },
  
  navigate: function(route){
    this.farmer.harvest(route);
  },

  instanceComponents: function(){
    this.logoContainer = select('.logo-container', this.container);
    this.titleContainer = select('.title-container', this.container);


  },

  appendComponents: function(){

  },

  addListeners: function() {
    // for (var i = 0; i < this.listElements.length; i++) {
    //   this.listElements[i].addEventListener('mousedown', function(event){
    //     this.navigate(event.target.getAttribute('route'));
    //   }.bind(this));
    // }

    // this.logoContainer.addEventListener('mousedown', function(){
    //   if(this.farmer.getCurrentUrl() !== '/'){
    //     this.navigate('/');
    //   }
    // }.bind(this));

    // this.titleContainer.addEventListener('mousedown', function(){
    //   if(this.farmer.getCurrentUrl() !== '/'){
    //     this.navigate('/');
    //   }
    // }.bind(this));
  },

  resize: function(){

  },

  goOut: function(){
    TweenMax.fromTo(this.container, 0.4, {autoAlpha: 1}, {autoAlpha: 0, ease: Power2.easeOut});
    TweenMax.staggerFromTo( this.listElementsReverse, 0.4, {autoAlpha: 1}, {autoAlpha: 0, ease: Power2.easeOut}, 0.2);
  }
};
module.exports = Navbar;