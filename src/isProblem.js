'use strict';

var Problem = require('./Problem');

var isProblem = function(x) {
  return x instanceof Problem;
};

module.exports = isProblem;
