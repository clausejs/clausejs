const { cat, or, zeroOrMore, oneOrMore, fspec, any, and, ExprSpec } = require( '../core' );
const { isStr, isNum, isObj, isBool } = require( '../preds' );
const { conform, isSpec } = require( '../utils' );

var SampleSpec = cat( 'first', oneOrMore( cat( isStr, isBool ) ),
                      'second', or( 'objOpt', isObj, 'showNum', cat( isNum, isBool ) ) );

var SampleFnSpec = fspec( {
  args: SampleSpec,
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

function Label( spec ) {
  this.spec = spec;
}

var OrSpec = and( isSpec, ( s ) => s.type === 'OR' );

var expand1 = fspec( {
  args: cat( ExprSpec, OrSpec )
} ).instrument( ( spec, pivotSpec ) => {
  var frags = _expandWalk( spec, pivotSpec );

  var pivotIndex = frags.indexOf( pivotSpec );
} );

function _expandWalk( spec, pivotSpec ) {

}

function synopsis( spec, interceptor ) {
  // TODO
}

console.log( synopsis( SampleSpec, null ) );

module.exports = {
  synopsis,
};
