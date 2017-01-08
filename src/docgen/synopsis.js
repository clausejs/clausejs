
const { cat, or, zeroOrMore, oneOrMore, fclause, any, and, wall, ExprClause, collOf } = require( '../core' );
const { isStr, isNum, isObj, isBool, instanceOf } = require( '../preds' );
const { conform, isClause, deref, delayed } = require( '../utils' );
const C = require( '../' );
const fnName = require( '../utils/fnName' );


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

function AltHeadNode( name ) {
  this.name = name;
}

function PartHeadNode( name ) {
  this.name = name;
}

var HeadNodeC = wall( or(
  ExprClause,
  instanceOf( AltHeadNode ),
  instanceOf( PartHeadNode )
) );

var ParamNodeC = wall( or(
  isStr,
  delayed( () => SExpressionC )
) );

var SExpressionC = wall( cat(
  HeadNodeC,
  zeroOrMore( ParamNodeC )
) );

var _toSExpression = fclause( {
  args: cat( ExprClause ),
  ret: SExpressionC,
} ).instrument( function _toSExpression( clause ) {
} );

var synopsis = fclause( {
  args: cat( ExprClause )
} ).instrument( function synopsis( clause ) {
  var sexp = _toSExpression( clause );
} );

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
