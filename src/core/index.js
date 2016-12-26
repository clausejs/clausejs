var oAssign = require( 'object-assign' );
var regex = require( './regex' );
var { shape, keys, mapOf, } = require( './objRelated' );
var nullable = require( './nullable' );
var undefinable = require( './undefinable' );
var { wall } = require( './wall' );

var other = {
  any: require( './any' ),
  fspec: require( './fspec' ),
  wall, spec: wall,
  nullable, undefinable,
};

var r = oAssign( {},
  regex,
  { shape, keys, mapOf },
  other );
module.exports = r;
