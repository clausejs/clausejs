var fspec = require( '../core/fspec' );
var isPred = require( '../utils/isPred' );
var isSpec = require( '../utils/isSpec' );
var fnName = require( '../utils/fnName' );

function _fragments( expr, interceptor ) {
  if ( isPred( expr ) ) {
    return [ 'predicate:', fnName( expr ), '()' ];
  } else if ( isSpec( expr ) ) {
    let spec;
    if ( expr.type === 'Delayed' || expr.type === 'SpecRef' ) {
      spec = expr.get();
    } else {
      spec = expr;
    }
    return [ expr.type.toLowerCase(), '(', _processInner( expr, interceptor ), ')' ];
  } else {
    throw new Error( 'Argument must be an expression' );
  }
}

function _processInner( spec, interceptor ) {
  if ( [ 'OR', 'CAT', 'Z_OR_M', 'O_OR_M', 'Z_OR_O' ].indexOf( spec.type ) >= 0 ) {
    walker = nfaWalker;
  } else if ( [ 'COLL_OF' ].indexOf( spec.type ) >= 0 ) {
    return 'todo';
  } else if ( spec.type === 'PRED' ) {
    walker = predWalker;
  } else if ( spec.type === 'WALL' ) {
    walker = wallWalker;
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
}

module.exports = describe;
