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
var model = require('./content-model.js');

function Content() {
  this.create();
}
Content.prototype = {

  create: function () {

    this.container = domify(hbs.compile(fs.readFileSync(__dirname + '/content.hbs', 'utf8'))(model));
    this.instanceComponents();
    this.appendComponents();
    this.onReachedMyHeight = new Signal();
    this.addListeners();
    this.isRevealed = false;
    this.isAnimating = false;

  },

  showUp: function(){
    TweenMax.staggerFromTo([this.title, this.subtitle, this.downArrow], 0.4, {autoAlpha: 0, y: 20}, {autoAlpha: 1, y: 0}, 0.2);
  },

  instanceComponents: function(){
    this.sections = select.all('.section', this.container);

    for (var i = 0; i < this.sections.length; i++) {
      this.sections[i].hide = true;
    }
  },

  appendComponents: function(){

  },

  addListeners: function() {
    window.addEventListener("scroll", this.checkPosition.bind(this));
    window.addEventListener('scroll', this.animateSection.bind(this));
    var tecnoItems = select.all('.third li', this.sections[3]);
    for (var i = 0; i < tecnoItems.length; i++) {
      tecnoItems[i].addEventListener('mouseenter', this.handleMouseEnter.bind(this));
      tecnoItems[i].addEventListener('mouseleave', this.handleMouseLeave.bind(this));

    }
  },

  checkPosition: function(e) {
    var top = (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0);
    if (top > this.container.offsetTop) {
      if (!this.isRevealed) {
        this.isRevealed = true;
        this.onReachedMyHeight.dispatch(true);
      }

    } else {
      if (this.isRevealed) {
        this.onReachedMyHeight.dispatch(false);
      }
      this.isRevealed = false;
    }
  },

  handleMouseEnter: function(event){
    TweenMax.to(event.target, 0.4,{scaleX:1.1, scaleY:1.1, autoAlpha: 1, y: 0, ease: Power2.easeOut});
  },

  handleMouseLeave: function(event){
    TweenMax.to(event.target, 0.4,{scaleX:1, scaleY:1, autoAlpha: 0.6, y: 0, ease: Power2.easeOut});
  },

  showUpSection: function(sectionID) {
    
    switch(sectionID){
      case 0:
        TweenMax.fromTo(this.sections[0], 0.4, {y: 100},{autoAlpha: 1, y: 0, ease: Power2.easeOut, onComplete: function(){
          this.isAnimating = false;
        }.bind(this)});
        break;
      case 1:
        TweenMax.set(this.sections[1], {autoAlpha: 1});
        TweenMax.fromTo(this.sections[1], 0.6, {x: -1000},{autoAlpha: 1, x: 0, ease: Power2.easeOut, onComplete: function(){
          this.isAnimating = false;
        }.bind(this)});
        break;
      case 2:
        TweenMax.set(this.sections[2], {autoAlpha: 1});
        TweenMax.fromTo(this.sections[2], 0.6, {x: window.innerWidth},{autoAlpha: 1, x: 0, ease: Power2.easeOut, onComplete: function(){
          this.isAnimating = false;
        }.bind(this)});
        break;
      case 3:
        TweenMax.set(this.sections[3], {autoAlpha: 1});
        TweenMax.staggerFromTo(select.all('li',this.sections[3]), 0.2, {y: 200},{autoAlpha: 0.8, y: 0, ease: Power2.easeOut}, 0.08, function(){
          this.isAnimating = false;
        }.bind(this));
        break;
      default:
        break;
    }
  },

  animateSection: function() {
    var scrollTop = window.scrollY;

    if (!this.isAnimating) {
      for (var i = 0; i < this.sections.length; i++) {
        var section = this.sections[i];
        var timeToShow = (section.offsetTop - 400 < scrollTop);
        var timeToHide = (section.offsetTop - 400 > scrollTop);
        if ( timeToShow && section.hide) {
          section.hide = false;
          this.isAnimating = true;
          this.showUpSection(i);
        } 
      }
    }
  },

  resize: function(){

  },

  goOut: function(){

  }
};
module.exports = Content;