var domready = require('domready');
var farmer = require('./farmer.js');

domready(function () {
    farmer.seed();
    farmer.feed(farmer);
});
