var Spec = require( '../models/Spec' );
var isSpec = require( '../utils/isSpec' );
var coerceIntoSpec = require( '../utils/coerceIntoSpec' );
var { cat } = require( './regex' );
var fspec = require( './fspec' );
var walk = require( '../walk' );

var WallSpec = fspec( {
  args: cat( isSpec ),
  ret: isSpec,
} );

function wallOp( expr ) {
  var spec = coerceIntoSpec( expr );
  var wallS = new Spec( {
    type: 'WALL',
    exprs: [ spec ],
  } );
  wallS.conform = function andConform( x ) {
    return walk( wallS, x, { conform: true } );
  }
  return wallS;
}


module.exports = WallSpec.instrument( wallOp );
