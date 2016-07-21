'use strict';

var Spec = require('./_Spec');
var identity = require('./identity');

function any() {
  return new Spec(identity);
};

module.exports = any;
