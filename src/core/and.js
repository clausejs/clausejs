var isSpec = require( '../utils/isSpec' );
var Spec = require( '../models/Spec' );
var { oneOrMore, ExprSpec } = require( './regex' );
var fspec = require( './fspec' );
var walk = require( '../walk' );

var AndSpec = fspec( {
  args: oneOrMore( ExprSpec ),
  ret: isSpec,
} );

function andOp( exprs ) {
  var andS = new Spec( {
    type: 'AND',
    exprs,
    fragments: exprs,
  } );
  andS.conform = function andConform( x ) {
    return walk( andS, x, { conform: true } );
  }
  return andS;
}

var and = AndSpec.instrumentConformed( andOp );

module.exports = {
  and,
  AndSpec,
};
