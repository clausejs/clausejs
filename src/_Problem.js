function Problem(val, failsPredicate, msg) {
  this.val = val;
  this.name = 'Problem';
  this.falsePredicate = failsPredicate;
  this.problemMessage = msg;
  this.stack = (new Error()).stack;
  this.message = msg + '; val: ' + JSON.stringify(val);
};

Problem.prototype = new Error;

module.exports = Problem;
