function specRefWalker(specRef, walkFn) {

  return {
    trailblaze: walkSpecRef,
    reconstruct: walkSpecRef,
  };

  return function walkSpecRef(x, walkOpts) {
    var s = specRef.get();
    if(s) {
      return walkFn(ss, x, walkOpts);
    }
  }
}

module.exports = specRefWalker;
