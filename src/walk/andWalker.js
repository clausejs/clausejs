var Problem = require('../models/Problem');
var isProblem = require('../utils/isProblem');

function andWalker(spec, walkFn) {
  var exprs = spec.exprs;

  return {
    trailblaze: andTrailblaze,
    reconstruct: andReconstruct,
  };

  function andTrailblaze(data, walkOpts) {
    var { trailblaze } = walkOpts;

    var r = data;
    var problems = [];

    for (var i = 0; i < exprs.length; i += 1) {
      r = walkFn(exprs[i], data, walkOpts);
      if(isProblem(r)) {
        problems.push(r);
        break; //TODO: better handle this
      }
    }

    if(!problems || problems.length === 0) {
      return r;
    } else {
      return new Problem(data, exprs, problems, 'One or more expressions failed AND test');
    }
  }

  function andReconstruct(guide, walkOpts) {
    var r = guide;

    for (var i = 0; i < exprs.length; i += 1) {
      r = walkFn(exprs[i], r, walkOpts);
    }

    return r;
  }
}

module.exports = andWalker;
