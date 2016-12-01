var coerceIntoSpec = require( './coerceIntoSpec' );

module.exports = function specFromAlts( alts ) {
  if ( !alts ) {

  }
  if ( alts.spec ) {
    return alts.spec;
  } else if ( alts.pred ) {
    return coerceIntoSpec( alts.pred );
  } else if ( alts.specRef ) {
    return alts.specRef;
  } else if ( alts.delayedSpec ) {
    return alts.delayedSpec;
  } else {
    console.error( alts );
    throw 'Not implemented';
  }
}
