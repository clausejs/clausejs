var oAssign = require( 'object-assign' );
var nfaWalker = require( './nfaWalker' );
var anyWalker = require( './anyWalker' );
var predWalker = require( './predWalker' );
var wallWalker = require( './wallWalker' );
var fclauseWalker = require( './fclauseWalker' );
var shapeWalker = require( './shapeWalker' );
var andWalker = require( './andWalker' );
var collOfWalker = require( './collOfWalker' );
var mapOfWalker = require( './mapOfWalker' );
var clauseRefWalker = require( './clauseRefWalker' );
var delayedClauseWalker = require( './delayedClauseWalker' );
var coerceIntoClause = require( '../utils/coerceIntoClause' );
var isProblem = require( '../utils/isProblem' );

function walk( clause, x, opts ) {
  var { phase } = opts;
  var walker = _getWalker( clause );
  if ( !phase ) {
    // 2-pass algorithm:

    // in Pass 1 we just need to know if x validates to clause, and if so, how
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
  'ANY': anyWalker,
  'Z_OR_M': nfaWalker,
  'O_OR_M': nfaWalker,
  'Z_OR_O': nfaWalker,
  'PRED': predWalker,
  'WALL': wallWalker,
  'SHAPE': shapeWalker,
  'AND': andWalker,
  'SPEC_REF': clauseRefWalker,
  'DELAYED': delayedClauseWalker,
  'FSPEC': fclauseWalker,
  'MAP_OF': mapOfWalker,
}

function _getWalker( expr ) {

  var clause = coerceIntoClause( expr );
  var walker = walkerMap[ clause.type ];

  if ( !walker ) {
    throw 'unsupported type ' + clause.type;
  }

  var r = walker( clause, walk );
  return r;
}

module.exports = walk;
