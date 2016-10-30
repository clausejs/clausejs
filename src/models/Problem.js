function Problem(val, failsPredicate, subproblems, msg) {
  if(arguments.length !== 4) {
    throw 'Problem arg len err';
  }

  this.val = val;
  this.name = 'Problem';
  this.failsPredicate = failsPredicate;
  this.problemMessage = msg;
  this.stack = (new Error()).stack;
  this.message = msg;
  this.subproblems = subproblems;
};

Problem.prototype = new Error;

module.exports = Problem;
