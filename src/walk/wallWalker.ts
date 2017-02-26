export default function wallWalker( wallClause, walkFn ) {
  return {
    trailblaze: wallWalk,
    reconstruct: wallWalk,
  }

  function wallWalk( x, opts ) {
    var [ clause ] = wallClause.exprs;
    return walkFn( clause, x, opts );
  }
}
