var Clause = require( '../models/Clause' );
var coerceIntoClause = require( '../utils/coerceIntoClause' );
var { cat, ExprClause } = require( './regex' );
var fclause = require( './fclause' );
var walk = require( '../walk' );

var WallFnClause = fclause( {
  args: cat( ExprClause ),
  ret: ExprClause,
} );

function wallOp( expr ) {
  var clause = coerceIntoClause( expr );
  var wallS = new Clause( {
    type: 'WALL',
    exprs: [ clause ],
    opts: { enclosedClause: clause },
  } );
  wallS.conform = function andConform( x ) {
    return walk( wallS, x, { conform: true } );
  }
  return wallS;
}

var wall = WallFnClause.instrument( wallOp );

module.exports = {
  WallFnClause, wall,
};
