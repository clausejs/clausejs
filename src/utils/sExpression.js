var fnName = require( './fnName' );
var clauseFromAlts = require( './clauseFromAlts' );
var oAssign = require( 'object-assign' );
const { any, zeroOrMore, cat, or, ClauseClause, mapOf } = require( '../core' );
const delayed = require( './delayed' );
const isPred = require( './isPred' );
const { isStr, isObj } = require( '../preds' );

function Recursive( expression ) {
  this.isRecursive = true;
  this.expression = expression;
}

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

var singleArgParamGenerator = ( repo, { opts: { enclosedClause } } ) =>
  [ _createSExpr( repo, enclosedClause ) ];

var multipleArgParamGenerator = ( repo, { opts: { named }, exprs } ) => {
  if ( exprs.length === 0 ) {
  //empty case
    return [];
  } else if ( named ) {
    return exprs.reduce(
      ( acc, { name, expr } ) =>
        acc.concat( [ `"${name}"`, _createSExpr( repo, expr ) ] )
        , [] );
  } else {
    return exprs.reduce(
      ( acc, { expr } ) => acc.concat( [ _createSExpr( repo, expr ) ] ),
      [] );
  }
};

var sParamsConverters = {
  'PRED': ( repo, { opts: { predicate } } ) => [ predicate ],
  'WALL': ( repo, { opts: { enclosedClause } } ) => [ _createSExpr( repo, enclosedClause ) ],
  'AND': ( repo, { opts: { conformedExprs } } ) =>
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
  'SHAPE': ( repo, { opts: { conformedArgs: { shapeArgs: { optionalFields: { opt, optional } = {}, requiredFields: { req, required } = {} } } } } ) =>
    oAssign( {},
      ( req || required ) ? {
        required: _fieldDefToFrags( repo, req || required ),
      } : {},
      ( opt || optional ) ? {
        optional: _fieldDefToFrags( repo, opt || optional ),
      } : {}
    ),
  'FCLAUSE': ( repo, { opts: { args, ret, fn } } ) =>
    oAssign( {},
    args ? { args: _createSExpr( repo, args ) } : {},
    ret ? { ret: _createSExpr( repo, ret ) } : {},
    fn ? { fn: `${fnName( fn )}()` } : {} )
}

function _fieldDefToFrags( repo, { fieldDefs: { fields } } ) {
  let r = {};
  for ( let key in fields ) {
    if ( fields.hasOwnProperty( key ) ) {
      const { keyValExprPair, valExpressionOnly } = fields[ key ];
      if ( keyValExprPair ) {
        let { keyExpression, valExpression } = keyValExprPair;
        oAssign( r, {
          [ key ]: {
            '<keyExpression>': _createSExpr( repo, clauseFromAlts( keyExpression ) ),
            '<valExpression>': _createSExpr( repo, clauseFromAlts( valExpression ) ),
          }
        } );
      } else if ( valExpressionOnly ) {
        oAssign( r, {
          [ key ]: _createSExpr( repo, clauseFromAlts( valExpressionOnly ) )
        } )
      }
    }
  }
  return r;
}

function _params( repo, clause ) {
  const converter = sParamsConverters[ clause.type ];
  if ( !converter ) {
    console.error( clause );
    throw new Error( `Unsupported clause type ${clause.type}.` );
  } else {
    return converter( repo, clause );
  }
}

function _createSExpr( repo, expr ) {
  if ( _exists( repo, expr ) ) {
    return new Recursive( expr );
  }
  let realExpr,
    newRepo = repo;
  if ( isPred( expr ) ) {
    return `${fnName( expr )}()`;
  } else if ( expr.type === 'DELAYED' || expr.type === 'CLAUSE_REF' ) {
    realExpr = expr.get();
    return _createSExpr( repo, realExpr );
  } else {
    realExpr = expr;
    newRepo = _addToRepo( repo, expr );
  }
  var params = _params( newRepo, realExpr );
  return [ realExpr ].concat( params );
}


function _addToRepo( repo, expr ) {
  if ( !_exists( repo, expr ) ) {
    return repo.concat( [ expr ] );
  }
}

function _exists( repo, piece ) {
  return repo.indexOf( piece ) >= 0;
}

function sExpression( expr ) {
  const repo = [];
  return _createSExpr( repo, expr );
}

module.exports = sExpression;
