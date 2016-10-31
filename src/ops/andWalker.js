var coerceIntoSpec = require('../utils/coerceIntoSpec');
var Problem = require('../models/Problem');
var isProblem = require('../utils/isProblem');

function andWalker(spec, walkFn) {
  var exprs = spec.exprs;

  return function andWalk(data, walkOpts) {
    var results = exprs.map(function(e) {
      e = coerceIntoSpec(e);
      return walkFn(e, data, walkOpts);
    });

    var { conform } = walkOpts;

    if(conform) {
      var problems = results.filter(isProblem);

      if(problems.length === 0) {
        return data;
      } else {
        return new Problem(data, exprs, problems, 'One or more expressions failed AND test');
      }
    } else {
      throw 'no impl';
    }

  }
}

module.exports = andWalker;
