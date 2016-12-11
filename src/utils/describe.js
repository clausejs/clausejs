var fspec = require( '../core/fspec' );
var isPred = require( '../utils/isPred' );
var isSpec = require( '../utils/isSpec' );
var fnName = require( '../utils/fnName' );
var isStr = require( '../preds/isStr' );
var identity = require( '../utils/identity' );

function describe( expr, interceptor ) {
  return _fragments( expr, interceptor ).join( '' );
}

function _fragments( expr, interceptor ) {
  if ( interceptor ) {
    let interceptR = interceptor( expr );
    if ( interceptR ) {
      return interceptR;
    }
  }
  if ( isPred( expr ) ) {
    return [ fnName( expr ), '()' ];
  } else if ( expr.type === 'PRED' ) {
    return _fragments( expr.opts.predicate, interceptor );
  } else if ( isSpec( expr ) ) {
    if ( expr.type === 'Delayed' || expr.type === 'SpecRef' ) {
      return _fragments( expr.get(), interceptor );
    } else {
      return [ expr.type.toLowerCase(), '(', ]
        .concat( _processInner( expr, interceptor ) )
        .concat( [ ')' ] );
    }
  } else {
    console.error( expr );
    throw new Error( 'Argument must be an expression' );
  }
}

function _processInner( spec, interceptor ) {
  return spec.fragments.reduce(
    ( acc, piece ) =>
      isStr( piece ) ? acc.concat( piece ) :
      acc.concat( _fragments( piece, interceptor ) ), []
    );
}

module.exports = describe;
