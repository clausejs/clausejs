'use strict';

var Problem = require('./_Problem');

function isProblem(x) {
  return x instanceof Problem;
};

module.exports = isProblem;
