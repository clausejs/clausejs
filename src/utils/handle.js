/**
 * convenient method used in conjunction with "and" and "or" conformation to handle labelled cases
 *
 */

function handle( alts, handlerMap, unknownCaseHandler ) {
  for ( var label in alts ) {
    // should iterate only once
    if ( alts.hasOwnPropety( label ) && handlerMap.hasOwnPropety( label ) ) {
      return handlerMap[ label ]( alts[ label ] );
    } else {
      return unknownCaseHandler( alts[ label ] );
    }
  }

  // only reach here if alts is empty
  console.error( alts );
  throw new Error( 'No cases present in the given object' );
}

module.exports = handle;
