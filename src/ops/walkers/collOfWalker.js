var coerceIntoSpec = require('../../utils/coerceIntoSpec');
var Problem = require('../../models/Problem');
var isProblem = require('../../utils/isProblem');
var isNum = require('../../preds/isNum');

function collOfWalker(spec, walkFn) {
  var expr = spec.exprs[0];
  var opts = spec.opts;

  return function collOfWalk(x, walkOpts) {
    var { conform, instrument, trailblaze } = walkOpts;

    if(conform || instrument || trailblaze) {
      if(Array.isArray(x)) {

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

        var problems, results;
        if(!trailblaze) {
          problems = [];
        }

        results = [];

        for (var i = 0; i < x.length; i += 1) {
          var r = walkFn(expr, x[i], walkOpts);
          if(isProblem(r)) {
            if(trailblaze) {
              return r;
            } else {
              problems.push(r);
            }
          } else {
            results.push(r);
          }
        }

        if(!problems || problems.length === 0) {
          return results;
        } else {
          return new Problem(x, spec, problems, 'One or more elements failed collOf test');
        }

      } else {
        return new Problem(x, spec, [], 'collOf expects an array');
      }
    } else {
      throw 'no impl';
    }
  }
}

module.exports = collOfWalker;
