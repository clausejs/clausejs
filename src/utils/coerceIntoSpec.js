var isPred = require( './isPred' );
var isSpec = require( './isSpec' );
var isSpecRef = require( './isSpecRef' );
var isDelayedSpec = require( './isDelayedSpec' );
var Spec = require( '../models/Spec' );
var Problem = require( '../models/Problem' );
var fnName = require( './fnName' );

var SPEC_TYPE_PRED = 'PRED';

function coerceIntoSpec( expr ) {
  if ( isSpec( expr ) || isSpecRef( expr ) || isDelayedSpec( expr ) ) {
    return expr;
  } else if ( isPred( expr ) ) {
    return _wrap( expr );
  } else {
    throw new Error( 'Expression must either be a Spec object or a predication function that returns true or false. ' );
  }
}

function _wrap( pred ) {
  return new Spec( {
    type: SPEC_TYPE_PRED,
    exprs: [ pred ],
    fragments: [ pred ],
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

module.exports = coerceIntoSpec;
