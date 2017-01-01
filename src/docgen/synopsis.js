const { cat, or, zeroOrMore, oneOrMore, fclause, any, and, ExprClause } = require( '../core' );
const { isStr, isNum, isObj, isBool } = require( '../preds' );
const { conform, isClause, deref } = require( '../utils' );
const C = require( '../' );

var SampleClause = cat( 'first', oneOrMore( cat( isStr, isBool ) ),
                      'second', or( 'objOpt', isObj, 'showNum', cat( isNum, isBool ) ) );

const getFragments = require( '../utils/fragmenter' );

var SampleFnClause = fclause( {
  args: SampleClause,
} );
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

const CaseClause = C.collOf(
  C.any
);

// console.log( synopsis( SampleClause, null ) );
console.log( expand1( SampleClause, OptionsClause ) );

module.exports = {
  synopsis,
};
