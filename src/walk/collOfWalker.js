var coerceIntoSpec = require('../utils/coerceIntoSpec');
var Problem = require('../models/Problem');
var isProblem = require('../utils/isProblem');
var isNum = require('../preds/isNum');

function collOfWalker(spec, walkFn) {
  var expr = spec.exprs[0];
  var opts = spec.opts;

  return {
    trailblaze: collOfTrailblaze,
    reconstruct: collOfReconstruct,
  };

  function collOfTrailblaze(x, walkOpts) {
    if(!Array.isArray(x)) {
      return new Problem(x, spec, [], 'collOf expects an array');
    } else {

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

      var problems = [];

      for (var i = 0; i < x.length; i += 1) {
        var r = walkFn(expr, x[i], walkOpts);
        if(isProblem(r)) {
          problems.push(r);
          break; //TODO
        }
      }

      if(problems.length > 0) {
        return new Problem(x, spec, problems, 'One or more elements failed collOf test');
      } else {
        return x;
      }
    }
  }

  function collOfReconstruct(guide, walkOpts) {
    var results = [];

    for (var i = 0; i < guide.length; i += 1) {
      var r = walkFn(expr, guide[i], walkOpts);
      results.push(r);
    }

    return results;
  }
}

module.exports = collOfWalker;
