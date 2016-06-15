'use strict';

var Spec = require('./_Spec');
var identity = require('./identity');

var any = function() {
  return new Spec(identity);
};

module.exports = any;
