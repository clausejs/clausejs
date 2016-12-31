const { cat, or, zeroOrMore, oneOrMore, fclause, any, and, ExprClause } = require( '../core' );
const { isStr, isNum, isObj, isBool } = require( '../preds' );
const { conform, isClause, deref } = require( '../utils' );

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

function Case( name, clause ) {
  this.name = name;
  this.clause = clause;
}

function Alternative( { name, fragments } ) {
  this.name = name;
  this.fragments = fragments;
}

function ConcatItem( { name, fragments } ) {
  this.name = name;
  this.fragments = fragments;
}

var OrClause = and( isClause, function isOrClause( s ) {
  return deref( s ).type === 'OR'
} );

var RepeatClause = cat( isStr, isObj, isStr );
var OptionsClause = or(
   'opt1', isStr,
   'opt2', RepeatClause
 );

var SampleClause = cat(
 'first', zeroOrMore( OptionsClause ),
 'second', oneOrMore( cat( isBool, isNum ) )
);

var expand1 = fclause( {
  args: cat( ExprClause, OrClause )
} ).instrument( ( clause, pivotClause ) => {
  var frags = _expandWalk( clause, pivotClause );

  var pivotIndex = frags.indexOf( pivotClause );
  var cases = _getCases( pivotClause );
  return cases.map( ( { name, clause } ) => {
    var replaced = [].concat( frags );
    var fragments = _expandWalk( clause );
    replaced[ pivotIndex ] = new Alternative( { name, fragments } );
    return {
      name,
      fragments: replaced
    }
  } );
} );

function _getCases( { exprs, opts: { named } } ) {
  return exprs.map(
      named ?
      ( { name, expr } ) => new Case( name, expr ) :
      ( expr ) => new Case( null, expr )
    )
}

function _expandWalk( expr, pivotClause ) {
  // TODO: handle delayed and ClauseRef case
  if ( expr === pivotClause ) {
    return [ expr ];
  } else {
    var clause = expr;
    var fragments = getFragments( clause );
    var paddedFragments = _pad( fragments, clause );

    var expandedPieces = paddedFragments.reduce( ( acc, f ) => {
      if ( isClause( f ) ) {
        return acc.concat( _expandWalk( f, pivotClause ) );
      } else {
        return acc.concat( [ f ] );
      }
    }, [] );

    return expandedPieces;
  }
}

function _pad( fragments, clause ) {
  return fragments;
}

function synopsis( clause, interceptor ) {
  // TODO

}

// console.log( synopsis( SampleClause, null ) );
console.log( expand1( SampleClause, OptionsClause ) );

module.exports = {
  synopsis,
};
