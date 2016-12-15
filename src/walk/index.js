var oAssign = require( 'object-assign' );
var nfaWalker = require( './nfaWalker' );
var predWalker = require( './predWalker' );
var wallWalker = require( './wallWalker' );
var fspecWalker = require( './fspecWalker' );
var shapeWalker = require( './shapeWalker' );
var andWalker = require( './andWalker' );
var collOfWalker = require( './collOfWalker' );
var mapOfWalker = require( './mapOfWalker' );
var specRefWalker = require( './specRefWalker' );
var delayedSpecWalker = require( './delayedSpecWalker' );
var coerceIntoSpec = require( '../utils/coerceIntoSpec' );
var isProblem = require( '../utils/isProblem' );

function walk( spec, x, opts ) {
  var { phase } = opts;
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

const walkerMap = {
  'OR': nfaWalker,
  'CAT': nfaWalker,
  'COLL_OF': collOfWalker,
  'Z_OR_M': nfaWalker,
  'O_OR_M': nfaWalker,
  'Z_OR_O': nfaWalker,
  'PRED': predWalker,
  'WALL': wallWalker,
  'SHAPE': shapeWalker,
  'AND': andWalker,
  'SPEC_REF': specRefWalker,
  'Delayed': delayedSpecWalker,
  'FSPEC': fspecWalker,
}

function _getWalker( expr ) {

  var spec = coerceIntoSpec( expr );
  var walker = walkerMap[ spec.type ];

  if ( !walker ) {
    throw 'unsupported type ' + spec.type;
  }

  var r = walker( spec, walk );
  return r;
}

module.exports = walk;
