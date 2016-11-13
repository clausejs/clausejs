function specRefWalker(specRef, walkFn) {
  return function walkSpecRef(x, walkOpts) {
    var s = specRef.get();
    if(s) {
      return walkFn(ss, x, walkOpts);
    }
  }
}

module.exports = specRefWalker;
