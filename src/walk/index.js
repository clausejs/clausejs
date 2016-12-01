var oAssign = require( 'object-assign' );
var nfaWalker = require( './nfaWalker' );
var predWalker = require( './predWalker' );
var fspecWalker = require( './fspecWalker' );
var propsWalker = require( './propsWalker' );
var andWalker = require( './andWalker' );
var collOfWalker = require( './collOfWalker' );
var specRefWalker = require( './specRefWalker' );
var delayedSpecWalker = require( './delayedSpecWalker' );
var coerceIntoSpec = require( '../utils/coerceIntoSpec' );
var isProblem = require( '../utils/isProblem' );

function walk( spec, x, opts ) {
  var { phase, conform, instrument } = opts;
  var walker = _getWalker( spec );

  if ( !phase ) {
    // 2-pass algorithm:

    // in Pass 1 we just need to know if x validates to spec, and if so, how
    var intermediate = walker.trailblaze( x, oAssign( { phase: 'trailblaze' }, opts ) );
    if ( isProblem( intermediate ) ) {
      return intermediate;
    } else {
      // in Pass 2 we return conformed and/or instrumented results
      return walker.reconstruct( intermediate, oAssign( { phase: 'reconstruct' }, opts ) );
    }
  } else if ( walker[ phase ] ) {
    return walker[ phase ]( x, opts );
  } else {
    throw '!';
  }
}

function _getWalker( expr ) {
  var walker;
  var spec = coerceIntoSpec( expr );
  if ( [ 'OR', 'CAT', 'Z_OR_M', 'O_OR_M', 'Z_OR_O' ].indexOf( spec.type ) >= 0 ) {
    walker = nfaWalker;
  } else if ( [ 'COLL_OF' ].indexOf( spec.type ) >= 0 ) {
    walker = collOfWalker;
  } else if ( spec.type === 'PRED' ) {
    walker = predWalker;
  } else if ( spec.type === 'PROPS' ) {
    walker = propsWalker;
  } else if ( spec.type === 'AND' ) {
    walker = andWalker;
  } else if ( spec.type === 'SpecRef' ) {
    walker = specRefWalker;
  } else if ( spec.type === 'Delayed' ) {
    walker = delayedSpecWalker;
  } else if ( spec.type === 'FSPEC' ) {
    walker = fspecWalker;
  } else {
    throw 'unsupported type ' + spec.type;
  }

  var r = walker( spec, walk );
  return r;
}

module.exports = walk;
