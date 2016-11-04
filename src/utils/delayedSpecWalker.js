var coerceIntoSpec = require('../utils/coerceIntoSpec');

function delayedSpecWalker(delayedSpec, walkFn) {
  return function walkDelayedSpec(x, walkOpts) {
    var s = delayedSpec.get();
    if(s) {
      var ss = coerceIntoSpec(s);
      return walkFn(ss, x, walkOpts);
    }
  }
}

module.exports = delayedSpecWalker;
