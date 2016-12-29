const { cat, or, zeroOrMore, oneOrMore, fspec, any, and, ExprSpec } = require( '../core' );
const { isStr, isNum, isObj, isBool } = require( '../preds' );
const { conform, isSpec, deref } = require( '../utils' );

var SampleSpec = cat( 'first', oneOrMore( cat( isStr, isBool ) ),
                      'second', or( 'objOpt', isObj, 'showNum', cat( isNum, isBool ) ) );

const getFragments = require( '../utils/fragmenter' );

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

function Case( name, spec ) {
  this.name = name;
  this.spec = spec;
}

function Alternative( { name, fragments } ) {
  this.name = name;
  this.fragments = fragments;
}

function ConcatItem( { name, fragments } ) {
  this.name = name;
  this.fragments = fragments;
}

var OrSpec = and( isSpec, function isOrSpec( s ) {
  return deref( s ).type === 'OR'
} );

var RepeatSpec = cat( isStr, isObj, isStr );
var OptionsSpec = or(
   'opt1', isStr,
   'opt2', RepeatSpec
 );

var SampleSpec = cat(
 'first', zeroOrMore( OptionsSpec ),
 'second', oneOrMore( cat( isBool, isNum ) )
);

var expand1 = fspec( {
  args: cat( ExprSpec, OrSpec )
} ).instrument( ( spec, pivotSpec ) => {
  var frags = _expandWalk( spec, pivotSpec );

  var pivotIndex = frags.indexOf( pivotSpec );
  var cases = _getCases( pivotSpec );
  return cases.map( ( { name, spec } ) => {
    var replaced = [].concat( frags );
    var fragments = _expandWalk( spec );
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

function _expandWalk( expr, pivotSpec ) {
  // TODO: handle delayed and SpecRef case
  if ( expr === pivotSpec ) {
    return [ expr ];
  } else {
    var spec = expr;
    var fragments = getFragments( spec );
    var paddedFragments = _pad( fragments, spec );

    var expandedPieces = paddedFragments.reduce( ( acc, f ) => {
      if ( isSpec( f ) ) {
        return acc.concat( _expandWalk( f, pivotSpec ) );
      } else {
        return acc.concat( [ f ] );
      }
    }, [] );

    return expandedPieces;
  }
}

function _pad( fragments, spec ) {
  return fragments;
}

function synopsis( spec, interceptor ) {
  // TODO

}

// console.log( synopsis( SampleSpec, null ) );
console.log( expand1( SampleSpec, OptionsSpec ) );

module.exports = {
  synopsis,
};
