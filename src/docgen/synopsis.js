const { cat, or, zeroOrOne, maybe, oneOrMore, fclause, any, and, wall, ExprClause, collOf } = require( '../core' );
const { isStr, isNum, isInt, isObj, isBool, instanceOf } = require( '../preds' );
const { conform, isClause, deref, delayed } = require( '../utils' );
const C = require( '../' );
const clauseFromAlts = require( '../utils/clauseFromAlts' );
const fnName = require( '../utils/fnName' );
import sExpression, { genSExpressionClause, ParamItemClause, SExpressionClause } from '../utils/sExpression';

//     ----'first'-----  --------'second'---------
// fn( (isStr, isBool)+, (isObj | (isNum, isBool)) )

//     -----'first'----  ---second--
//                        -(objOpt)-
// fn( (isStr, isBool)+,    isObj     )
//     -----'first'----  ----second----
//                       ---(showNum)--
// fn( (isStr, isBool)+, isNum, isBool )



// fn( { <required>: [ 'propA': isNum, <propB: beginsWithS>: any ], <optional>: [  ] } )

// cat('first', oneOrMore(cat (isStr, isBool), 'second': {...}  ))

// console.log( conform( sample, [ 'hello', true, 'abc', false, 32, false ] ) );

function AltHeadNode( label, clause ) {
  this.label = label;
  this.clause = clause;
}

function PartHeadNode( label, clause ) {
  this.label = label;
  this.clause = clause;
}

var PartialableSExprClause = genSExpressionClause(
  or(
    'expression', ExprClause,
    'altNode', instanceOf( AltHeadNode ),
    'partNode', instanceOf( PartHeadNode )
  )
);

var synopsis = fclause( {
  args: cat( ExprClause, zeroOrOne( isInt ) )
} ).instrument( function synopsis( clause, maxNoCases ) {
  const sExpr = sExpression( clause );
  const cSExpr = conform( ParamItemClause, sExpr );
  const pivots = _findPivots( cSExpr );
  console.log( pivots );

} );

// A "pivot" is an "or" clause
function _findPivots(
  { sExpression, quotedParamsMap, unquotedParamsMap } ) {
  let r = [];

  if ( sExpression ) {
    let { head: headAlts, params: { labelled, unlabelled } = {} } = sExpression;
    const head = clauseFromAlts( headAlts );
    if ( _isPivot( head ) ) {
      r.push( head );
    }
    const items = labelled || unlabelled || [];
    const pivotsFromParams = items.reduce(
    ( acc, { item } ) => acc.concat( _findPivots( item ) )
  , [] );
    r = r.concat( pivotsFromParams );
  } else if ( quotedParamsMap || unquotedParamsMap ) {
    let m = quotedParamsMap || unquotedParamsMap;
    for ( let key in m ) {
      if ( m.hasOwnProperty( key ) ) {
        let { singleParam } = m[ key ];
        if ( singleParam ) {
          r = r.concat( _findPivots( singleParam ) );
        }
      }
    }
  }
  return r;
}

function _isPivot( expr ) {
  return expr.type === 'OR';
}

module.exports = {
  synopsis,
};

// // //

var SampleClause = cat(
  'first', oneOrMore( cat( isStr, isBool ) ),
  'second', or(
    'objOpt', isObj,
    'showNum', cat( isNum, or( isBool, isObj ) ) ) );

var r = synopsis( SampleClause );
console.log( r );
