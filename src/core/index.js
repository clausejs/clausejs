var oAssign = require( '../utils/objectAssign' );
var regex = require( './regex' );
var { shape, keys, mapOf, } = require( './regex' );
var nullable = require( './nullable' );
var undefinable = require( './undefinable' );
var maybe = require( './maybe' );
var { wall } = require( './wall' );
var equals = require( '../preds/equals' );

var scat = function( str ) {
  return regex.cat.apply( null, Array.prototype.slice.call( str ).map( equals ) );
};

var other = {
  any: require( './any' ),
  fclause: require( './fclause' ),
  wall, clause: wall,
  nullable, undefinable, maybe,
  scat,
};

var r = oAssign( {},
  regex,
  { shape, keys, mapOf },
  other );
module.exports = r;
