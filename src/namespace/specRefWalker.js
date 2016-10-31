var coerceIntoSpec = require('../utils/coerceIntoSpec');

function specRefWalker(specRef, walkFn) {
  return function walkSpecRef(x, walkOpts) {
    var s = specRef.get();
    if(s) {
      var ss = coerceIntoSpec(s);
      return walkFn(ss, x, walkOpts);
    }
  }
}

module.exports = specRefWalker;
