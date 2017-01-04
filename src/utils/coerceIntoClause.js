var isPred = require( './isPred' );
var isClause = require( './isClause' );
var isClauseRef = require( './isClauseRef' );
var isDelayedClause = require( './isDelayedClause' );
var Clause = require( '../models/Clause' );
var Problem = require( '../models/Problem' );
var fnName = require( './fnName' );

var CLAUSE_TYPE_PRED = 'PRED';

function coerceIntoClause( expr ) {
  if ( isClause( expr ) || isClauseRef( expr ) || isDelayedClause( expr ) ) {
    return expr;
  } else if ( isPred( expr ) ) {
    return _wrap( expr );
  } else {
    console.error( expr );
    throw new Error( 'Expression must either be a Clause object or a predication function that returns true or false. ' );
  }
}

function _wrap( pred ) {
  return new Clause( {
    type: CLAUSE_TYPE_PRED,
    exprs: [ pred ],
    opts: {
      predicate: pred,
    },
    conformFn: predConformer( pred ),
  } );
}

function predConformer( pred ) {
  return function conformPred( x ) {
    if ( pred( x ) ) {
      return x;
    } else {
      return new Problem( x, pred, [], 'Predicate ' + fnName( pred ) + ' returns false' );
    }
  }
}

module.exports = coerceIntoClause;
