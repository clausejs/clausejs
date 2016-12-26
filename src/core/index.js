var oAssign = require( 'object-assign' );
var regex = require( './regex' );
var { shape, keys, mapOf, } = require( './objRelated' );
var { wall } = require( './wall' );
var other = {
  any: require( './any' ),
  fspec: require( './fspec' ),
  wall, spec: wall,
};

var r = oAssign( {},
  regex,
  { shape, keys, mapOf },
  other );

module.exports = r;
