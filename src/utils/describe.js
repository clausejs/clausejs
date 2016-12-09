var fspec = require( '../core/fspec' );
var isPred = require( '../utils/isPred' );
var isSpec = require( '../utils/isSpec' );
var fnName = require( '../utils/fnName' );
var isStr = require( '../preds/isStr' );

function describe(expr) {
  return _fragments(expr).join(' ');
}

function _fragments( expr, interceptor ) {
  if ( isPred( expr ) ) {
    return [ 'predicate:', fnName( expr ), '()' ];
  } else if ( isSpec( expr ) ) {
    if ( expr.type === 'Delayed' || expr.type === 'SpecRef' ) {
      return _fragments(expr.get(), interceptor);
    } else {
      return [ expr.type.toLowerCase(), '(',].concat( _processInner( expr, interceptor ),).concat([ ')' ]);
    }
  } else {
    throw new Error( 'Argument must be an expression' );
  }
}

function _processInner( spec, interceptor ) {
  return spec.fragments.map( ( piece ) => isStr( piece ) ? piece : _fragments( piece, interceptor ) );
}

module.exports = describe;
