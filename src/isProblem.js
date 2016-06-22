'use strict';

var Problem = require('./_Problem');

var isProblem = function(x) {
  return x instanceof Problem;
};

module.exports = isProblem;
