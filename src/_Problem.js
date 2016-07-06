'use strict';

var Problem = function(val, failsPredicate, msg) {
  this.val = val;
  this.name = 'Problem';
  this.falsePredicate = val;
  this.message = msg;
  this.stack = (new Error()).stack;
};

Problem.prototype = new Error;

module.exports = Problem;
