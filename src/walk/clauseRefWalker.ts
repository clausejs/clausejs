export default function clauseRefWalker( clauseRef, walkFn ) {

  return {
    trailblaze: walkClauseRef,
    reconstruct: walkClauseRef,
  };

  function walkClauseRef( x, walkOpts ) {
    var s = clauseRef.get();
    if ( s ) {
      return walkFn( s, x, walkOpts );
    }
  }
}
