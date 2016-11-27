var isProblem = require('./isProblem');
var conform = require('./conform'); // TODO : replace with checkProblem

module.exports = function enforce(spec, x) {
  const r = conform(x);
  if (isProblem(r)) {
    throw r;
  }
};
