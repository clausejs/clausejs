var coerceIntoSpec = require('../utils/coerceIntoSpec');
var Problem = require('../models/Problem');
var isProblem = require('../utils/isProblem');
var isArray = require('isarray');
var isNum = require('../preds/isNum');

function collOfWalker(spec, walkFn) {
  var expr = spec.exprs[0];
  var opts = spec.opts;

  return function collOfWalk(x, walkOpts) {
    if(isArray(x)) {

      if(opts) {
        var { maxCount, minCount } = opts;

        if(isNum(maxCount) && x.length > maxCount) {
          return new Problem(x, spec, problems,
            `collOf: collection size ${x.length} exceeds maxCount ${maxCount}.`
          );
        }

        if(isNum(minCount) && x.length < minCount) {
          return new Problem(x, spec, problems,
            `collOf: collection size ${x.length} is less than minCount ${minCount}.`
          );
        }
      }

      var results = x.map(function(y) {
        return walkFn(expr, y, walkOpts);
      });

      var { conform, instrument } = walkOpts;

      if(conform || instrument) {
        var problems = results.filter(isProblem);

        if(problems.length === 0) {
          return results;
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
