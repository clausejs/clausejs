var isSpec = require( '../utils/isSpec' );
var Spec = require( '../models/Spec' );
var { oneOrMore, cat, ExprSpec } = require( './regex' );
var fspec = require( './fspec' );
var walk = require( '../walk' );

var AndSpec = fspec( {
  args: cat( 'exprs', oneOrMore( ExprSpec ) ),
  ret: isSpec,
} );

function andOp( conformedArgs ) {
  var { exprs } = conformedArgs;

  var andS = new Spec( 'AND', exprs, null, null, null );
  andS.conform = function andConform( x ) {
    return walk( andS, x, { conform: true } );
  }
  return andS;
}


module.exports = AndSpec.instrumentConformed( andOp );
