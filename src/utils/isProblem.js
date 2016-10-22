

var Problem = require('../models/Problem');

function isProblem(x) {
  return x instanceof Problem;
};

module.exports = isProblem;
