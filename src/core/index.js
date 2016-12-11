var oAssign = require( 'object-assign' );
var regex = require( './regex' );
var { props, keys } = require( './objRelated' );
var { and } = require( './and' );
var other = {
  any: require( './any' ),
  fspec: require( './fspec' ),
  wall: require( './wall' ),
  spec: require( './wall' ),
  and,
};

var r = oAssign( {},
  regex,
  { props, keys },
  other );

module.exports = r;
