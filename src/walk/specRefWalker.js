function specRefWalker(specRef, walkFn) {

  return {
    trailblaze: walkSpecRef,
    reconstruct: walkSpecRef,
  };

  function walkSpecRef(x, walkOpts) {
    var s = specRef.get();
    if(s) {
      return walkFn(s, x, walkOpts);
    }
  }
}

module.exports = specRefWalker;
