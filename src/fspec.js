'use strict';
var Problem = require('./_Problem');

var fspec = function(fnSpec) {
  return function(fn) {
    return function() {
      fn.apply(null, arguments);
    }
  }
};

module.exports = fspec;
