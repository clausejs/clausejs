var fnName = require( './fnName' );
var clauseFromAlts = require( './clauseFromAlts' );
const SEPARATOR = '___CLAUSEJS_SEPARATOR___';

function LevelIn( lvl ) {
  this.level = lvl;
  this.isLevelIn = true;
}

function LevelOut( lvl ) {
  this.level = lvl;
  this.isLevelOut = true;
}

var multipleArgFragmenter = ( { opts: { named }, exprs } ) => {
  if ( exprs.length === 0 ) {
  //empty case
    return [];
  } else if ( named ) {
    return exprs.reduce(
      ( curr, { name, expr }, idx ) =>
        curr
          .concat( [ `"${name}"`, ', ', expr, ] )
          .concat( idx < exprs.length - 1 ? [ ', ', SEPARATOR ] : [] )
        , [] );
  } else {
    return exprs.reduce(
      ( curr, { expr }, idx ) =>
        curr
          .concat( [ expr ] )
          .concat( idx < exprs.length - 1 ? [ ', ', SEPARATOR ] : [] ),
        [] );
  }
};

var singleArgFragmenter = ( { opts: { enclosedClause } } ) =>
  [ enclosedClause ];

var Fragmenters = {
  'PRED': ( { opts: { predicate } } ) => [ predicate ],
  'WALL': ( { opts: { enclosedClause } } ) => [ enclosedClause ],
  // TODO
  'AND': ( { opts: { conformedExprs } } ) => interpose( conformedExprs.map( clauseFromAlts ), [ ', ', SEPARATOR ] ),
  'CAT': multipleArgFragmenter,
  'OR': multipleArgFragmenter,
  'Z_OR_M': singleArgFragmenter,
  'O_OR_M': singleArgFragmenter,
  'Z_OR_O': singleArgFragmenter,
  'COLL_OF': singleArgFragmenter,
  'ANY': () => [],
  // TODO
  'MAP_OF': () => [],
  // TODO
  'SHAPE': ( { opts: { conformedArgs: { shapeArgs: { optionalFields: { opt, optional } = {}, requiredFields: { req, required } = {} } } } } ) => {

    return [ '{ ', SEPARATOR, new LevelIn( 1 ) ]
      .concat(
        _trimTrailingSeparator(
          [].concat( ( req || required ) ? [ 'required: ' ].concat( _fieldDefToFrags( ( req || required ) ) ).concat( [ ', ', SEPARATOR ] ) : [] )
          .concat( ( opt || optional ) ? [ 'optional: ' ].concat( _fieldDefToFrags( ( opt || optional ) ) ).concat( [ ', ', SEPARATOR ] ) : [] )
        )
      )
      .concat( [ new LevelOut( 1 ), ' }' ] )
  },
  'FCLAUSE': ( { opts: { args, ret, fn } } ) =>
      [ '{ ', SEPARATOR, new LevelIn( 1 ) ].concat(
        _trimTrailingSeparator(
          [].concat( args ? [ 'args: ', args, ', ', SEPARATOR ] : [] )
            .concat( ret ? [ 'ret: ', ret, ', ', SEPARATOR ] : [] )
            .concat( fn ? [ 'fn: ', fnName( fn ), '()', ', ', SEPARATOR ] : [] )
        )
      )
      .concat( [ new LevelOut( 1 ), SEPARATOR, ' }' ] ),
};

function _fieldDefToFrags( { fieldDefs: { fields } } ) {
  var r = [ '{ ', SEPARATOR, new LevelIn( 1 ) ];
  for ( let key in fields ) {
    if ( fields.hasOwnProperty( key ) ) {
      r.push( `"${key}"` );
      r.push( ': ' );
      const { keyValExprPair, valExpressionOnly } = fields[ key ];
      if ( keyValExprPair ) {
        let { keyExpression, valExpression } = keyValExprPair;
        r = r.concat( [ '[', ] )
          .concat( [
            SEPARATOR, '<keyExpression>: ', clauseFromAlts( keyExpression ), ', ',
            SEPARATOR, '<valExpression>: ', clauseFromAlts( valExpression ) ] )
          .concat( [ ']' ] );
      } else if ( valExpressionOnly ) {
        r.push( clauseFromAlts( valExpressionOnly ) );
      }
      r.push( ', ' );
      r.push( SEPARATOR );
    }
  }
  return r.concat( [ new LevelOut( 1 ), SEPARATOR, ' }' ] );
}

function _trimTrailingSeparator( frags ) {
  if ( frags.length > 0 ) {
    return frags.slice( 0, frags.length - 2 );
  } else {
    return frags;
  }
}

function getFragments( clause ) {

  const fragmenter = Fragmenters[ clause.type ];
  if ( !fragmenter ) {
    console.error( clause );
    throw new Error( `Unsupported clause type ${clause.type}` );
  }
  return fragmenter( clause );

}

function interpose( arr, interArr ) {
  if ( arr.length === 0 ) {
    return arr;
  } else {
    return arr.reduce( ( acc, curr, idx ) => {
      if ( idx < arr.length - 1 ) {
        return acc.concat( [ curr ] ).concat( interArr );
      } else {
        return acc.concat( [ curr ] );
      }
    }, [] );
  }
}

getFragments.SEPARATOR = SEPARATOR;
getFragments.LevelIn = LevelIn;
getFragments.LevelOut = LevelOut;

module.exports = getFragments;
