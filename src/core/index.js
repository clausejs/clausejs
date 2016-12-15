var oAssign = require( 'object-assign' );
var regex = require( './regex' );
var { shape, keys } = require( './objRelated' );
var { and } = require( './and' );
var { wall } = require( './wall' );
var other = {
  any: require( './any' ),
  fspec: require( './fspec' ),
  wall, spec: wall,
  and,
};

var r = oAssign( {},
  regex,
  { shape, keys },
  other );

module.exports = r;
