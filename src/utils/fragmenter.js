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

var singleArgFragmenter = ( { opts: { enclosedClause } } ) => [ enclosedClause ];

var Fragmenters = {
  'PRED': ( { opts: { predicate } } ) => [ predicate ],
  'WALL': ( { opts: { enclosedClause } } ) => [ enclosedClause ],
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

function getFragments( clause, interceptor ) {
  if ( interceptor ) {
    let interceptR = interceptor( clause );
    if ( interceptR ) {
      return interceptR;
    }
  } else {
    return Fragmenters[ clause.type ]( clause );
  }
}

module.exports = getFragments;
