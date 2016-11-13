var fnName = require('../utils/fnName');
var Problem = require('../models/Problem');

function predWalker(spec, walkFn) {
  return function predWalk(x, opts) {
    var { conform, instrument, trailblaze } = opts;
    if (conform || instrument || trailblaze) {
      var predFn = spec.exprs[0];
      if (predFn(x)) {
        return x;
      } else {
        return new Problem(x, spec, [], 'Predicate ' + fnName(predFn) + ' returns false on value ' + JSON.stringify(x));
      }
    } else {
      throw 'no impl';
    }
  }
}

module.exports = predWalker;
