//Model
var fs = require('fs');
//Routes
var model = require('./farmer-config.js');
var Signal = require('signals');

var Farmer = (function() {

  var sections = {};
  var currentSection;
  var variableString = '/#';
  var routes = model.routes;
  var defaultSection  = model.default;
  var currentUrl = '/';

  function addGlobalListeners() {
    window.onresize = function() {
      handleResize();
    }.bind(this);

    window.onload = function() {
      handlePreloader();
    }.bind(this);

    window.onhashchange = function(e) {
      this.onRouteChanged.dispatch();
    }.bind(this);

    this.onRouteChanged = new Signal();
  }

  function instancePreloader() {
    this.preloader =  new model.preloader.seed();
    this.preloader.create();
    document.body.appendChild(this.preloader.container);
    this.preloader.instanceComponents();
    this.preloader.appendComponents();
    this.preloader.addListeners();
  }

  function instanceSections () {
    for (var key in routes) {
      sections[key] = {};
      sections[key].instance =  new routes[key].seed();
      sections[key].instance.create();
    }
  }

  function handlePreloader () {
    document.body.appendChild(sections[defaultSection].instance.container);
    this.preloader.goOut();
    currentSection  = sections[defaultSection].instance;
    window.location.href =  variableString + defaultSection;

    procedeShowUp(currentSection);
  }
  
  function procedeShowUp (section) {
    section.showUp();
  }

  function procedeGoOut (section) {
    section.goOut();
  }

  function handleResize () {
    for (var key in this.sections) {
      sections[key].instance.resize(window.innerWidth, window.innerHeight);
    }
  }

  return {

    getCurrentUrl: function(){
      return currentUrl;
    },

    harvest: function (id) {
      procedeGoOut(currentSection);
      currentSection  = sections[id].instance;
      currentUrl = id;
      window.location.href =  variableString + id;
      document.body.appendChild(currentSection.container);
      procedeShowUp(currentSection);
    },

    seed: function () {
      instancePreloader();
      instanceSections();
      addGlobalListeners();
    },

    feed: function (framework) {
      for (var key in routes) {
        sections[key].instance.framework = framework;
        sections[key].instance.instanceComponents();
        sections[key].instance.appendComponents();
        sections[key].instance.addListeners();
      }
    }
  };

})();

module.exports = Farmer;