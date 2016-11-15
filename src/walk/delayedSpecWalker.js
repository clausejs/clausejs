function delayedSpecWalker(delayedSpec, walkFn) {
  return {
    trailblaze: walkDelayedSpec,
    reconstruct: walkDelayedSpec,
  };

  function walkDelayedSpec(x, walkOpts) {
    var s = delayedSpec.get();
    if(s) {
      return walkFn(s, x, walkOpts);
    }
  }
}

module.exports = delayedSpecWalker;
