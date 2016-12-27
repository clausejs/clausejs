var isPred = require( '../utils/isPred' );
var isSpec = require( '../utils/isSpec' );
var fnName = require( '../utils/fnName' );
var isStr = require( '../preds/isStr' );

var multipleArgFragmenter = ( { opts: { named }, exprs } ) => {
  if ( exprs.length === 0 ) {
  //empty case
    return [];
  } else if ( named ) {
    return exprs.reduce(
      ( curr, { name, expr }, idx ) =>
        curr
          .concat( [ `"${name}"`, ', ', expr, ] )
          .concat( idx < exprs.length - 1 ? [ ', ' ] : [] )
        , [] );
  } else {
    return exprs.reduce(
      ( curr, { expr }, idx ) =>
        curr
          .concat( [ expr ] )
          .concat( idx < exprs.length - 1 ? [ ', ' ] : [] ),
        [] );
  }
};

var singleArgFragmenter = ( { opts: { enclosedSpec } } ) => [ enclosedSpec ];

var Fragmenters = {
  'PRED': ( { opts: { predicate } } ) => [ pred ],
  'WALL': ( { opts: { enclosedSpec } } ) => [ enclosedSpec ],
  // TODO
  'AND': ( { exprs } ) => exprs,
  'CAT': multipleArgFragmenter,
  'OR': multipleArgFragmenter,
  'Z_OR_M': singleArgFragmenter,
  'O_OR_M': singleArgFragmenter,
  'Z_OR_O': singleArgFragmenter,
  'ANY': () => [],
  // TODO
  'MAP_OF': () => [],
  // TODO
  'SHAPE': () => [],
  // TODO: fix comma
  'FSPEC': ( { args, ret, fn } ) => [].concat( args ? [ 'args: ', args ] : [] )
    .concat( ret ? [ 'ret: ', ret ] : [] )
    .concat( fn ? [ 'fn: ', fnName( fn ), '()' ] : [] ),

};

function describe( expr, interceptor ) {
  return _strFragments( expr, interceptor ).join( '' );
}

function _strFragments( expr, interceptor ) {
  if ( interceptor ) {
    let interceptR = interceptor( expr );
    if ( interceptR ) {
      return interceptR;
    }
  }
  if ( isPred( expr ) ) {
    return [ fnName( expr ), '()' ];
  } else if ( expr.type === 'PRED' ) {
    return _strFragments( expr.opts.predicate, interceptor );
  } else if ( isSpec( expr ) ) {
    if ( expr.type === 'DELAYED' || expr.type === 'SPEC_REF' ) {
      return _strFragments( expr.get(), interceptor );
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
  // TODO: remove first part
  var fragments = Fragmenters[ spec.type ]( spec );
  return fragments.reduce(
    ( acc, piece ) =>
      isStr( piece ) ? acc.concat( piece ) :
      acc.concat( _strFragments( piece, interceptor ) ), []
    );
}

module.exports = describe;
