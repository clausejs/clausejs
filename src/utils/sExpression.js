var fnName = require( './fnName' );
var clauseFromAlts = require( './clauseFromAlts' );
var oAssign = require( 'object-assign' );
const { any, zeroOrMore, cat, or, ClauseClause, mapOf } = require( '../core' );
const delayed = require( './delayed' );
const isPred = require( './isPred' );
const { isStr, isObj } = require( '../preds' );

var ParamObjC = mapOf(
    any,
    delayed( () => SExpressionC ) );

var OptionsC = isObj;

var SExpressionC = cat(
    'head', ClauseClause,
    'params', zeroOrMore(
      or(
        isStr,
        delayed( () => SExpressionC ),
        OptionsC,
        ParamObjC )
    )
);

var singleArgParamGenerator = ( { opts: { enclosedClause } } ) =>
  [ sExpression( enclosedClause ) ];

var multipleArgParamGenerator = ( { opts: { named }, exprs } ) => {
  if ( exprs.length === 0 ) {
  //empty case
    return [];
  } else if ( named ) {
    return exprs.reduce(
      ( acc, { name, expr } ) =>
        acc.concat( [ `"${name}"`, sExpression( expr ) ] )
        , [] );
  } else {
    return exprs.reduce(
      ( acc, { expr } ) => acc.concat( [ sExpression( expr ) ] ),
      [] );
  }
};

var sParamsConverters = {
  'PRED': ( { opts: { predicate } } ) => [ 'pred', predicate ],
  'WALL': ( { opts: { enclosedClause } } ) => [ '', enclosedClause ],
  'AND': ( { opts: { conformedExprs } } ) =>
    conformedExprs.map( clauseFromAlts ),
  'CAT': multipleArgParamGenerator,
  'OR': multipleArgParamGenerator,
  'Z_OR_M': singleArgParamGenerator,
  'O_OR_M': singleArgParamGenerator,
  'Z_OR_O': singleArgParamGenerator,
  'COLL_OF': singleArgParamGenerator,
  'ANY': () => [],
  // TODO
  'MAP_OF': () => [],
  // TODO
  'SHAPE': ( { opts: { conformedArgs: { shapeArgs: { optionalFields: { opt, optional } = {}, requiredFields: { req, required } = {} } } } } ) =>
    oAssign( {},
      ( req || required ) ? {
        required: _fieldDefToFrags( req || required ),
      } : {},
      ( opt || optional ) ? {
        optional: _fieldDefToFrags( opt || optional ),
      } : {}
    ),
  'FCLAUSE': ( { opts: { args, ret, fn } } ) =>
    oAssign( {},
    args ? { args: sExpression( args ) } : {},
    ret ? { ret: sExpression( ret ) } : {},
    fn ? { fn: `${fnName( fn )}()` } : {} )
}

function _fieldDefToFrags( { fieldDefs: { fields } } ) {
  let r = {};
  for ( let key in fields ) {
    if ( fields.hasOwnProperty( key ) ) {
      const { keyValExprPair, valExpressionOnly } = fields[ key ];
      if ( keyValExprPair ) {
        let { keyExpression, valExpression } = keyValExprPair;
        oAssign( r, {
          [ key ]: {
            '<keyExpression>': sExpression( clauseFromAlts( keyExpression ) ),
            '<valExpression>': sExpression( clauseFromAlts( valExpression ) ),
          }
        } );
      } else if ( valExpressionOnly ) {
        oAssign( r, {
          [ key ]: sExpression( clauseFromAlts( valExpressionOnly ) )
        } )
      }
    }
  }
  return r;
}

function _params( clause ) {
  const converter = sParamsConverters[ clause.type ];
  if ( !converter ) {
    console.error( clause );
    throw new Error( `Unsupported clause type ${clause.type}.` );
  } else {
    return converter( clause );
  }
}

function sExpression( expr ) {
  if ( isPred( expr ) ) {
    return `${fnName( expr )}()`;
  }
  var params = _params( expr );
  return [ expr ].concat( params );
}

module.exports = sExpression;
