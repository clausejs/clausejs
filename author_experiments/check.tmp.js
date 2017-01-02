require( 'babel-core/register' );


var C = require( '../src' );

const testcheck = require( 'testcheck' );
const {
  check,
  property,
  sample,
  gen,
} = testcheck;
console.log( testcheck );
var r = sampleOne( gen.string );

console.log( r );
