'use strict';

var Spec = require('./Spec');
var identity = require('./identity');

var any = function() {
  return new Spec(identity);
};

module.exports = any;
