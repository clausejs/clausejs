function wallWalker( wallSpec, walkFn ) {
  return {
    trailblaze: wallWalk,
    reconstruct: wallWalk,
  }

  function wallWalk( x, opts ) {
    var [ spec ] = wallSpec.exprs;
    return walkFn( spec, x, opts );
  }
}

module.exports = wallWalker;
