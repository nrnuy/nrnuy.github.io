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
var model = require('./hero-model.js');

//Constants
var speed = 500;
var aleatory = 10;
var mY = 0;
var mX = 0;

function Hero() {
  this.create();
}
Hero.prototype = {

  create: function () {

    this.container = domify(hbs.compile(fs.readFileSync(__dirname + '/hero.hbs', 'utf8'))(model));
    this.title = select('.title', this.container);
    this.subtitle = select('.subtitle', this.container);
    this.downArrow = select('.down-arrow', this.container);
    this.lema = select('.lema', this.container);
    this.onDownArrowClicked = new Signal();
    this.instanceComponents();
    this.appendComponents();
    this.addListeners();

  },

  showUp: function(){
    TweenMax.staggerFromTo([this.title, this.subtitle, this.downArrow,this.lema], 0.4, {autoAlpha: 0, y: 20},
     {autoAlpha: 1, y: 0}, 0.2);
  },

  instanceComponents: function(){
    loadsvg(model.downArrow, function (err, svg) {
      if (!err) {
        this.downArrow.appendChild(svg);
      }
    }.bind(this));
  },

  appendComponents: function(){

  },

  animateTrail: function(e) {

    // var image = document.createElement("img");
    // image.src = './assets/images/logo.png';
    // document.body.appendChild(image);
    // image.style.position = 'absolute';
    // image.style.opacity = '0';
    // image.style.zIndex = -1;
    // image.style.top =  e.pageY+'px';
    // image.style.left = e.pageX +'px';

    // TweenMax.to(image, 0.2, {opacity:1});
    
    // setTimeout(function(){ 
    //     TweenMax.to(image, 0.2, {opacity:0, onComplete:function(){
    //         image.remove();
    //     }.bind(this)});
    // }, speed);

  },

  addListeners: function() {
    this.container.addEventListener('mousemove', this.animateTrail);
    this.downArrow.addEventListener('mousedown', function(){this.onDownArrowClicked.dispatch();}.bind(this));
  },

  resize: function(){

  },

  goOut: function(){
    var animateBackground = function(){
      TweenMax.to(this.backgroundLogo, 0.4, {opacity:0});
    };
    TweenMax.staggerFromTo([this.downArrow, this.subtitle, this.title], 0.4, {autoAlpha: 1, y: 0},
     {autoAlpha: 0, y: 20}, 0.2);
  }
};
module.exports = Hero;