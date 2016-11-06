function delayedSpecWalker(delayedSpec, walkFn) {
  return function walkDelayedSpec(x, walkOpts) {
    var s = delayedSpec.get();
    if(s) {
      return walkFn(s, x, walkOpts);
    }
  }
}

module.exports = delayedSpecWalker;
