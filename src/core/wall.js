var Spec = require( '../models/Spec' );
var coerceIntoSpec = require( '../utils/coerceIntoSpec' );
var { cat, ExprSpec } = require( './regex' );
var fspec = require( './fspec' );
var walk = require( '../walk' );

var WallFnSpec = fspec( {
  args: cat( ExprSpec ),
  ret: ExprSpec,
} );

function wallOp( expr ) {
  var spec = coerceIntoSpec( expr );
  var wallS = new Spec( {
    type: 'WALL',
    exprs: [ spec ],
    opts: { enclosedSpec: spec },
  } );
  wallS.conform = function andConform( x ) {
    return walk( wallS, x, { conform: true } );
  }
  return wallS;
}

var wall = WallFnSpec.instrument( wallOp );

module.exports = {
  WallFnSpec, wall,
};
