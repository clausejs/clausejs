var fnName = require( './fnName' );
var clauseFromAlts = require( './clauseFromAlts' );
var oAssign = require( '../utils/objectAssign' );
const { wall, any, zeroOrMore, and, cat, or, ExprClause, mapOf } = require( '../core' );
const delayed = require( './delayed' );
const coerceIntoClause = require( './coerceIntoClause' );
const { isStr, isPlainObj, instanceOf } = require( '../preds' );

function Recursive( expression ) {
  this.isRecursive = true;
  this.expression = expression;
}

function ParamsMap( map ) {
  oAssign( this, map );
}

var ParamsMapC = and(
  instanceOf( ParamsMap ),
  mapOf(
    any,
    or(
      'paramList', zeroOrMore( delayed( () => ParamItemClause ) ),
      'paramMap', delayed( () => ParamsMapC )
    )
  )
);

var ParamItemClause = or(
  'label', isStr,
  'sExpression', delayed( () => SExpressionClause ),
  'paramsObj', ParamsMapC,
  'optionsObj', isPlainObj,
  'recursive', instanceOf( Recursive )
);

var SExpressionClause = wall(
  cat(
    'head', ExprClause,
    'params', zeroOrMore( ParamItemClause )
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
  'PRED': ( repo, { opts: { predicate } } ) => [ `${fnName( predicate )}()` ],
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
    oAssign( new ParamsMap(),
      ( req || required ) ? {
        required: _fieldDefToFrags( repo, req || required ),
      } : {},
      ( opt || optional ) ? {
        optional: _fieldDefToFrags( repo, opt || optional ),
      } : {}
    ),
  'FCLAUSE': ( repo, { opts: { args, ret, fn } } ) =>
    oAssign( new ParamsMap(),
    args ? { args: [ _createSExpr( repo, args ) ] } : [],
    ret ? { ret: [ _createSExpr( repo, ret ) ] } : [],
    fn ? { fn: [ `${fnName( fn )}()` ] } : [] )
}

function _fieldDefToFrags( repo, { fieldDefs: { fields } = {}, keyList } ) {
  if ( fields ) {
    let r = new ParamsMap();
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
  } else if ( keyList ) {
    return keyList;
  } else {
    throw '!';
  }
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
  let coercedExpr = coerceIntoClause( expr ),
    realExpr,
    newRepo = repo;
  if ( coercedExpr.type === 'DELAYED' ||
     coercedExpr.type === 'CLAUSE_REF' ) {
    realExpr = coercedExpr.get();
    return _createSExpr( repo, realExpr );
  } else {
    realExpr = coercedExpr;
    newRepo = _addToRepo( repo, coercedExpr );
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

export default sExpression;
export { SExpressionClause, ParamItemClause };
