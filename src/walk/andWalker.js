var Problem = require('../models/Problem');
var isProblem = require('../utils/isProblem');
var specFromAlts = require('../utils/specFromAlts');

function andWalker(spec, walkFn) {
  var exprs = spec.exprs.map(specFromAlts);

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
    //TODO: implement conformed AND
    return guide;
  }
}

module.exports = andWalker;
