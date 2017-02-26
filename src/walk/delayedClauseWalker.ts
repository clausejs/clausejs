export default function delayedClauseWalker( delayedClause, walkFn ) {
  return {
    trailblaze: walkDelayedClause,
    reconstruct: walkDelayedClause,
  };

  function walkDelayedClause( x, walkOpts ) {
    var s = delayedClause.get();
    if ( s ) {
      return walkFn( s, x, walkOpts );
    }
  }
}