var fnName = require( './fnName' );
var clauseFromAlts = require( './clauseFromAlts' );
var oAssign = require( '../utils/objectAssign' );
const { wall, any, zeroOrMore, and, cat, or, ExprClause, mapOf, maybe } = require( '../core' );
const delayed = require( './delayed' );
const handle = require( './handle' );
const coerceIntoClause = require( './coerceIntoClause' );
const { isStr, isPlainObj, instanceOf } = require( '../preds' );

function Recursive( expression ) {
  this.isRecursive = true;
  this.expression = expression;
}

function QuotedParamsMap( map ) {
  oAssign( this, map );
}

function UnquotedParamsMap( map ) {
  oAssign( this, map );
}

const ParamsMapC = mapOf(
    any,
    maybe( or(
      'keyList', zeroOrMore( delayed( () => ParamLabelClause ) ),
      'singleParam', delayed( () => ParamItemClause )
    ) )
  );

var QuotedParamsMapC = and(
  instanceOf( QuotedParamsMap ),
  ParamsMapC
);

var UnquotedParamsMapC = and(
  instanceOf( UnquotedParamsMap ),
  ParamsMapC
);

var ParamItemClause = or(
  'sExpression', delayed( () => SExpressionClause ),
  'quotedParamsMap', QuotedParamsMapC,
  'unquotedParamsMap', UnquotedParamsMapC,
  'optionsObj', isPlainObj,
  'recursive', instanceOf( Recursive )
);

var ParamLabelClause = isStr;

function genSExpressionClause( headClause ) {
  return wall(
    cat(
      'head', headClause,
      'params', or(
        'labelled', zeroOrMore( cat(
          'label', ParamLabelClause,
          'item', ParamItemClause ) ),
        'unlabelled', zeroOrMore( cat(
          'item', ParamItemClause
        ) )
      )
    )
  );
}

var SExpressionClause = genSExpressionClause( ExprClause );

var singleArgParamGenerator = ( repo, { opts: { enclosedClause } } ) =>
  [ _createSExpr( repo, enclosedClause ) ];

var multipleArgParamGenerator = ( repo, { opts: { named }, exprs } ) => {
  if ( exprs.length === 0 ) {
  //empty case
    return [];
  } else if ( named ) {
    const r = exprs.reduce(
      ( acc, { name, expr } ) =>
        acc.concat( [ `"${name}"`, _createSExpr( repo, expr ) ] )
        , [] );
    return r;
  } else {
    return exprs.reduce(
      ( acc, { expr } ) => acc.concat( [ _createSExpr( repo, expr ) ] ),
      [] );
  }
};

var sParamsConverters = {
  'PRED': ( ) => [ ],
  'WALL': ( repo, { opts: { enclosedClause } } ) => [ _createSExpr( repo, enclosedClause ) ],
  'AND': ( repo, { opts: { conformedExprs } } ) =>
    conformedExprs.map( clauseFromAlts ).map( ( c ) => _createSExpr( repo, c ) ),
  'CAT': multipleArgParamGenerator,
  'OR': multipleArgParamGenerator,
  'Z_OR_M': singleArgParamGenerator,
  'O_OR_M': singleArgParamGenerator,
  'Z_OR_O': singleArgParamGenerator,
  'COLL_OF': singleArgParamGenerator,
  'ANY': () => [],
  'MAP_OF': ( repo, { opts } ) => _handleKeyValExprPair( repo, opts ),
  'SHAPE': ( repo, { opts: { conformedArgs: { shapeArgs: { optionalFields: { opt, optional } = {}, requiredFields: { req, required } = {} } } } } ) =>
    oAssign( new UnquotedParamsMap(),
      ( req || required ) ? {
        required: _fieldDefToFrags( repo, req || required ),
      } : {},
      ( opt || optional ) ? {
        optional: _fieldDefToFrags( repo, opt || optional ),
      } : {}
    ),
  'FCLAUSE': ( repo, { opts: { args, ret, fn } } ) =>
    oAssign( new UnquotedParamsMap(),
    args ? { args: _createSExpr( repo, args ) } : {},
    ret ? { ret: _createSExpr( repo, ret ) } : {},
    fn ? { fn: [ `${fnName( fn )}()` ] } : {} )
}

function _fieldDefToFrags( repo, { fieldDefs, keyList } ) {
  if ( fieldDefs ) {
    let r = new QuotedParamsMap();
    for ( let key in fieldDefs ) {
      if ( fieldDefs.hasOwnProperty( key ) ) {
        let val = handle( fieldDefs[ key ], {
          'keyValExprPair': ( pair ) => _handleKeyValExprPair( repo, pair ),
          'valExpressionOnly': ( expr ) => _createSExpr( repo, clauseFromAlts( expr ) )
        }, () => {
          throw '!g';
        } );
        oAssign( r, {
          [ key ]: val
        } );
      }
    }
    return r;
  } else if ( keyList ) {
    return keyList;
  } else {
    throw '!w';
  }
}

function _handleKeyValExprPair( repo, { keyExpression, valExpression } ) {
  return new UnquotedParamsMap( {
    'key': _createSExpr( repo, clauseFromAlts( keyExpression ) ),
    'val': _createSExpr( repo, clauseFromAlts( valExpression ) ),
  } );
}

function _params( repo, clause ) {
  const converter = sParamsConverters[ clause.type ];
  if ( !converter ) {
    console.error( clause );
    throw new Error( `Unsupported clause type ${clause.type}.` );
  } else {
    const r = converter( repo, clause );
    return r;
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
export { SExpressionClause, ParamItemClause,
  Recursive, QuotedParamsMap, UnquotedParamsMap,
  genSExpressionClause };
