var fnName = require('../utils/fnName');
var Problem = require('../models/Problem');

function predWalker(spec, walkFn) {
  return {
    trailblaze: predTraiblaze,
    reconstruct: predReconstruct,
  }

  function predTraiblaze(x, opts) {
    var { conform, instrument, trailblaze } = opts;
    var predFn = spec.exprs[0];
    if (!predFn(x)) {
      return new Problem(x, spec, [], 'Predicate ' + fnName(predFn) + ' returns false on value ' + JSON.stringify(x));
    } else {
      return x;
    }

  }

  function predReconstruct(x, opts) {
    return x;
  }
}

module.exports = predWalker;
