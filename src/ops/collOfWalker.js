var coerceIntoSpec = require('../utils/coerceIntoSpec');
var Problem = require('../models/Problem');
var isProblem = require('../utils/isProblem');
var isArray = require('isarray');

function collOfWalker(spec, walkFn) {
  var expr = spec.exprs[0];

  return function collOfWalk(x, walkOpts) {
    if(isArray(x)) {
      var results = x.map(function(y) {
        return walkFn(expr, y, walkOpts);
      });

      var { conform, instrument } = walkOpts;

      if(conform || instrument) {
        var problems = results.filter(isProblem);

        if(problems.length === 0) {
          return x;
        } else {
          return new Problem(x, spec, problems, 'One or more elements failed collOf test');
        }
      } else {
        throw 'no impl';
      }
    } else {
      return new Problem(x, spec, [], 'collOf expects an array');
    }
  }
}

module.exports = collOfWalker;
