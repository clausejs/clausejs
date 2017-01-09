var oAssign = require( 'object-assign' );
var regex = require( './regex' );
var { shape, keys, mapOf, } = require( './regex' );
var nullable = require( './nullable' );
var undefinable = require( './undefinable' );
var { wall } = require( './wall' );
var equals = require( '../preds/equals' );

var sCat = function( str ) {
  return regex.cat.apply( null, Array.prototype.slice.call( str ).map( equals ) );
};

var other = {
  any: require( './any' ),
  fclause: require( './fclause' ),
  wall, clause: wall,
  nullable, undefinable,
  sCat,
};

var r = oAssign( {},
  regex,
  { shape, keys, mapOf },
  other );
module.exports = r;
