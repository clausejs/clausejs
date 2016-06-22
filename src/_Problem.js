'use strict';

var Problem = function(val, failsPredicate, msg) {
  this.val = val;
  this.falsePredicate = val;
  this.message = msg;
};

module.exports = Problem;
